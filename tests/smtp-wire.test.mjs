import test from 'node:test';
import assert from 'node:assert/strict';
import net from 'node:net';
import nodemailer from 'nodemailer';
import {createRfqHandler,sendSmtp} from '../shared/rfq-function.js';

test('real Nodemailer SMTP dialogue: MIME, envelope and a lost final acknowledgement',async t=>{
  const messages=[];const recipients=[];let loseReply=false;
  const sockets=new Set();
  const server=net.createServer(socket=>{
    sockets.add(socket);socket.on('close',()=>sockets.delete(socket));
    socket.write('220 localhost test SMTP\r\n');let buffer='';let dataMode=false;
    socket.on('data',chunk=>{
      buffer+=chunk.toString();
      while(true){
        if(dataMode){
          const end=buffer.indexOf('\r\n.\r\n');if(end<0)return;
          messages.push(buffer.slice(0,end));buffer=buffer.slice(end+5);dataMode=false;
          if(loseReply){socket.destroy();return;}
          socket.write('250 2.0.0 accepted by local test server\r\n');continue;
        }
        const end=buffer.indexOf('\r\n');if(end<0)return;
        const line=buffer.slice(0,end);buffer=buffer.slice(end+2);
        if(line.startsWith('EHLO '))socket.write('250-localhost\r\n250-AUTH PLAIN\r\n250 8BITMIME\r\n');
        else if(line.startsWith('AUTH PLAIN '))socket.write('235 2.7.0 test authentication accepted\r\n');
        else if(line.startsWith('MAIL FROM:'))socket.write('250 OK\r\n');
        else if(line.startsWith('RCPT TO:')){recipients.push(line);socket.write('250 OK\r\n');}
        else if(line==='DATA'){dataMode=true;socket.write('354 End with dot\r\n');}
        else if(line==='QUIT'){socket.end('221 Bye\r\n');return;}
        else socket.write('500 Unsupported test command\r\n');
      }
    });
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(async()=>{for(const s of sockets)s.destroy();await new Promise(resolve=>server.close(resolve));});
  // Plain SMTP exists only in this loopback test, using dummy credentials. Production is TLS-only.
  const deliver=(payload,config,ref)=>sendSmtp(payload,config,ref,options=>nodemailer.createTransport({
    ...options,getSocket:undefined,host:'127.0.0.1',port:server.address().port,secure:false,ignoreTLS:true}));
  const handler=createRfqHandler(deliver);
  const env={SMTP_USER:'aaron@aurora-filtech.com',SMTP_PASSWORD:'local-test-only'};
  const makeRequest=()=>new Request('https://example.com/api/rfq',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
    body:JSON.stringify({company:'中文测试厂',email:'903158800@qq.com',product:'过滤网',notes:'Line one\n.\nLine three',submission_id:'wire-test'})});
  const accepted=await handler({request:makeRequest(),env});assert.equal(accepted.status,200);
  assert.equal((await accepted.json()).status,'accepted');assert.equal(messages.length,1);
  assert.match(messages[0],/^From: Aurora Filtech RFQ <aaron@aurora-filtech.com>/m);
  assert.match(messages[0],/^Reply-To: 903158800@qq.com/m);
  assert.match(messages[0],/^To: johnson@aurora-filtech.com/m);
  assert.match(messages[0],/^Subject: .*?=\?UTF-8\?[BQ]\?/im);
  assert.match(messages[0],/Content-Type: multipart\/alternative/);
  assert.equal(recipients[0],'RCPT TO:<johnson@aurora-filtech.com>');
  loseReply=true;
  const uncertain=await handler({request:makeRequest(),env});assert.equal(uncertain.status,502);
  assert.equal((await uncertain.json()).code,'SMTP_RESULT_UNKNOWN');
  assert.equal(messages.length,2,'must not retry after the receiver got DATA but the reply was lost');
});
