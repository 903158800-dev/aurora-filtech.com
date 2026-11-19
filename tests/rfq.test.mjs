import test from 'node:test';
import assert from 'node:assert/strict';
import {EventEmitter} from 'node:events';
import {onRequestGet,createRfqHandler,mailConfiguration,smtpOptions,sendSmtp,openSmtpSocket} from '../shared/rfq-function.js';

const env={SMTP_USER:'johnson@aurora-filtech.com',SMTP_PASSWORD:'test-only-never-real'};
const valid={company:'Test company',email:'903158800@qq.com',notes:'Test inquiry',submission_id:'test-stable-id'};
const request=(data=valid,headers={})=>new Request('https://example.com/api/rfq',{
  method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json',Origin:'https://example.com',...headers},body:JSON.stringify(data)});

test('SMTP configuration fails closed; public health never leaks credentials',async()=>{
  let calls=0;const handler=createRfqHandler(async()=>{calls++;return {id:'mock'};});
  for(const bad of [{},{RESEND_API_KEY:'obsolete'}, {...env,SMTP_PASSWORD:''}, {...env,SMTP_PORT:'25'},
    {...env,SMTP_PORT:'587'}, {...env,RFQ_FROM_EMAIL:'other@example.com'}, {...env,RFQ_TO_EMAIL:'a@example.com,b@example.com'},
    {...env,SMTP_USER:'a\r\nBcc: b@example.com'}, {...env,TURNSTILE_SITE_KEY:'missing-secret'}]){
    assert.equal(onRequestGet({env:bad}).status,503);
    assert.equal((await handler({request:request(),env:bad})).status,503);
  }
  assert.equal(calls,0);
  const health=onRequestGet({env});assert.equal(health.status,200);
  const publicInfo=await health.text();assert.match(publicInfo,/"provider":"smtp"/);
  assert.ok(!publicInfo.includes(env.SMTP_PASSWORD));assert.ok(!publicInfo.includes(env.SMTP_USER));
});

test('invalid requests are rejected before SMTP',async()=>{
  let calls=0;const handler=createRfqHandler(async()=>{calls++;return {id:'mock'};});
  for(const data of [{...valid,email:'invalid'},{...valid,email:'a@example.com,b@example.com'},
    {...valid,company:{}},{...valid,notes:'a'.repeat(6001)},{...valid,_honey:'bot'},[]]){
    assert.equal((await handler({request:request(data),env})).status,400);
  }
  assert.equal((await handler({request:request(valid,{Origin:'https://other.invalid'}),env})).status,403);
  assert.equal((await handler({request:request({...valid,notes:'a'.repeat(40000)}),env})).status,413);
  assert.equal(calls,0);
});

test('authenticated sender and Johnson recipient are fixed; customer is reply-to only',async()=>{
  const calls=[];const handler=createRfqHandler(async(payload)=>{calls.push(payload);return {id:payload.messageId};});
  const response=await handler({request:request({...valid,to:'attacker@example.com',from:'spoof@example.com'}),env});
  assert.equal(response.status,200);assert.equal((await response.json()).status,'accepted');
  await handler({request:request(),env});
  await handler({request:request({...valid,notes:'Changed inquiry'}),env});
  assert.equal(calls[0].replyTo,valid.email);assert.equal(calls[0].from.address,env.SMTP_USER);
  assert.deepEqual(calls[0].envelope,{from:env.SMTP_USER,to:['johnson@aurora-filtech.com']});
  assert.equal(calls[0].messageId,calls[1].messageId);assert.notEqual(calls[1].messageId,calls[2].messageId);
});

test('SMTP transport requires TLS and certificate checks, and closes after acceptance',async()=>{
  const config=mailConfiguration(env);const options=smtpOptions(config);
  assert.equal(options.secure,true);assert.equal(options.port,465);assert.equal(options.tls.rejectUnauthorized,true);
  assert.equal(options.disableFileAccess,true);assert.equal(options.disableUrlAccess,true);
  assert.equal(options.logger,false);assert.equal(options.debug,false);
  let closed=0;let actual;
  const result=await sendSmtp({messageId:'test-id'},config,'ref',opts=>{
    actual=opts;return {sendMail:async message=>{
      assert.ok(message.signal instanceof AbortSignal);
      return {messageId:'test-id',accepted:config.to,rejected:[],response:'250 OK queued'};
    },close:()=>closed++};
  });
  assert.equal(actual.host,'smtp.qiye.aliyun.com');assert.equal(result.id,'test-id');assert.equal(closed,1);
});

test('Workers TLS adapter retains the hostname and only hands off a verified secure connection',async()=>{
  const socket=new EventEmitter();let destroyed=0;socket.destroy=()=>destroyed++;
  let calls=0;let connectionOptions;
  openSmtpSocket({host:'smtp.qiye.aliyun.com'},(error,result)=>{
    calls++;assert.equal(error,null);assert.equal(result.secured,true);assert.equal(result.connection,socket);
  },options=>{connectionOptions=options;return socket;});
  assert.equal(connectionOptions.host,'smtp.qiye.aliyun.com');
  assert.equal(connectionOptions.servername,'smtp.qiye.aliyun.com');assert.equal(connectionOptions.rejectUnauthorized,true);
  assert.equal(calls,0);socket.emit('secureConnect');assert.equal(calls,1);assert.equal(destroyed,0);
  const failureSocket=new EventEmitter();failureSocket.destroy=()=>destroyed++;
  const error=Object.assign(new Error('certificate validation failed'),{code:'CERT_HAS_EXPIRED'});
  openSmtpSocket({host:'smtp.qiye.aliyun.com'},actual=>{calls++;assert.equal(actual,error);},()=>failureSocket);
  failureSocket.emit('error',error);assert.equal(calls,2);assert.equal(destroyed,1);
});

test('lost acknowledgement and SMTP rejection have different retry semantics; neither is retried automatically',async()=>{
  for(const [failure,uncertain] of [
    [Object.assign(Error('secret auth response'),{responseCode:535}),false],
    [Object.assign(Error('recipient rejected'),{responseCode:550}),false],
    [Object.assign(Error('lost final acknowledgement'),{code:'ETIMEDOUT'}),true]
  ]){
    let attempts=0;let closed=0;
    const deliver=(payload,config,ref)=>sendSmtp(payload,config,ref,()=>({
      sendMail:async()=>{attempts++;throw failure;},close:()=>closed++}));
    const response=await createRfqHandler(deliver)({request:request(),env});
    assert.equal(response.status,502);const body=await response.json();
    assert.equal(body.ok,false);assert.equal(body.retryable,!uncertain);assert.equal(body.status,uncertain?'uncertain':'rejected');
    assert.ok(!JSON.stringify(body).includes('secret auth response'));assert.equal(attempts,1);assert.equal(closed,1);
  }
});

test('a malformed or incomplete SMTP acceptance is never reported as success',async()=>{
  for(const result of [{},{messageId:'id',accepted:[],response:'250 OK'},
    {messageId:'id',accepted:['other@example.com'],response:'250 OK'},
    {messageId:'id',accepted:[env.SMTP_USER],rejected:[],response:'354 Continue'}]){
    const deliver=(payload,config,ref)=>sendSmtp(payload,config,ref,()=>({sendMail:async()=>result,close(){}}));
    const response=await createRfqHandler(deliver)({request:request(),env});
    assert.equal(response.status,502);assert.equal((await response.json()).retryable,false);
  }
});

test('email HTML is escaped and mail headers cannot be injected',async()=>{
  let payload;const handler=createRfqHandler(async p=>{payload=p;return {id:p.messageId};});
  await handler({request:request({...valid,company:'<script>bad</script>\r\nBcc: nobody@example.com'}),env});
  assert.ok(payload.html.includes('&lt;script&gt;'));assert.ok(!payload.html.includes('<script>'));
  assert.ok(!/[\r\n]/.test(payload.subject));assert.equal(payload.bcc,undefined);
});

test('rate limiter and Turnstile rejection happen before SMTP',async()=>{
  let calls=0;const handler=createRfqHandler(async()=>{calls++;return {id:'mock'};});
  assert.equal((await handler({request:request(),env:{...env,RFQ_RATE_LIMIT:{limit:async()=>({success:false})}}})).status,429);
  const saved=globalThis.fetch;
  globalThis.fetch=async url=>{assert.match(url,/siteverify/);return Response.json({success:false});};
  try{
    assert.equal((await handler({request:request(),env:{...env,TURNSTILE_SITE_KEY:'public',TURNSTILE_SECRET_KEY:'test'}})).status,403);
    assert.equal(calls,0);
  }finally{globalThis.fetch=saved;}
});
