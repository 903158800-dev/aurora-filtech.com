import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const root=fileURLToPath(new URL('../site-v1/',import.meta.url));
const files=(dir,sourceOnly=false)=>fs.readdirSync(dir,{withFileTypes:true})
  .filter(e=>!sourceOnly || (!e.name.startsWith('.')&& !['node_modules','functions'].includes(e.name)))
  .flatMap(e=>e.isDirectory()?files(path.join(dir,e.name),sourceOnly):[path.join(dir,e.name)]);
const pages=files(root,true).filter(f=>f.endsWith('.html'));
test('all generated pages reference existing assets and valid page targets',()=>{
  assert.equal(pages.length,26);
  const redirects=new Set(fs.readFileSync(path.join(root,'_redirects'),'utf8').split('\n').map(l=>l.split(' ')[0]));
  for(const page of pages){
    const html=fs.readFileSync(page,'utf8');
    assert.match(html,/\/assets\/versioned\/style\.[a-f0-9]{16}\.css/);
    assert.match(html,/\/assets\/versioned\/app\.[a-f0-9]{16}\.js/);
    for(const [,url] of html.matchAll(/\b(?:href|src|poster)="(\/[^"?#]*)/g)){
      if(url.startsWith('/api/')||redirects.has(url))continue;
      let target=path.join(root,url);if(url.endsWith('/'))target=path.join(target,'index.html');
      assert.ok(fs.existsSync(target),`${path.relative(root,page)} -> ${url}`);
    }
    for(const [,json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))assert.doesNotThrow(()=>JSON.parse(json));
    if(!page.endsWith('404.html'))assert.equal((html.match(/<h1\b/g)||[]).length,1);
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,page);
  }
});
test('responsive image variants exist and fit their original width',()=>{
  const manifest=JSON.parse(fs.readFileSync(path.join(root,'media-manifest.json'),'utf8'));
  assert.ok(Object.keys(manifest).length>100);
  for(const entry of Object.values(manifest))for(const image of entry.variants){
    assert.ok(image.width<=entry.width);assert.ok(fs.existsSync(path.join(root,image.url)));
  }
});
test('upload output contains no application source or secrets',()=>{
  execFileSync(process.execPath,[path.join(root,'package-pages.cjs')]);
  const outputs=[path.resolve(root,'../dist/v1'),path.join(root,'.pages-output')];
  for(const output of outputs)for(const file of files(output)){
    const relative=path.relative(output,file).split(path.sep).join('/');
    assert.ok(!/(^|\/)(functions|shared|node_modules|tests|\.git)(\/|$)/.test(relative),relative);
    assert.ok(!/(^|\/)(build\.js|package-pages\.cjs|client\.js|design\.js|data-site\.js|data-products\.js|\.dev\.vars.*|\.env.*|package(?:-lock)?\.json|wrangler\.jsonc|media-manifest\.json)$/.test(relative),relative);
  }
  assert.equal(files(outputs[1]).filter(f=>f.endsWith('.html')).length,26);
});
