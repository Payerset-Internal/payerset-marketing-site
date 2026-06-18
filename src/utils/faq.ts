/**
 * Shared FAQ types + JSON-LD builder.
 *
 * The same `faqs` array drives both the visible <FaqAccordion> and the
 * FAQPage structured data, so the on-page Q&A and the schema can never drift
 * (a Google requirement for FAQ rich results). Answers/questions may contain
 * inline HTML for display; `buildFaqSchema` strips it to clean text for the
 * `acceptedAnswer`. Provide `text` to override the schema text when an answer's
 * markup (e.g. a bulleted list) doesn't strip cleanly.
 */
export interface FaqItem {
  /** Question — inline HTML allowed (rendered with set:html). */
  q: string;
  /** Answer — inline HTML allowed (rendered with set:html). */
  a: string;
  /** Optional plain-text answer for the schema; falls back to a stripped `a`. */
  text?: string;
}

const decodeEntities = (s: string): string =>
  s
    .replace(/&trade;/g, '™')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&bull;/g, '•')
    .replace(/&nbsp;/g, ' ')
    .replace(/&rsquo;|&#8217;/g, '’')
    .replace(/&lsquo;|&#8216;/g, '‘')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');

const toText = (html: string): string =>
  decodeEntities(html.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();

/** Build a schema.org FAQPage object from the same array the UI renders. */
export function buildFaqSchema(faqs: FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: toText(f.q),
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.text ? toText(f.text) : toText(f.a),
      },
    })),
  };
}
