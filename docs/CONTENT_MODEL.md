# Content and URL governance

- Product IDs are permanent URL slugs. Product display names and supplier model names may change without changing the URL.
- A product claim is published only after it reaches the documented evidence stage. Concept pages intentionally omit Product schema.
- Product, image, specification, status and relation data must have one source of truth. Do not duplicate values in page components.
- MDX is currently the publishing source for buyer resources. Products and buying paths remain in the typed `src/data/site.ts` source until migrated as a complete collection; empty collections are not registered.
- Every product should link to relevant applications, requirements, support topics, comparison guides and an inquiry path.
- When a product is discontinued, retain the page when it still serves buyers or add a one-hop 301 to the closest replacement. Record redirects in deployment configuration.
- Search, filter and parameter combinations are non-indexable by default. Only create indexable landing pages for combinations with distinct search demand, useful copy and a stable canonical URL.
- PDFs require an HTML landing page with summary, audience, revision date and related inquiry path. Do not publish an orphan file URL as the only entry point.
