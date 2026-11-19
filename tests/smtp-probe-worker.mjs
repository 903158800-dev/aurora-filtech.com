// Development probe only. It sends EHLO/QUIT, never AUTH, MAIL FROM or DATA.
import nodemailer from 'nodemailer';
import {mailConfiguration,smtpOptions} from '../shared/rfq-function.js';
export default {async fetch(request,env){
  const options=smtpOptions(mailConfiguration({}));delete options.auth;
  // Optional diagnostic override: retains the official hostname for TLS certificate validation.
  if(env.PROBE_ADDRESS) options.host=env.PROBE_ADDRESS;
  const transport=nodemailer.createTransport(options);
  try{
    await transport.verify();
    return Response.json({ok:true,host:options.host,port:options.port,tls:true,authenticated:false,messageSent:false});
  }catch(error){
    return Response.json({ok:false,code:error.code||'CONNECTION_ERROR',command:error.command||null,detail:error.message,authenticated:false,messageSent:false},{status:502});
  }finally{transport.close();}
}};
