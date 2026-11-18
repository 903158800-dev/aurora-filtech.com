/**
 * Cloudflare Pages Function: Same-Origin B2B RFQ Email Relay via Resend
 * Route: /api/rfq (GET healthcheck, POST inquiry submission)
 * Required env secret: RESEND_API_KEY
 * Optional env vars: RFQ_TO_EMAIL (default: johnson@aurora-filtech.com), RFQ_FROM_EMAIL (default: Aurora Filtech RFQ <rfq@aurora-filtech.com>)
 */

const DEFAULT_TO = "johnson@aurora-filtech.com";
const DEFAULT_FROM = "Aurora Filtech RFQ <rfq@aurora-filtech.com>";
const SANDBOX_FROM = "Aurora Filtech RFQ <onboarding@resend.dev>";
const RESEND_ENDPOINT = "https://api.resend.com/emails";

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex"
};

function jsonRes(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

function esc(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function singleLine(str) {
  return String(str == null ? "" : str).replace(/[\r\n]+/g, " ").trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

async function parsePayload(request) {
  const ct = (request.headers.get("content-type") || "").toLowerCase();
  if (ct.includes("application/json")) {
    const raw = await request.json();
    return raw && typeof raw === "object" ? raw : {};
  }
  const fd = await request.formData();
  const obj = {};
  for (const [k, v] of fd.entries()) {
    if (typeof v === "string") obj[k] = v;
  }
  return obj;
}

async function sendViaResend(apiKey, emailPayload) {
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(emailPayload)
  });
  const text = await res.text();
  let parsed = null;
  try { parsed = JSON.parse(text); } catch (_) {}
  return { ok: res.ok, status: res.status, data: parsed, rawText: text };
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Allow": "GET, POST, OPTIONS",
      "Cache-Control": "no-store"
    }
  });
}

export async function onRequestGet({ env }) {
  return jsonRes({
    ok: true,
    service: "aurora-rfq",
    provider: "resend",
    configured: Boolean(env && env.RESEND_API_KEY)
  });
}

export async function onRequestPost({ request, env }) {
  const accept = (request.headers.get("accept") || "").toLowerCase();
  const isAjax = accept.includes("application/json");

  if (!env || !env.RESEND_API_KEY) {
    return jsonRes({
      ok: false,
      success: false,
      message: "Email relay not configured yet: add RESEND_API_KEY in Cloudflare Pages Environment Variables."
    }, 503);
  }

  let data;
  try {
    data = await parsePayload(request);
  } catch (_) {
    return jsonRes({ ok: false, success: false, message: "Invalid request payload." }, 400);
  }

  // Honeypot anti-spam trap: silently accept bot submissions without sending mail
  if (singleLine(data._honey)) {
    return jsonRes({ ok: true, success: true, filtered: true }, 200);
  }

  const company = singleLine(data.company);
  const email = singleLine(data.email);
  if (!company || !isValidEmail(email)) {
    return jsonRes({
      ok: false,
      success: false,
      message: "Please provide a valid company name and work email address."
    }, 400);
  }

  const name = singleLine(data.name) || "-";
  const customerType = singleLine(data.customer_type);
  const product = singleLine(data.product) || singleLine(data.page_topic) || "General Inquiry";
  const machine = singleLine(data.machine);
  const size = singleLine(data.size);
  const material = singleLine(data.material);
  const temperature = singleLine(data.temperature);
  const ph = singleLine(data.ph);
  const notes = String(data.notes || data.request || "").trim() || "-";
  const pageUrl = singleLine(data.page_url || request.headers.get("referer")) || "-";
  const pageTopic = singleLine(data.page_topic) || product;
  const country = singleLine((request.cf && request.cf.country) || request.headers.get("cf-ipcountry")) || "Unknown";
  const city = singleLine(request.cf && request.cf.city);
  const location = city ? `${city}, ${country}` : country;
  const submittedAt = new Date().toISOString();

  const subject = `[RFQ] ${product} — ${company} (${country})`;

  const rows = [
    ["Company", company],
    ["Work Email", email],
    ["Contact & Tel/WhatsApp", name],
    customerType ? ["Buyer Role", customerType] : null,
    ["Product / Topic", product],
    machine ? ["Machine / Filter Type", machine] : null,
    size ? ["Dimensions", size] : null,
    material ? ["Material / Slurry", material] : null,
    temperature ? ["Operating Temp", temperature] : null,
    ph ? ["pH / Chemistry", ph] : null,
    ["Technical Notes", notes],
    ["Source Page", pageUrl],
    ["Visitor Region", location],
    ["Submitted (UTC)", submittedAt]
  ].filter(Boolean);

  const textBody = [
    `New B2B Engineering RFQ — Aurora Filtech`,
    `==========================================`,
    ...rows.map(([label, val]) => `${label}: ${val}`)
  ].join("\n");

  const htmlRows = rows.map(([label, val]) => {
    const valHtml = label === "Work Email"
      ? `<a href="mailto:${esc(val)}" style="color:#0F6E66;font-weight:700;text-decoration:none">${esc(val)}</a>`
      : label === "Source Page" && /^https?:\/\//i.test(val)
        ? `<a href="${esc(val)}" style="color:#1E4FD8;word-break:break-all">${esc(val)}</a>`
        : esc(val).replace(/\n/g, "<br>");
    return `<tr>
      <th style="text-align:left;padding:10px 14px;width:190px;background:#F4F6F9;color:#1F2937;font-size:13px;border-bottom:1px solid #E5E7EB;vertical-align:top">${esc(label)}</th>
      <td style="padding:10px 14px;color:#111827;font-size:14px;border-bottom:1px solid #E5E7EB;vertical-align:top">${valHtml}</td>
    </tr>`;
  }).join("");

  const htmlBody = `<!DOCTYPE html>
<html><body style="margin:0;padding:24px;background:#F3F4F6;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <div style="max-width:680px;margin:0 auto;background:#FFFFFF;border:1px solid #E5E7EB;border-radius:10px;overflow:hidden">
    <div style="background:#121B24;color:#FFFFFF;padding:18px 24px">
      <div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#93C5FD;font-weight:700">Aurora Filtech · Official Website Lead</div>
      <h1 style="margin:6px 0 0;font-size:20px;line-height:1.3">${esc(product)} — ${esc(company)}</h1>
    </div>
    <div style="padding:20px 24px">
      <table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB">${htmlRows}</table>
      <p style="margin:16px 0 0;font-size:12px;color:#6B7280">Tip: Click <strong>Reply</strong> directly in your inbox to respond to <strong>${esc(email)}</strong>. Page topic: ${esc(pageTopic)}.</p>
    </div>
  </div>
</body></html>`;

  const toList = singleLine(env.RFQ_TO_EMAIL || DEFAULT_TO)
    .split(",")
    .map(s => s.trim())
    .filter(isValidEmail);
  const primaryFrom = singleLine(env.RFQ_FROM_EMAIL) || DEFAULT_FROM;

  const basePayload = {
    from: primaryFrom,
    to: toList.length ? toList : [DEFAULT_TO],
    reply_to: email,
    subject,
    html: htmlBody,
    text: textBody
  };

  let attempt;
  try {
    attempt = await sendViaResend(env.RESEND_API_KEY, basePayload);
    // If custom domain isn't verified in Resend yet and user didn't lock RFQ_FROM_EMAIL, retry with Resend sandbox sender
    if (!attempt.ok && !env.RFQ_FROM_EMAIL && (attempt.status === 403 || attempt.status === 422)) {
      const errMsg = JSON.stringify(attempt.data || attempt.rawText || "").toLowerCase();
      if (errMsg.includes("domain") || errMsg.includes("verify") || errMsg.includes("not verified")) {
        attempt = await sendViaResend(env.RESEND_API_KEY, { ...basePayload, from: SANDBOX_FROM });
      }
    }
  } catch (err) {
    return jsonRes({
      ok: false,
      success: false,
      message: `Resend API network error: ${err && err.message ? err.message : "connection failed"}`
    }, 502);
  }

  if (!attempt.ok) {
    const errMsg = (attempt.data && (attempt.data.message || attempt.data.error)) || attempt.rawText || `Resend HTTP ${attempt.status}`;
    return jsonRes({ ok: false, success: false, message: String(errMsg) }, attempt.status >= 400 ? attempt.status : 502);
  }

  if (!isAjax) {
    return new Response(`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Inquiry Sent | Aurora Filtech</title></head><body style="font-family:system-ui,sans-serif;max-width:560px;margin:60px auto;padding:24px;line-height:1.6"><h1>✓ Inquiry Received</h1><p>Thank you, <strong>${esc(company)}</strong>. Our engineers will reply to <strong>${esc(email)}</strong> within 24 hours.</p><p><a href="/">← Return to Aurora Filtech</a></p></body></html>`, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" }
    });
  }

  return jsonRes({
    ok: true,
    success: true,
    id: attempt.data && attempt.data.id ? attempt.data.id : null,
    message: "Engineering inquiry delivered."
  }, 200);
}
