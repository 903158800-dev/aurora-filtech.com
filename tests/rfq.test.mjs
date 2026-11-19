import test from 'node:test';
import assert from 'node:assert/strict';
import {onRequestGet,onRequestPost} from '../shared/rfq-function.js';

const env={RESEND_API_KEY:'test-only-never-real'};
const valid={company:'Test company',email:'tester@example.com',notes:'Test inquiry',submission_id:'test-stable-id'};
function request(data=valid,headers={}){
  return new Request('https://example.com/api/rfq',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json',Origin:'https://example.com',...headers},body:JSON.stringify(data)});
}
test('health and POST truthfully reject missing configuration before sending',async()=>{
  assert.equal(onRequestGet({env:{}}).status,503);
  const response=await onRequestPost({request:request(),env:{}});
  assert.equal(response.status,503);assert.equal((await response.json()).code,'MAIL_NOT_CONFIGURED');
});
test('invalid requests never reach the email provider',async()=>{
  let sent=0;const saved=globalThis.fetch;globalThis.fetch=async()=>{sent++;throw Error('Must not send');};
  try{
    for(const data of [{...valid,email:'invalid'}, {...valid,company:{}}, {...valid,notes:'a'.repeat(6001)}, {...valid,_honey:'bot'},[]]){
      assert.equal((await onRequestPost({request:request(data),env})).status,400);
    }
    assert.equal((await onRequestPost({request:request(valid,{Origin:'https://other.invalid'}),env})).status,403);
    assert.equal((await onRequestPost({request:request({...valid,notes:'a'.repeat(40000)}),env})).status,413);
    assert.equal(sent,0);
  }finally{globalThis.fetch=saved;}
});
test('same inquiry has deterministic provider body and idempotency key; edited inquiry differs',async()=>{
  const calls=[];const saved=globalThis.fetch;
  globalThis.fetch=async(url,init)=>{calls.push({url,init});return Response.json({id:'mock-provider-id'});};
  try{
    const first=await onRequestPost({request:request(),env});assert.equal(first.status,200);
    assert.equal((await first.json()).status,'accepted');
    await onRequestPost({request:request(),env});
    await onRequestPost({request:request({...valid,notes:'Changed inquiry'}),env});
    assert.equal(calls[0].init.body,calls[1].init.body);
    assert.equal(calls[0].init.headers['Idempotency-Key'],calls[1].init.headers['Idempotency-Key']);
    assert.notEqual(calls[1].init.headers['Idempotency-Key'],calls[2].init.headers['Idempotency-Key']);
    const body=JSON.parse(calls[0].init.body);
    assert.equal(body.reply_to,valid.email);assert.deepEqual(body.to,['johnson@aurora-filtech.com']);
  }finally{globalThis.fetch=saved;}
});
test('provider rejection, malformed success, and network failure do not report delivery',async()=>{
  const saved=globalThis.fetch;
  try{
    for(const fake of [async()=>Response.json({name:'validation_error',message:'secret provider details'},{status:403}),async()=>Response.json({ok:true}),async()=>{throw new Error('network');}]){
      globalThis.fetch=fake;
      const response=await onRequestPost({request:request(),env});assert.equal(response.status,502);
      const body=await response.json();assert.equal(body.ok,false);assert.ok(!JSON.stringify(body).includes('secret provider details'));
    }
  }finally{globalThis.fetch=saved;}
});
test('email HTML is escaped and sandbox sender is never used as a silent fallback',async()=>{
  const saved=globalThis.fetch;let payload;
  globalThis.fetch=async(url,init)=>{payload=JSON.parse(init.body);return Response.json({id:'mock'});};
  try{
    await onRequestPost({request:request({...valid,company:'<script>bad</script>'}),env});
    assert.ok(payload.html.includes('&lt;script&gt;'));assert.ok(!payload.html.includes('<script>'));
    assert.equal((await onRequestPost({request:request(),env:{...env,RFQ_FROM_EMAIL:'onboarding@resend.dev'}})).status,503);
  }finally{globalThis.fetch=saved;}
});
test('configured limiter and verification reject before sending',async()=>{
  assert.equal((await onRequestPost({request:request(),env:{...env,RFQ_RATE_LIMIT:{limit:async()=>({success:false})}}})).status,429);
  const saved=globalThis.fetch;let sends=0;
  globalThis.fetch=async(url)=>{assert.match(url,/siteverify/);sends++;return Response.json({success:false});};
  try{
    assert.equal((await onRequestPost({request:request(),env:{...env,TURNSTILE_SITE_KEY:'public',TURNSTILE_SECRET_KEY:'test'}})).status,403);
    assert.equal(sends,1);
  }finally{globalThis.fetch=saved;}
});
