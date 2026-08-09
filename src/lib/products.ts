import { getCollection, type CollectionEntry } from 'astro:content';

export type ProductEntry = CollectionEntry<'products'>;
export type ProductPlatform = ProductEntry['data'] & { id: string };

export async function getProducts(options: { includeDrafts?: boolean } = {}): Promise<ProductPlatform[]> {
  const entries = await getCollection('products', ({ data }) => options.includeDrafts || !data.draft);
  return entries
    .map((entry) => ({ id: entry.data.slug, ...entry.data }))
    .sort((a, b) => b.priority - a.priority || a.name.localeCompare(b.name));
}

export async function getProductEntries(options: { includeDrafts?: boolean } = {}): Promise<ProductEntry[]> {
  const entries = await getCollection('products', ({ data }) => options.includeDrafts || !data.draft);
  return entries.sort((a, b) => b.data.priority - a.data.priority || a.data.name.localeCompare(b.data.name));
}

const legacyProductMap: Record<string, string[]> = {
  'road-eye-d2': ['screenless-dual-dvr', 'waterproof-dual-dvr-t30a'],
  'ride-view-5': ['detachable-56-smart-display', 'multi-size-smart-display'],
  'tour-view-625': ['vision-pro-625'],
};

export function resolveProductReferences(references: string[]): string[] {
  return [...new Set(references.flatMap((reference) => legacyProductMap[reference] || [reference]))];
}
