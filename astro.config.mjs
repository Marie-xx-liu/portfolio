// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * Where the site lives. Currently: the `portfolio` repo under the
 * Marie-xx-liu account, served free at
 *
 *     https://marie-xx-liu.github.io/portfolio/
 *
 * Other shapes, if the setup changes later:
 *
 *   · user repo (`marie-xx-liu.github.io`) → root URL
 *       SITE: 'https://marie-xx-liu.github.io'   BASE: ''
 *   · custom domain
 *       SITE: 'https://marieliu.com'             BASE: ''
 *
 * Internal links go through `href()` in src/lib/url.ts, so BASE is the
 * only thing that has to change between them.
 */
const SITE_URL = process.env.SITE_URL ?? 'https://marie-xx-liu.github.io';
const BASE = process.env.BASE_PATH ?? '/portfolio';

export default defineConfig({
  site: SITE_URL,
  // Astro treats an empty base as "no base"; passing undefined keeps the
  // root-served config clean rather than emitting a stray '//'.
  base: BASE || undefined,
  output: 'static',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
