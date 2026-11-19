// Stage only public assets: Pages Git's older uploader ignores .assetsignore.
const fs = require('node:fs');
const path = require('node:path');
const source = __dirname;
const output = path.resolve(source, '.pages-output');
if (output !== path.join(source, '.pages-output') || !output.startsWith(source + path.sep)) {
  throw new Error('Unsafe Pages output path');
}
fs.rmSync(output, {recursive:true, force:true});
fs.mkdirSync(output, {recursive:true});
let count = 0;
function copyPublic(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
    if (entry.name.startsWith('.') || ['node_modules','functions'].includes(entry.name)) continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { copyPublic(file); continue; }
    if (!entry.isFile()) continue;
    const relative = path.relative(source, file).split(path.sep).join('/');
    const allowed = relative.startsWith('assets/') || relative.startsWith('qfy-content/') ||
      /\.(html|xml|txt|ico|png|svg)$/.test(relative) ||
      ['_headers','_redirects','_routes.json'].includes(relative);
    if (!allowed) continue;
    const target = path.join(output, relative);
    fs.mkdirSync(path.dirname(target), {recursive:true});
    fs.copyFileSync(file, target);
    count++;
  }
}
copyPublic(source);
console.log(`Staged ${count} public files in .pages-output`);
