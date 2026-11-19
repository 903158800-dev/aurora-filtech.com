/** Cloudflare Pages /api/rfq. Secrets belong in Cloudflare, never in this file. */
import nodemailer from 'nodemailer';
import {connect as connectTls} from 'node:tls';
const DEFAULT_TO = 'johnson@aurora-filtech.com';
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
const emailValid = value => typeof value === 'string' && value.length<=254 && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(value);
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

export function mailConfiguration(env={}) {
  const host=env.SMTP_HOST || 'smtp.qq.com';
  const port=Number(env.SMTP_PORT || 465);
  const user=env.SMTP_USER || '';
  const password=env.SMTP_PASSWORD || '';
  const from=env.RFQ_FROM_EMAIL || user;
  const to=env.RFQ_TO_EMAIL || DEFAULT_TO;
  // One authenticated sender and one fixed recipient. No routing is taken from form fields.
  const ready=typeof host==='string' && /^[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(host) &&
    port===465 && emailValid(user) && emailValid(from) && from.toLowerCase()===user.toLowerCase() &&
    emailValid(to) && typeof password==='string' && password.length>0 && password.length<=1024 && !/[\0\r\n]/.test(password);
  return {host,port,user,password,from,to:[to],ready};
}

export function smtpOptions(config) {
  return {host:config.host,port:465,secure:true,
    auth:{user:config.user,pass:config.password},name:'aurora-filtech.com',
    tls:{servername:config.host,rejectUnauthorized:true,minVersion:'TLSv1.2'},
    connectionTimeout:8000,greetingTimeout:6000,socketTimeout:10000,dnsTimeout:5000,
    pool:false,logger:false,debug:false,transactionLog:false,
    disableFileAccess:true,disableUrlAccess:true,maxRecipients:1,getSocket:openSmtpSocket};
}

export function openSmtpSocket(options,callback,connect=connectTls) {
  // Keep the official hostname through Workers' TCP/TLS proxy. Nodemailer's pre-resolved IP
  // connection path fails in the tested Workers runtime; the hostname TLS path is verified.
  let socket;let timer;let finished=false;
  const finish=(error)=>{
    if(finished)return;finished=true;clearTimeout(timer);
    socket?.off('error',failed);socket?.off('secureConnect',secured);
    if(error){socket?.destroy();callback(error);}
    else callback(null,{connection:socket,secured:true});
  };
  const failed=error=>finish(error);
  const secured=()=>finish();
  try{
    socket=connect({host:options.host,port:465,servername:options.host,
      rejectUnauthorized:true,minVersion:'TLSv1.2'});
    socket.once('error',failed);socket.once('secureConnect',secured);
    timer=setTimeout(()=>finish(Object.assign(new Error('SMTP TLS connection timeout'),{code:'ETIMEDOUT'})),8000);
  }catch(error){finish(error);}
}

export async function sendSmtp(payload,config,reference,createTransport=nodemailer.createTransport) {
  const transport=createTransport(smtpOptions(config));
  try {
    const info=await transport.sendMail({...payload,signal:AbortSignal.timeout(20000)});
    const accepted=Array.isArray(info?.accepted) && config.to.every(address=>info.accepted.some(a=>typeof a==='string'&&a.toLowerCase()===address.toLowerCase()));
    if(!accepted || (info.rejected?.length) || !/^250\b/.test(info.response||'') || !info.messageId){
      throw Object.assign(new Error('SMTP result not confirmed'),{code:'SMTP_RESULT_UNKNOWN'});
    }
    // SMTP 250 means the server accepted the message, not inbox delivery.
    return {id:info.messageId};
  } catch(error) {
    const rejected=Number(error.responseCode)>=400 && Number(error.responseCode)<=599;
    // A lost connection/timeout can occur AFTER DATA was accepted. Never automatically retry it.
    const failure=Object.assign(new Error(rejected?'SMTP rejected the inquiry':'SMTP result not confirmed'),{
      code:rejected?'SMTP_REJECTED':'SMTP_RESULT_UNKNOWN',uncertain:!rejected,
      smtpStatus:rejected?Number(error.responseCode):undefined});
    throw failure;
  } finally {transport.close();}
}

export function onRequestGet({env={}}) {
  const config=mailConfiguration(env);
  const challengeReady=Boolean(env.TURNSTILE_SECRET_KEY)===Boolean(env.TURNSTILE_SITE_KEY);
  return json({ok:config.ready&&challengeReady,service:'aurora-rfq',provider:'smtp',
    configured:config.ready&&challengeReady,turnstileSiteKey:env.TURNSTILE_SECRET_KEY ? (env.TURNSTILE_SITE_KEY||null) : null},config.ready&&challengeReady?200:503);
}
export function onRequestOptions(){return new Response(null,{status:204,headers:{Allow:'GET, POST, OPTIONS','Cache-Control':'no-store'}});}

export function createRfqHandler(deliver=sendSmtp) {
return async function handlePost({request,env={}}) {
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
  if(!config.ready || Boolean(env.TURNSTILE_SECRET_KEY)!==Boolean(env.TURNSTILE_SITE_KEY)) return fail('MAIL_NOT_CONFIGURED',unavailable,503);
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
  // Stable references help trace a submission; SMTP itself has no idempotency guarantee.
  const rows=[['Company',line(data.company)],['Work email',data.email],['Contact / WhatsApp',line(data.name)],
    ['Buyer role',line(data.customer_type)],['Product / topic',product],['Machine',line(data.machine)],
    ['Dimensions',line(data.size)],['Material / slurry',line(data.material)],['Temperature',line(data.temperature)],
    ['pH / chemistry',line(data.ph)],['Technical notes',data.notes||data.request||''],['Source page',line(data.page_url)],
    ['Submission reference',line(data.submission_id)]].filter(([,v])=>v);
  const payload={from:{name:'Aurora Filtech RFQ',address:config.from},to:config.to,replyTo:data.email,
    envelope:{from:config.from,to:config.to},
    subject:`[RFQ] ${product.slice(0,100)} — ${line(data.company).slice(0,100)}`,
    text:'Aurora Filtech website inquiry\n\n'+rows.map(([k,v])=>`${k}: ${v}`).join('\n'),
    html:`<!doctype html><html><body style="font-family:Arial,sans-serif;color:#1C2B33;line-height:1.6"><h1 style="font-size:22px">New website inquiry</h1><table style="border-collapse:collapse">${rows.map(([k,v])=>`<tr><th style="text-align:left;vertical-align:top;padding:10px;border-bottom:1px solid #ddd">${esc(k)}</th><td style="padding:10px;border-bottom:1px solid #ddd;white-space:pre-wrap">${esc(v)}</td></tr>`).join('')}</table><p>Use Reply to contact the customer directly.</p></body></html>`};
  const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(payload)));
  const key='rfq-'+Array.from(new Uint8Array(digest),v=>v.toString(16).padStart(2,'0')).join('');
  const reference=key.slice(4,16);
  payload.messageId=`<${key}@${config.from.split('@')[1]}>`;
  payload.headers={'X-Aurora-Inquiry-Reference':reference};
  try{
    const result=await deliver(payload,config,reference);
    if(!result?.id)throw Object.assign(new Error('Invalid SMTP result'),{code:'SMTP_RESULT_UNKNOWN',uncertain:true});
    console.info(JSON.stringify({event:'rfq_smtp_accepted',reference}));
    if(!(request.headers.get('accept')||'').includes('application/json')){
      return new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Inquiry submitted | Aurora Filtech</title><body style="font-family:system-ui;max-width:600px;margin:60px auto;padding:24px"><h1>Inquiry submitted</h1><p>Your inquiry has been accepted for sending. Our team normally replies within one business day.</p><p>Reference: ${reference}</p><a href="/">Return to Aurora Filtech</a></body></html>`,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Robots-Tag':'noindex'}});
    }
    return json({ok:true,success:true,status:'accepted',id:result.id,reference,message:'Your inquiry has been accepted for sending.'});
  }catch(e){
    const uncertain=e.code!=='SMTP_REJECTED';
    console.warn(JSON.stringify({event:uncertain?'rfq_smtp_unknown':'rfq_smtp_rejected',reference,smtpStatus:e.smtpStatus}));
    return json({ok:false,success:false,code:uncertain?'SMTP_RESULT_UNKNOWN':'SMTP_REJECTED',
      status:uncertain?'uncertain':'rejected',retryable:!uncertain,reference,
      message:uncertain?'The mail server reply was interrupted, so this inquiry may already have been sent. Please contact us by Email or WhatsApp with this reference before submitting again.':unavailable},502);
  }
};
}
export const onRequestPost=createRfqHandler();
