/**
 * Base-aware internal links.
 *
 * GitHub Pages serves a project repo from a subdirectory
 * (user.github.io/repo/), and Astro does NOT rewrite plain `href="/..."`
 * strings — so every internal link has to go through here, or the whole
 * site 404s under a subdirectory deploy.
 *
 * `import.meta.env.BASE_URL` is '/' when no base is configured, and
 * '/repo/' when one is. Both collapse to the right thing below.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function href(path: string): string {
  // Leave external URLs, mailto:, tel: and bare fragments alone.
  if (!path.startsWith('/')) return path;
  return `${BASE}${path}`;
}
