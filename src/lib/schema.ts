export interface Crumb {
  name: string;
  url: string;
}

const abs = (url: string, base: string): string =>
  url.startsWith('http') ? url : new URL(url, base).href;

export function websiteSchema(base: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MotoOptix',
    url: abs('/', base),
    inLanguage: 'en',
  };
}

export function breadcrumbSchema(crumbs: Crumb[], base: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.url, base),
    })),
  };
}

export interface CollectionItem {
  name: string;
  url: string;
  description?: string;
}

export function collectionPageSchema(crumbs: Crumb[], base: string, items: CollectionItem[] = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    breadcrumb: breadcrumbSchema(crumbs, base),
    ...(items.length > 0 && {
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: abs(item.url, base),
          ...(item.description && { description: item.description }),
        })),
      },
    }),
  };
}

export function contactPageSchema(email: string, base: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'MotoOptix',
      url: abs('/', base),
      email,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email,
        url: abs('/contact/', base),
        availableLanguage: ['en'],
      },
    },
  };
}

export function productSchema(
  p: {
    name: string;
    code: string;
    summary: string;
    type: string;
    idealFor: string[];
    slug: string;
  },
  base: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    category: p.type,
    description: p.summary,
    sku: p.code,
    brand: { '@type': 'Brand', name: 'MotoOptix' },
    audience: p.idealFor.map((a) => ({ '@type': 'BusinessAudience', name: a })),
    url: abs(`/products/${p.slug}/`, base),
  };
}
