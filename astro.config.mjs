import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { loadEnv } from 'vite';

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const env = loadEnv(mode, process.cwd(), '');
const siteUrl = process.env.SITE_URL || env.SITE_URL || 'https://example.com';

export default defineConfig({
  site: siteUrl,
  integrations: [mdx(), sitemap()],
  output: 'static',
});
