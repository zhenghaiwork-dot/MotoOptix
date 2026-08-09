import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const project = new URL('../', import.meta.url).pathname.replace(/^\/(.:\/)/, '$1');
const dist = join(project, 'dist');
const failures = [];
const pass = (condition, message) => { if (!condition) failures.push(message); };
const read = path => readFileSync(join(project, path), 'utf8');
const page = route => readFileSync(join(dist, route, 'index.html'), 'utf8');

const pkg = JSON.parse(read('package.json'));
pass(/^\^?7\./.test(pkg.dependencies.astro), 'Astro dependency is not pinned to major version 7');

const requiredRoutes = [
  '', 'products', 'products/screenless-dual-dvr', 'products/detachable-56-smart-display', 'products/vision-pro-625',
  'products/mini-dvr-d8', 'products/helmet-dual-camera-c20', 'products/compact-camera-mt100',
  'solutions', 'solutions/distributors', 'solutions/installers', 'solutions/fleets',
  'resources', 'resources/evaluate-motorcycle-dash-cam-supplier',
  'resources/what-motorcycle-camera-ip-ratings-prove',
  'resources/private-label-without-product-development',
  'resources/planning-acc-hardwired-motorcycle-camera-kit',
  'how-we-work', 'private-label', 'quality', 'faq', 'about', 'contact', 'privacy', 'terms',
  'inquiry-success', 'form-error',
];
for (const route of requiredRoutes) pass(existsSync(join(dist, route, 'index.html')), `Missing required route: /${route}/`);
pass(existsSync(join(dist, '404.html')), 'Missing 404 page');
pass(existsSync(join(dist, 'robots.txt')), 'Missing robots.txt');
pass(existsSync(join(dist, 'sitemap-index.xml')), 'Missing sitemap index');
pass(existsSync(join(dist, 'og.png')), 'Missing social preview image');

const layout = read('src/layouts/BaseLayout.astro');
const css = read('src/styles/global.css');
const contact = read('src/pages/contact.astro');
const productDetail = read('src/pages/products/[id].astro');
const faq = page('faq');
const resource = page('resources/evaluate-motorcycle-dash-cam-supplier');
const home = page('');

pass(layout.includes('width=device-width'), 'Missing responsive viewport');
pass(css.includes('@media(max-width:900px)') && css.includes('@media(max-width:600px)'), 'Responsive breakpoints missing');
pass(css.includes('clamp(') && css.includes('100vw'), 'Fluid full-width styling primitives missing');
pass(/\.solution-columns\{background:var\(--surface\);color:var\(--ink\)\}/.test(css), 'Solution columns must pair the light surface with a dark foreground');
pass(css.includes('.compare-head>span{background:#191b18;color:#fff}'), 'Compare table header foreground/background pairing missing');
pass(css.includes('.mesh-cta .button-accent span{color:var(--ink)}'), 'Accent CTA icon contrast override missing');
pass(/\.detail-grid\{[\s\S]*?max-width:none;[\s\S]*?padding:120px max\(24px,calc\(\(100vw - 1320px\)\/2\)\)/.test(css), 'Product detail background must remain full width');
pass(/\.principles\{[\s\S]*?max-width:none;[\s\S]*?padding:90px max\(24px,calc\(\(100vw - 1320px\)\/2\)\)/.test(css), 'Principles background must remain full width');
pass(css.includes('.policy-content{background:transparent}'), 'Policy reading column must not create an isolated white strip');
pass(contact.includes('PUBLIC_FORM_ENDPOINT'), 'Form endpoint is not environment-configurable');
pass(contact.includes('privacy_consent') && contact.includes('hp-field'), 'Form consent or spam trap missing');
pass(faq.includes('FAQPage'), 'FAQ structured data missing');
pass(resource.includes('"@type":"Article"'), 'Article structured data missing');
pass(home.includes('"@type":"Organization"'), 'Organization structured data missing');
pass(!productDetail.includes("'@type': 'Product'"), 'Reference platform incorrectly publishes Product schema');
pass(productDetail.includes("['sample-tested', 'commercially-approved'].includes(product.evidenceStage)"), 'Product schema is not gated by evidence stage');
pass(contact.includes("products.map(item => <option") && contact.includes("inquiry_intent"), 'Contact form does not preserve the full product list and inquiry intent');
const siteData = read('src/data/site.ts');
pass(!/evidenceStage:\s*'commercially-approved'/.test(siteData), 'A reference product appears to be commercially approved without evidence');
pass(![layout, siteData, read('astro.config.mjs'), contact].join('\n').includes('dashcamsupply.com'), 'Unowned domain is hard-coded in production source');

if (failures.length) {
  console.error(`Completion audit failed (${failures.length}):\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log(`Completion audit passed: Astro 7, ${requiredRoutes.length} required routes, responsive layout, SEO entities, inquiry controls and evidence gates verified.`);
