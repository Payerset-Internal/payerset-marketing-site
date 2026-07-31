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
