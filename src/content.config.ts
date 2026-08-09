import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const seo = z.object({
  title: z.string().max(65).optional(),
  description: z.string().max(170).optional(),
  primaryKeyword: z.string().optional(),
  searchIntent: z.enum(['informational', 'commercial', 'transactional', 'navigational']).optional(),
  canonical: z.url().optional(),
  noindex: z.boolean().default(false),
});

const publishing = {
  draft: z.boolean().default(false),
  publishedDate: z.coerce.date().optional(),
  updatedDate: z.coerce.date().optional(),
  language: z.string().default('en'),
  translationKey: z.string().optional(),
};

const relations = {
  relatedProducts: z.array(z.string()).default([]),
  relatedSolutions: z.array(z.string()).default([]),
  relatedApplications: z.array(z.string()).default([]),
  relatedRequirements: z.array(z.string()).default([]),
  relatedSupport: z.array(z.string()).default([]),
  relatedResources: z.array(z.string()).default([]),
  relatedComparisons: z.array(z.string()).default([]),
};

const resources = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['Buyer Guide', 'Tech Note', 'Sourcing Guide', 'Installation']),
    readingTime: z.string(),
    ...publishing,
    publishedDate: z.coerce.date(),
    featured: z.boolean().default(false),
    seo: seo.optional(),
    targetBuyers: z.array(z.string()).default([]),
    funnelStage: z.enum(['awareness', 'consideration', 'decision']).default('awareness'),
    ...relations,
  }),
});

const evidenceStatus = z.enum([
  'supplier-listed',
  'marketing-claim',
  'conflicting',
  'sample-verified',
  'document-verified',
  'unverified',
]);

const products = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/products' }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    code: z.string(),
    name: z.string(),
    type: z.string(),
    category: z.enum(['dvr', 'display', 'camera', 'helmet']),
    channels: z.enum(['single', 'dual', 'display-only']),
    powerFormat: z.enum(['hardwired', 'usb', 'battery']),
    features: z.array(z.enum(['wifi', 'gps', 'tpms', 'carplay'])).default([]),
    summary: z.string(),
    status: z.string(),
    evidenceStage: z.enum(['source-captured', 'sample-requested', 'sample-tested', 'commercially-approved']),
    featured: z.boolean().default(false),
    priority: z.number().int().min(0).default(0),
    ...publishing,
    seo: seo.optional(),
    sourceRefs: z.array(z.string()).min(1),
    sourceModels: z.array(z.string()).default([]),
    idealFor: z.array(z.string()).min(1),
    highlights: z.array(z.string()).min(1),
    options: z.array(z.string()).default([]),
    verification: z.array(z.string()).default([]),
    specifications: z.array(z.object({
      label: z.string(),
      value: z.string(),
      status: evidenceStatus,
      note: z.string().optional(),
    })).default([]),
    configurations: z.array(z.object({
      name: z.string(),
      description: z.string(),
      attributes: z.array(z.string()).default([]),
    })).default([]),
    ...relations,
  }),
});

// Register collections only when they contain publishable content. Empty glob
// collections produce noisy build warnings and can hide real publishing errors.
// Products and buying paths remain in the single typed source in data/site.ts
// until their staged MDX migration is complete.
export const collections = { resources, products };
