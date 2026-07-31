/**
 * Site-wide constants.
 *
 * SITE_URL is the canonical origin, with NO trailing slash. Netlify serves the
 * apex domain and 301-redirects www → apex, so apex is canonical. Anything that
 * emits an absolute URL (JSON-LD, share links, llms.txt) must use this, or it
 * will point at a redirect.
 *
 * Keep in sync with `site` in astro.config.mjs.
 */
export const SITE_URL = 'https://payerset.com';

/** Stable @id for the Organization entity, referenced by other schema blocks. */
export const ORG_ID = `${SITE_URL}/#organization`;

/**
 * Absolute URL for a page path, always with a trailing slash.
 *
 * Astro serves pages at /path/ and 301s /path → /path/, so any absolute URL we
 * emit (JSON-LD, share links, llms.txt) must carry the slash or it points at a
 * redirect. Use this instead of interpolating SITE_URL by hand.
 *
 *   pageUrl('pricing')        → https://payerset.com/pricing/
 *   pageUrl('/platform/x/')   → https://payerset.com/platform/x/
 *   pageUrl()                 → https://payerset.com/
 */
export const pageUrl = (path = ''): string => {
  const trimmed = path.replace(/^\/+/, '').replace(/\/+$/, '');
  return trimmed ? `${SITE_URL}/${trimmed}/` : `${SITE_URL}/`;
};
