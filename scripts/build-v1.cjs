const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const site = path.join(root, 'site-v1');
const versioned = path.join(site, 'assets/versioned');
const output = path.join(root, 'dist/v1');
function files(dir) {
  return fs.readdirSync(dir, {withFileTypes:true})
    .filter(e => !e.name.startsWith('.') && !['node_modules','functions'].includes(e.name))
    .flatMap(e => e.isDirectory() ? files(path.join(dir,e.name)) : [path.join(dir,e.name)]);
}
async function main() {
  // First render establishes the exact set of images used by the pages.
  execFileSync(process.execPath,[path.join(site,'build.js')],{cwd:root,stdio:'pipe'});
  const images = new Set();
  for (const file of files(site).filter(f=>f.endsWith('.html'))) {
    for (const match of fs.readFileSync(file,'utf8').matchAll(/<img\b[^>]*(?:\ssrc|\sdata-source)="(\/qfy-content\/[^"?#]+\.(?:jpg|jpeg|png))"/gi)) images.add(match[1]);
  }
  fs.mkdirSync(versioned,{recursive:true});
  const manifest = {};
  for (const url of images) {
    const source=path.join(site,url);
    const bytes=fs.readFileSync(source);
    const meta=await sharp(bytes).metadata();
    const hash=crypto.createHash('sha256').update(bytes).update('webp-q80-v1').digest('hex').slice(0,16);
    const widths=[...new Set([320,640,960,1280,meta.width].filter(w=>w<=meta.width&&w<=1600))].sort((a,b)=>a-b);
    if (!widths.length) widths.push(meta.width);
    const variants=[];
    for(const width of widths){
      const name=`img-${hash}-${width}.webp`;
      const target=path.join(versioned,name);
      if(!fs.existsSync(target))await sharp(bytes).rotate().resize({width,withoutEnlargement:true}).webp({quality:80,effort:5}).toFile(target);
      variants.push({url:'/assets/versioned/'+name,width,bytes:fs.statSync(target).size});
    }
    manifest[url]={width:meta.width,height:meta.height,originalBytes:bytes.length,variants};
  }
  fs.writeFileSync(path.join(site,'media-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
  execFileSync(process.execPath,[path.join(site,'build.js')],{cwd:root,stdio:'inherit'});
  const activeAssets=new Set();
  for(const file of files(site).filter(f=>f.endsWith('.html'))){
    for(const match of fs.readFileSync(file,'utf8').matchAll(/\/assets\/versioned\/([a-zA-Z0-9.-]+)/g))activeAssets.add(match[1]);
  }
  for(const name of fs.readdirSync(versioned)){
    if(/^(?:img-|style\.|app\.)/.test(name)&&!activeAssets.has(name))fs.unlinkSync(path.join(versioned,name));
  }
  // An allowlist keeps source files, tests and local state out of the upload directory.
  if(path.resolve(output)!==path.join(root,'dist','v1')||!path.resolve(output).startsWith(root+path.sep))throw new Error('Unsafe build output path');
  fs.rmSync(output,{recursive:true,force:true});
  fs.mkdirSync(output,{recursive:true});
  const selected=files(site).filter(f=>{
    const relative=path.relative(site,f).split(path.sep).join('/');
    return relative.startsWith('assets/') || relative.startsWith('qfy-content/') ||
      /\.(html|xml|txt|ico|png|svg)$/.test(relative) || ['_headers','_redirects','_routes.json'].includes(relative);
  });
  for(const source of selected){
    const relative=path.relative(site,source);
    if(relative.startsWith('functions'+path.sep))continue;
    const target=path.join(output,relative);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(source,target);
  }
  fs.writeFileSync(path.join(root,'functions/api/rfq.js'),fs.readFileSync(path.join(root,'shared/rfq-function.js')));
  const original=Object.values(manifest).reduce((n,i)=>n+i.originalBytes,0);
  const optimized=Object.values(manifest).reduce((n,i)=>n+i.variants.at(-1).bytes,0);
  console.log(JSON.stringify({output,optimizedImages:images.size,originalBytes:original,largestWebpBytes:optimized,reduction:Math.round((1-optimized/original)*100)+'%'}));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
