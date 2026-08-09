import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('../dist/', import.meta.url).pathname.replace(/^\/(.:\/)/, '$1');
const htmlFiles = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) htmlFiles.push(path);
  }
}
walk(root);

const problems = [];
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const label = relative(root, file);
  for (const required of [/<title>.+<\/title>/s, /name="description"/, /rel="canonical"/]) {
    if (!required.test(html)) problems.push(`${label}: missing required head metadata`);
  }
  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = match[1].split(/[?#]/)[0];
    if (!href || href.startsWith('//')) continue;
    const target = href.endsWith('/') ? join(root, href, 'index.html') : join(root, href);
    const fallback = join(root, href, 'index.html');
    if (!existsSync(target) && !existsSync(fallback)) problems.push(`${label}: broken internal link ${href}`);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`Audit passed: ${htmlFiles.length} HTML pages, required metadata and internal links verified.`);
