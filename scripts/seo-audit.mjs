import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith('.html')) files.push(path);
  }
}
await walk(root);

const errors = [];
const warnings = [];
const titles = new Map();
const text = (html, pattern) => html.match(pattern)?.[1]?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() || '';

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const route = '/' + relative(root, file).split(sep).join('/').replace(/index\.html$/, '');
  const title = text(html, /<title>([\s\S]*?)<\/title>/i);
  const description = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] || '';
  const h1s = html.match(/<h1(?:\s[^>]*)?>/gi) || [];
  if (!title) errors.push(`${route}: missing title`);
  if (title.length > 65) warnings.push(`${route}: title is ${title.length} characters`);
  if (description.length < 70 || description.length > 180) warnings.push(`${route}: description is ${description.length} characters`);
  if (h1s.length !== 1) errors.push(`${route}: expected one H1, found ${h1s.length}`);
  for (const marker of ['rel="canonical"', 'property="og:title"', 'property="og:description"', 'property="og:url"', 'property="og:image"', 'name="twitter:card"']) {
    if (!html.includes(marker)) errors.push(`${route}: missing ${marker}`);
  }
  for (const script of html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(script[1]); } catch { errors.push(`${route}: invalid JSON-LD`); }
  }
  if (titles.has(title)) errors.push(`${route}: duplicate title also used by ${titles.get(title)}`);
  else titles.set(title, route);
}

if (warnings.length) console.warn(`SEO warnings (${warnings.length}):\n- ${warnings.join('\n- ')}`);
if (errors.length) {
  console.error(`SEO errors (${errors.length}):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`SEO audit passed for ${files.length} HTML pages (${warnings.length} advisory warnings).`);
