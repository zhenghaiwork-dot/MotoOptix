# MotoOptix production operations

## Release gate

1. Set `SITE_URL`, `PUBLIC_RFQ_EMAIL` and `PUBLIC_FORM_ENDPOINT` in the production environment. Never commit secrets.
2. Run `pnpm install --frozen-lockfile` and `pnpm run verify`.
3. Review the generated `dist/robots.txt`, sitemap index, canonical URLs and structured data.
4. Test the RFQ from a real mobile device. Confirm delivery, source URL, UTM fields, success redirect and failure handling.
5. Deploy to preview, crawl it for broken links, then promote the same artifact to production.

## Monitoring

- Daily: form delivery failures and endpoint health.
- Weekly: Search Console indexing, 404s, redirect chains and Core Web Vitals.
- Monthly: dependency updates, SSL expiry, backup restore test and a real end-to-end inquiry test.
- Track form success, email clicks and primary CTA clicks as separate analytics events. Do not count button clicks as completed inquiries.

## Form service contract

The configured endpoint must enforce same-origin/CORS policy, email and field validation, newline stripping for mail headers, rate limiting, a honeypot, durable server-side storage and retryable email delivery. It must redirect successful browser submissions to `/inquiry-success/` and failures to `/form-error/`. Store source URL, UTM fields and submission time with every lead. Keep private records outside the public web root and document retention/deletion policy.

## Backup and recovery

- Back up inquiry data daily and retain at least one off-site copy.
- Encrypt backups and restrict access to staff who handle leads.
- Test recovery monthly into an isolated location.
- Before a release, retain the previous deploy artifact and environment configuration for immediate rollback.

## Incident response

1. Disable the affected endpoint or roll back the deploy.
2. Preserve logs and note the first known impact time.
3. Verify whether inquiries were lost, exposed or delayed.
4. Restore delivery from the last known-good release, replay queued notifications where safe, and contact affected buyers when required.
5. Record cause, remediation and a prevention check in the release checklist.

## Domain cutover

The placeholder domain must not be indexed. When an owned domain is ready, set `SITE_URL`, configure both apex and `www` certificates, redirect `www` to the chosen canonical host, force HTTPS, submit the sitemap, and verify canonical/hreflang output. Do not launch on a domain that is merely expected to expire.
