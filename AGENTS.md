# AGENTS.md — MotoOptix (Astro 7 static site)

## Quick commands

```sh
pnpm install                          # pnpm@11.20.0 required; Node 22.22.2 (engines: >=22.12.0 <25)
pnpm dev                              # astro dev
pnpm build                            # astro build → dist/
pnpm run check                        # astro check (type-check)
pnpm run lint                         # eslint
pnpm run audit                        # dist/ HTML metadata & broken-link audit
pnpm run audit:complete               # dist/ completion gate (routes, schema, responsive, evidence, domain)
pnpm run audit:seo                    # dist/ SEO audit (titles, OG, JSON-LD, duplicates)
pnpm run verify                       # check → lint → build → audit → audit:complete → audit:seo (sequential)
pnpm install --frozen-lockfile        # CI/deploy install
```

All `audit:*` scripts read **dist/** — run `pnpm build` first or they fail.

## Architecture

- **Single Astro 7 static site** — `output: 'static'`, integrations: `@astrojs/mdx`, `@astrojs/sitemap`
- `src/data/site.ts` — typed arrays for products, solutions, applications, requirements, support topics, comparison guides (primary data source for non-MDX pages)
- `src/content/products/` — MDX product collection (staged migration from `site.ts`; use `evidenceStage: source-captured`)
- `src/content/resources/` — MDX buyer resources with `category`, `readingTime`, `funnelStage`, `targetBuyers`
- `src/lib/products.ts` — `getProducts()`, `getProductEntries()`, and `legacyProductMap` that resolves old `site.ts` product IDs to MDX slugs
- `src/lib/schema.ts` — JSON-LD helpers for Website, BreadcrumbList, CollectionPage, ContactPage, Product
- `src/layouts/BaseLayout.astro` — single layout; auto-generates `<title>`, OG tags, canonical, hreflang, Organization schema
- `src/pages/robots.txt.ts` — generates `robots.txt` + sitemap reference at build
- `intake/` — 1688/Alibaba supplier catalog (MHTML/JSON/TXT/img); ingested by Python scripts in `scripts/intake_catalog.py`, `mhtml_extract.py`, `mhtml_parse.py`, `mhtml_probe.py`
- `docs/` — operational guides (CONTENT_MODEL, PRODUCT_PUBLISHING_RULES, LAUNCH_CHECKLIST, SUPPLIER_INTAKE, OPERATIONS)
- `pnpm-workspace.yaml` exists only to allow `esbuild` builds — **not** a monorepo

## Hard constraints (do not violate)

### Product publishing gates
- `evidenceStage` must follow `docs/PRODUCT_PUBLISHING_RULES.md`: `source-captured` → `sample-requested` → `sample-tested` → `commercially-approved` (MDX products); `concept` → … (site.ts products)
- **Never add fixed specification tables or Product JSON-LD schema to pages below `sample-tested` (or `commercially-approved` for commercial terms)**
- One product page = one supplier configuration + revision. Do not mix claims from different suppliers
- Use `status: supplier-listed | marketing-claim | conflicting | sample-verified | document-verified | unverified` on every specification
- Never publish MOQ, lead time, or confirmed commercial terms without a dated confirmation

### Domain safety
- **Never hardcode `dashcamsupply.com`** in canonical tags, email addresses, legal text, structured data, or any source file
- `SITE_URL` must be set via environment; the build default is `https://example.com`

### Data hygiene
- Product IDs are **permanent URL slugs** — display names may change without changing the slug
- Product data has a single source of truth; do not duplicate values in page components
- `empty glob collections` cause noisy build warnings — `src/content.config.ts` only registers collections that contain publishable content
- CF routes reference `legacyProductMap` in `src/lib/products.ts` for old `site.ts` product IDs

### Form & contact
- Contact form must read `PUBLIC_FORM_ENDPOINT` from env, falling back to `mailto:` when empty
- Contact page must include `privacy_consent` checkbox and `.hp-field` honeypot

## CI

GitHub Actions (`ci.yml`): `pnpm install --frozen-lockfile` then `pnpm run verify`. Runs on every push and PR.

## When adding or editing content

- **Product pages**: edit `src/content/products/<slug>.mdx` frontmatter; the `slug` must match `[a-z0-9]+(?:-[a-z0-9]+)*$`
- **Buyer resources**: add `src/content/resources/<slug>.md`/`.mdx` with required frontmatter (`title`, `description`, `category`, `readingTime`, `publishedDate`)
- **Site data pages** (solutions, applications, requirements, support, comparisons): edit `src/data/site.ts`
- **Navigation** lives in `src/layouts/BaseLayout.astro`
- **New intake data**: place MHTML files in `intake/`, run `scripts/intake_catalog.py`
- After content changes, run `pnpm run verify` to catch broken links, missing metadata, schema errors, and staging violations

## Environment

Copy `.env.example` to `.env` and set:
- `SITE_URL` — owned production domain (never an unowned placeholder)
- `PUBLIC_RFQ_EMAIL` — business inquiry email
- `PUBLIC_FORM_ENDPOINT` — HTTPS form receiver; leave empty for `mailto:` fallback during local dev
