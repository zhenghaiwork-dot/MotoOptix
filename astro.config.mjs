import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: process.env.SITE_URL || 'https://example.com',
  integrations: [mdx(), sitemap()],
  output: 'static',
});
