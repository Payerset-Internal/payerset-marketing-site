// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Apex is canonical — Netlify 301-redirects www → apex.
  // Keep in sync with SITE_URL in src/consts.ts.
  site: 'https://payerset.com',
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: netlify(),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thank-you'),
    }),
    mdx(),
  ],
});