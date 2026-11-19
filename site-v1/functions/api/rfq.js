/** Cloudflare Pages /api/rfq. Secrets belong in Cloudflare, never in this file. */
const DEFAULT_TO = 'johnson@aurora-filtech.com';
const DEFAULT_FROM = 'Aurora Filtech RFQ <rfq@aurora-filtech.com>';
const MAX_BODY_BYTES = 32768;
const LIMITS = { company:160, email:254, name:200, customer_type:80, product:160,
  machine:200, size:160, material:200, temperature:80, ph:80, notes:6000,
  request:6000, page_url:2048, page_topic:200, submission_id:80, _honey:200,
  'cf-turnstile-response':2048 };
const HEADERS = {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',
  'X-Robots-Tag':'noindex','X-Content-Type-Options':'nosniff'};
const json = (data,status=200,extra={}) => new Response(JSON.stringify(data),{status,headers:{...HEADERS,...extra}});
const fail = (code,message,status=400) => json({ok:false,success:false,code,message},status);
const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const emailValid = value => typeof value === 'string' && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(value);
const line = value => (value || '').replace(/[\r\n\u0000-\u001f\u007f]+/g,' ').trim();
const unavailable = 'Online inquiries are temporarily unavailable. Please use Email or WhatsApp below; your details remain in this form.';

async function parsePayload(request) {
  if (Number(request.headers.get('content-length')) > MAX_BODY_BYTES) throw {status:413,code:'PAYLOAD_TOO_LARGE'};
  const reader=request.body?.getReader();
  let size=0; const chunks=[];
  if(reader) try {
    while(true){ const {done,value}=await reader.read(); if(done)break;
      size+=value.byteLength;
      if(size>MAX_BODY_BYTES){await reader.cancel();throw {status:413,code:'PAYLOAD_TOO_LARGE'};}
      chunks.push(value);
    }
  } finally {reader.releaseLock();}
  const bytes=new Uint8Array(size); let offset=0;
  for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  const ct=request.headers.get('content-type')||'';
  if(ct.includes('application/json')){
    const value=JSON.parse(new TextDecoder().decode(bytes));
    if(!value || typeof value!=='object' || Array.isArray(value)) throw {status:400,code:'INVALID_PAYLOAD'};
    return value;
  }
  if(ct.includes('application/x-www-form-urlencoded') || ct.includes('multipart/form-data')){
    return Object.fromEntries(await new Response(bytes,{headers:{'Content-Type':ct}}).formData());
  }
  throw {status:415,code:'UNSUPPORTED_CONTENT_TYPE'};
}

function mailConfiguration(env={}) {
  const from=env.RFQ_FROM_EMAIL || DEFAULT_FROM;
  const to=(env.RFQ_TO_EMAIL || DEFAULT_TO).split(',').map(v=>v.trim()).filter(Boolean);
  return {from,to,ready:Boolean(env.RESEND_API_KEY) && !/[\r\n]/.test(from) &&
    !from.includes('@resend.dev') && to.length>0 && to.every(emailValid)};
}

export function onRequestGet({env={}}) {
  const config=mailConfiguration(env);
  const challengeReady=!env.TURNSTILE_SECRET_KEY || Boolean(env.TURNSTILE_SITE_KEY);
  return json({ok:config.ready&&challengeReady,service:'aurora-rfq',provider:'resend',
    configured:config.ready&&challengeReady,turnstileSiteKey:env.TURNSTILE_SECRET_KEY ? (env.TURNSTILE_SITE_KEY||null) : null},config.ready&&challengeReady?200:503);
}
export function onRequestOptions(){return new Response(null,{status:204,headers:{Allow:'GET, POST, OPTIONS','Cache-Control':'no-store'}});}

export async function onRequestPost({request,env={}}) {
  const origin=request.headers.get('origin');
  if(origin && origin!==new URL(request.url).origin) return fail('INVALID_ORIGIN','Please submit the form from this website.',403);
  let raw;
  try {raw=await parsePayload(request);} catch(e){return fail(e.code||'INVALID_PAYLOAD','The inquiry is invalid or too long. Please check the form.',e.status||400);}
  const data={};
  for(const [key,max] of Object.entries(LIMITS)){
    if(raw[key]==null)continue;
    if(typeof raw[key]!=='string' || raw[key].length>max) return fail('INVALID_FIELD',`Please check the ${key.replaceAll('_',' ')} field.`,400);
    data[key]=raw[key].trim();
  }
  if(data._honey) return fail('INVALID_SUBMISSION','Please reload the page and try again.',400);
  if(!line(data.company) || !emailValid(data.email)) return fail('INVALID_CONTACT','Please enter your company and a valid email address.');
  const config=mailConfiguration(env);
  if(!config.ready || (env.TURNSTILE_SECRET_KEY&&!env.TURNSTILE_SITE_KEY)) return fail('MAIL_NOT_CONFIGURED',unavailable,503);
  // Optional platform limiter. Production should also apply an edge rate limit to /api/rfq.
  if(env.RFQ_RATE_LIMIT){
    const result=await env.RFQ_RATE_LIMIT.limit({key:request.headers.get('cf-connecting-ip')||'unknown'});
    if(!result.success)return json({ok:false,success:false,code:'RATE_LIMITED',message:'Too many inquiries. Please wait a minute and try again.'},429,{'Retry-After':'60'});
  }
  if(env.TURNSTILE_SECRET_KEY){
    try{
      const response=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{
        method:'POST',signal:AbortSignal.timeout(5000),headers:{'Content-Type':'application/json'},
        body:JSON.stringify({secret:env.TURNSTILE_SECRET_KEY,response:data['cf-turnstile-response']||'',remoteip:request.headers.get('cf-connecting-ip')||undefined})});
      const result=await response.json();
      if(!response.ok || !result.success || result.hostname!==new URL(request.url).hostname) return fail('CHALLENGE_FAILED','Please complete the verification and try again.',403);
    }catch{return fail('CHALLENGE_UNAVAILABLE','Verification is temporarily unavailable. Please try again or contact us by email.',503);}
  }
  const product=line(data.product)||line(data.page_topic)||'General Inquiry';
  // Keep the provider payload deterministic: retries must not change a timestamp or visitor location.
  const rows=[['Company',line(data.company)],['Work email',data.email],['Contact / WhatsApp',line(data.name)],
    ['Buyer role',line(data.customer_type)],['Product / topic',product],['Machine',line(data.machine)],
    ['Dimensions',line(data.size)],['Material / slurry',line(data.material)],['Temperature',line(data.temperature)],
    ['pH / chemistry',line(data.ph)],['Technical notes',data.notes||data.request||''],['Source page',line(data.page_url)],
    ['Submission reference',line(data.submission_id)]].filter(([,v])=>v);
  const payload={from:config.from,to:config.to,reply_to:data.email,
    subject:`[RFQ] ${product.slice(0,100)} — ${line(data.company).slice(0,100)}`,
    text:'Aurora Filtech website inquiry\n\n'+rows.map(([k,v])=>`${k}: ${v}`).join('\n'),
    html:`<!doctype html><html><body style="font-family:Arial,sans-serif;color:#1C2B33;line-height:1.6"><h1 style="font-size:22px">New website inquiry</h1><table style="border-collapse:collapse">${rows.map(([k,v])=>`<tr><th style="text-align:left;vertical-align:top;padding:10px;border-bottom:1px solid #ddd">${esc(k)}</th><td style="padding:10px;border-bottom:1px solid #ddd;white-space:pre-wrap">${esc(v)}</td></tr>`).join('')}</table><p>Use Reply to contact the customer directly.</p></body></html>`};
  const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(payload)));
  const key='rfq-'+Array.from(new Uint8Array(digest),v=>v.toString(16).padStart(2,'0')).join('');
  const reference=key.slice(4,16);
  try{
    const response=await fetch('https://api.resend.com/emails',{method:'POST',signal:AbortSignal.timeout(8000),
      headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':key},body:JSON.stringify(payload)});
    const result=await response.json().catch(()=>null);
    if(!response.ok || !result?.id){
      console.warn(JSON.stringify({event:'rfq_provider_rejected',reference,status:response.status,code:result?.name||'invalid_response'}));
      return json({ok:false,success:false,code:'MAIL_PROVIDER_REJECTED',reference,message:unavailable},502);
    }
    console.info(JSON.stringify({event:'rfq_accepted',reference,id:result.id}));
    if(!(request.headers.get('accept')||'').includes('application/json')){
      return new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Inquiry submitted | Aurora Filtech</title><body style="font-family:system-ui;max-width:600px;margin:60px auto;padding:24px"><h1>Inquiry submitted</h1><p>Your inquiry has been accepted for sending. Our team normally replies within one business day.</p><p>Reference: ${reference}</p><a href="/">Return to Aurora Filtech</a></body></html>`,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Robots-Tag':'noindex'}});
    }
    return json({ok:true,success:true,status:'accepted',id:result.id,reference,message:'Your inquiry has been accepted for sending.'});
  }catch(e){
    console.warn(JSON.stringify({event:'rfq_provider_unreachable',reference,timeout:e.name==='TimeoutError'||e.name==='AbortError'}));
    return json({ok:false,success:false,code:'MAIL_PROVIDER_UNREACHABLE',reference,message:'We could not confirm submission. Please retry once; the same inquiry will not be sent twice.'},502);
  }
}
