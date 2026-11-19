// Local browser integration harness. The email provider is always mocked. Never deploy this server.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {onRequestGet,onRequestPost} from '../shared/rfq-function.js';
const root=path.resolve(fileURLToPath(new URL('../dist/v1/',import.meta.url)));
const env={RESEND_API_KEY:'mock-only-no-real-email'};
let mode='accepted';let calls=0;const keys=new Map();
globalThis.fetch=async(url,init)=>{
  if(url!=='https://api.resend.com/emails')throw new Error('External requests are disabled in this harness');
  calls++;
  if(mode==='rejected')return Response.json({name:'mock_rejection'},{status:403});
  const key=init.headers['Idempotency-Key'];
  if(!keys.has(key))keys.set(key,`MOCK-${keys.size+1}`);
  return Response.json({id:keys.get(key)});
};
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.mp4':'video/mp4'};
http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://127.0.0.1:8713');
    if(url.pathname==='/__qa'){
      const chosen=url.searchParams.get('mode');if(['accepted','rejected','unconfigured'].includes(chosen))mode=chosen;
      res.setHeader('Content-Type','application/json');res.end(JSON.stringify({mode,providerCalls:calls,uniqueEmails:keys.size,mocked:true}));return;
    }
    if(url.pathname==='/api/rfq'){
      const config=mode==='unconfigured'?{}:env;
      let response;
      if(req.method==='GET')response=onRequestGet({env:config});
      else {
        const chunks=[];for await(const chunk of req)chunks.push(chunk);
        response=await onRequestPost({env:config,request:new Request(url,{method:req.method,headers:req.headers,body:Buffer.concat(chunks)})});
      }
      res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));return;
    }
    let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
    if(!file.startsWith(root+path.sep)&&file!==path.resolve(root)){res.writeHead(403).end();return;}
    if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
    if(!fs.existsSync(file)){res.writeHead(404).end();return;}
    res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
    res.setHeader('Cache-Control','no-store');fs.createReadStream(file).pipe(res);
  }catch(error){res.writeHead(500,{'Content-Type':'text/plain'}).end('QA harness failure');console.error(error.message);}
}).listen(8713,'127.0.0.1',()=>console.log('Mock email browser test only: http://127.0.0.1:8713'));
