# MotoOptix Astro Site

English B2B inquiry site for wholesale motorcycle dash camera and smart display sourcing.

## Local development

```sh
pnpm install
pnpm dev
```

Production verification:

```sh
pnpm build
pnpm audit
pnpm audit:complete
```

## Environment

Copy `.env.example` to `.env` and set:

- `SITE_URL`: an owned production domain; never point canonical URLs to an unowned domain
- `PUBLIC_RFQ_EMAIL`: business inquiry email
- `PUBLIC_FORM_ENDPOINT`: HTTPS form receiver; when empty the preview uses `mailto:`

## Content workflow

- Product and solution platform data: `src/data/site.ts`
- Long-form resources: `src/content/resources/`
- Supplier intake checklist: `docs/SUPPLIER_INTAKE.md`
- Product publishing gate: `docs/PRODUCT_PUBLISHING_RULES.md`

Current product pages are explicitly reference platforms. Do not change `evidenceStage` or add fixed specifications until the corresponding supplier and sample record satisfies the publishing rules.

Before public launch, complete every applicable item in `docs/LAUNCH_CHECKLIST.md`.
