# LLM / AI-Search Visibility (GEO) — Implementation Plan

**Goal:** get Payerset surfaced and *cited* by ChatGPT, Perplexity, Claude, and Google AI Overviews.
**Status:** Tier 1 + core Tier 2 schema **shipped** (2026-06-10). Remaining content work (FAQ, glossary, author pages) and two inputs (founding year, author LinkedIn URLs) are flagged below.

### Shipped
- ✅ `public/llms.txt` created
- ✅ `public/robots.txt` — explicit AI-crawler allow rules
- ✅ All 12 trust-carousel logos labeled with real org names (was `alt="Partner logo"`)
- ✅ `BaseLayout` Organization schema expanded (`@id`, `description`, `knowsAbout`, `contactPoint`)
- ✅ `BaseLayout` gained a reusable `extraSchema` prop (passthrough via `PageLayout`)
- ✅ `SoftwareApplication` schema on Rate Explorer; `Dataset` schema on Data Lake + Snowflake Marketplace
- ✅ `BlogPosting` linked to the Organization `@id`; added `mainEntityOfPage` + `inLanguage`
- ✅ `BreadcrumbList` on Insights (`/post/`) and Price Transparency Project blog posts
- ✅ Verified: site builds; all 14 emitted JSON-LD blocks are valid JSON; sitemap no longer ships stale `/transparencyproject/` paths

### Shipped (2026-06-18, on `origin/main`)
- ✅ **FAQPage** with visible Q&A on homepage, pricing, rateexplorer, datalake, research, and the PTP hub — shared `FaqAccordion` component + `buildFaqSchema` util (visible text + schema share one array). See changelog doc §2b.
- ✅ **Glossary** at `/glossary` with `DefinedTermSet`/`DefinedTerm` schema (14 terms); linked from footer + `llms.txt`.

### Still open (needs your input or a content pass)
- ⏳ **Author E-E-A-T:** add `sameAs` (LinkedIn) to blog authors + optional `/authors/<name>` pages — *needs LinkedIn URLs*
- ⏳ **Organization enrichment:** `foundingDate` + `founders` — *needs the year/names*
- ⏳ **TL;DR standardization** across all posts + plain-text product-page intro paragraphs — *content pass*

---

_Original plan below (for reference / the remaining items)._

---

## How LLM visibility actually works (the "why" behind every item)

LLMs surface a site through two channels, and we want both:

1. **Training ingestion** — crawlers (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`) scrape pages into model training sets.
2. **Live retrieval / citation** — ChatGPT Search, Perplexity, Claude (web), and Google AI Overviews fetch pages *at query time* and cite them.

What earns a citation: **answer-first prose** that directly answers a question, **machine-readable structure** (JSON-LD, headings, dates, named authors), and **corroboration** (the same facts about Payerset appearing consistently across your site and the web). The recommendations below serve those three things.

---

## Current state audit

| Area | Status | Notes |
|---|---|---|
| `robots.txt` allows crawling | ✅ | `User-agent: * / Allow: /` + sitemap reference |
| XML sitemap | ✅ | via `@astrojs/sitemap` |
| Canonical URLs, OG/Twitter tags | ✅ | every page, in `BaseLayout.astro` |
| JSON-LD: Organization / WebSite / BlogPosting | ✅ (minimal) | `Organization` is bare; author is a plain string |
| Substantive, dated, authored content | ✅ | strong blog + Price Transparency Project |
| Answer-first "TL;DR" pattern | ⚠️ partial | only the CMS/TiC post uses it |
| **`llms.txt`** | ❌ missing | the file you asked about |
| **Explicit AI-crawler rules** | ❌ missing | relying on wildcard default |
| **Logo alt text = entity signals** | ❌ weak | most logos are `alt="Partner logo"` |
| **Rich schema** (Product, FAQPage, Breadcrumb, Person author) | ❌ missing | biggest citation lever |
| **Definitional / glossary content** | ❌ missing | the exact format LLMs cite |
| Committed `dist/` sitemap | ⚠️ stale | shows old `/transparencyproject/` paths |

---

# TIER 1 — Quick wins (high impact, low effort)

## 1.1 Create `/public/llms.txt`

The [llms.txt standard](https://llmstxt.org) is a curated markdown index at your site root that tells an LLM what your company is and where your best content lives — stripped of nav/markup noise. Create `public/llms.txt` with the content below (review the descriptions, fill the two `TODO`s, then ship). Astro serves anything in `public/` at the root, so this becomes `https://www.payerset.com/llms.txt` automatically.

```markdown
# Payerset

> Payerset is a healthcare price transparency data company. We turn payer and
> hospital machine-readable files (MRFs) into clean, analyzable contracted-rate
> and claims data so health systems, providers, and health-tech teams can
> benchmark reimbursement, prepare for managed care contract negotiations, and
> understand competitive rates in their market.

Payerset's data covers Transparency in Coverage (TiC) payer rates and Hospital
Price Transparency files, normalized and made queryable through our products and
the Snowflake Marketplace. Our editorial hub, the Price Transparency Project,
publishes analysis, policy explainers, and practical playbooks on using this data.

## Products
- [Rate Explorer](https://www.payerset.com/rateexplorer): Explore contracted commercial rates by payer, provider, and procedure in your market.
- [Data Lake](https://www.payerset.com/datalake): Full normalized price transparency datasets delivered for analytics teams.
- [Snowflake Marketplace](https://www.payerset.com/snowflakemarketplace): Access Payerset price transparency data directly in Snowflake.
- [Research](https://www.payerset.com/research): Research-grade access to price transparency data.
- [Pricing](https://www.payerset.com/pricing): Plans and packaging.

## The Price Transparency Project (editorial hub)
- [Project home](https://www.payerset.com/pricetransparencyproject): Analysis, policy, and playbooks on price transparency data.
- [Part 1: How to Analyze Price Transparency Data for Reimbursement Benchmarking](https://www.payerset.com/pricetransparencyproject/blog/how-to-analyze-hospital-price-transparency-data-for-reimbursement-benchmarking): A framework for benchmarking reimbursement between hospitals using MRF data.
- [Part 2: A Practical Look at Reimbursement Benchmarking](https://www.payerset.com/pricetransparencyproject/blog/a-practical-look-at-reimbursement-benchmarking-with-price-transparency-data): Why single-code comparisons mislead and what a sound methodology looks like.
- [CMS Proposes Major Updates to Transparency in Coverage (TiC) Rules](https://www.payerset.com/pricetransparencyproject/blog/cms-proposes-major-updates-to-transparency-in-coverage-rules): Network-based files, annual utilization files, quarterly reporting, enhanced out-of-network data.
- [TiC Schema 2.0 Is Live](https://www.payerset.com/pricetransparencyproject/blog/transparency-in-coverage-tic-schema-2-0-is-live-updates): What changed in the Transparency in Coverage schema.
- [Hospital Price Transparency Requirements & the April 1 Enforcement Deadline](https://www.payerset.com/pricetransparencyproject/blog/updates-to-hospital-price-transparency-requirements-and-the-april-1st-enforcement-deadline): Updated requirements and enforcement timeline.

## Company
- [About Payerset](https://www.payerset.com/about-us): Who we are and what we do.
- [Insights (full blog)](https://www.payerset.com/insights): All articles, Payercast episodes, and MRF parsing deep-dives.
- [Request a demo](https://www.payerset.com/get-started): Talk to the team.

## Optional
- [Privacy Policy](https://www.payerset.com/privacy)
- [Terms of Use](https://www.payerset.com/terms-of-use)
```

> **TODO before shipping:** (1) Confirm each product one-liner matches how you describe it on the page. (2) Decide whether to also generate `llms-full.txt` — a single file concatenating the full text of your best 8–10 articles. It's optional but lets retrieval engines ingest your whole argument in one fetch. This can be auto-generated at build time (see 1.4).

## 1.2 Add explicit AI-crawler rules to `/public/robots.txt`

You already allow everyone, but stating it explicitly removes ambiguity, future-proofs against an accidental wildcard block, and signals you *want* to be ingested. Replace the file with:

```
# Search + AI crawlers — explicitly welcome
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: *
Allow: /

Sitemap: https://www.payerset.com/sitemap-index.xml
```

> Note: `Google-Extended` and `Applebot-Extended` are training opt-in tokens, not crawlers — allowing them lets Gemini/Apple Intelligence train on your content. Keep them only if you're comfortable being in training data (recommended for visibility).

## 1.3 Fix logo alt text (entity association)

In [`src/pages/index.astro`](../src/pages/index.astro), the trust carousel renders most logos with `alt="Partner logo"`. Every logo is a chance to teach an LLM *who Payerset works with* — name each one. Example:

```diff
- <Image src={logo454} alt="Partner logo" class="h-10 w-auto object-contain" loading="eager" />
+ <Image src={logo454} alt="Vanderbilt University Medical Center" class="h-10 w-auto object-contain" loading="eager" />
```

Do this for both the original and the duplicated carousel set. (You'll need to map each `logo4xx` import to the real org name — `logo453` and `logo460` are already correctly labeled Northwell Health and Cone Health.)

---

# TIER 2 — Structured data & content depth (high impact, medium effort)

All schema lives in [`src/layouts/BaseLayout.astro`](../src/layouts/BaseLayout.astro).

## 2.1 Expand the `Organization` schema

`knowsAbout` is the key addition — it tells LLMs which topics to associate with Payerset.

```js
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.payerset.com/#organization',
  name: 'Payerset',
  url: 'https://www.payerset.com',
  logo: 'https://www.payerset.com/images/og-default.png',
  description:
    'Healthcare price transparency data company. Payerset turns payer and hospital machine-readable files into clean, analyzable contracted-rate and claims data for reimbursement benchmarking and managed care contract negotiations.',
  knowsAbout: [
    'Healthcare price transparency',
    'Transparency in Coverage (TiC)',
    'Hospital Price Transparency',
    'Machine-readable files (MRF)',
    'Reimbursement benchmarking',
    'Managed care contract negotiation',
    'Commercial payer contracted rates',
  ],
  // TODO: confirm before adding —
  // foundingDate: 'YYYY',
  // founders: [{ '@type': 'Person', name: '...' }],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    url: 'https://www.payerset.com/get-started',
  },
  sameAs: [
    'https://www.linkedin.com/company/payerset',
    // TODO: add Crunchbase, X/Twitter, YouTube (Payercast), G2 once URLs confirmed
  ],
};
```

## 2.2 Make blog authors real entities (`Person` + `sameAs`)

Right now `author` is a bare string. LLMs weight author authority (E-E-A-T). Add a small author map and reference it:

```js
// authors.ts — name → profile
export const authors = {
  'Matt Phillips':  { sameAs: 'https://www.linkedin.com/in/...' },
  'Jacob Little':   { sameAs: 'https://www.linkedin.com/in/...' },
};
```

```js
// in blogPostingSchema:
author: {
  '@type': 'Person',
  name: author,
  ...(authors[author]?.sameAs && { sameAs: authors[author].sameAs }),
},
```

Bigger win (optional): create real `/authors/[name]` pages with a bio + photo + linked posts. Author pages are strong authority signals and give LLMs a person entity to attribute quotes to.

## 2.3 Add a `FAQPage` schema mechanism

`FAQPage` is the schema most likely to win a verbatim citation. Add an optional prop to `BaseLayout` so any page can pass Q&A pairs:

```js
// BaseLayout Props
faq?: { question: string; answer: string }[];

// build schema
const faqSchema = faq?.length ? {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
} : null;

// in <head>
{faqSchema && <script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />}
```

Then add a visible FAQ section + this prop to: homepage, `pricing`, `rateexplorer`, `datalake`, and the Price Transparency Project hub. The on-page text and the schema must match.

## 2.4 Add `BreadcrumbList` on blog/PTP pages

Helps LLMs (and Google) understand hierarchy and show breadcrumb context in citations. Build from the URL path in the blog/PTP templates and inject as JSON-LD.

## 2.5 Add `SoftwareApplication` / `Product` schema to product pages

Give `rateexplorer`, `datalake`, and `snowflakemarketplace` a machine-readable product description (pass via an `extraSchema` prop on `BaseLayout`):

```js
{
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Payerset Rate Explorer',
  applicationCategory: 'BusinessApplication',
  description: 'Explore contracted commercial rates by payer, provider, and procedure.',
  offers: { '@type': 'Offer', url: 'https://www.payerset.com/get-started' },
  provider: { '@id': 'https://www.payerset.com/#organization' },
}
```

> Implementation note: `BaseLayout` currently only emits three fixed schemas. Add one optional `extraSchema` prop (an array of objects) that pages can pass, and `.map()` it into `<script type="application/ld+json">` tags. That single change unlocks 2.3, 2.4, and 2.5 cleanly.

## 2.6 Definitional / glossary content (highest content ROI)

LLMs answer queries like *"what is a machine-readable file in healthcare?"* or *"what is reimbursement benchmarking?"* You have this expertise buried in narrative posts. Surface it in the extractable format LLMs cite:

- Build a **`/glossary`** page (or per-term pages) defining: Machine-Readable File (MRF), Transparency in Coverage (TiC), Hospital Price Transparency, Negotiated Rate, Allowed Amount, Reimbursement Benchmarking, Payer, In-Network/Out-of-Network rates. One clean 2–4 sentence definition each, with `DefinedTerm` schema.
- **Standardize the TL;DR block** you already use on the CMS/TiC post across every article — a 3–5 bullet answer-first summary at the top. This is the single easiest content change with outsized citation impact.
- Add an answer-first opening sentence to product pages (LLMs can't read your `HeroMap` component — they need plain text describing what Payerset does).

---

# TIER 3 — see the separate off-site checklist

Off-site corroboration (Wikidata, profile consistency, third-party citations) is the biggest real-world driver of LLM citations and is tracked in **`llm-geo-offsite-checklist.md`**.

Also: rebuild and re-commit (or stop committing) the stale `dist/` sitemap so you're not shipping old `/transparencyproject/` paths.

---

## Suggested sequencing

| Step | Item | Effort | Impact |
|---|---|---|---|
| 1 | `llms.txt` (1.1) | 30 min | High |
| 2 | robots.txt AI rules (1.2) | 10 min | Med |
| 3 | Logo alt text (1.3) | 20 min | Med |
| 4 | `extraSchema` prop + Organization expansion (2.1, 2.5 plumbing) | 1–2 hr | High |
| 5 | TL;DR standardization + product-page intro text (2.6) | ongoing | High |
| 6 | FAQPage on 5 key pages (2.3) | 2–3 hr | High |
| 7 | Person authors + author pages (2.2) | 2–4 hr | Med |
| 8 | Glossary + DefinedTerm (2.6) | half day | High |
| 9 | BreadcrumbList (2.4) | 1 hr | Low/Med |

## How to verify after implementing
- **Schema:** [Google Rich Results Test](https://search.google.com/test/rich-results) + [Schema.org validator](https://validator.schema.org) on each template.
- **llms.txt:** load `https://www.payerset.com/llms.txt` and confirm it renders as plain markdown.
- **Crawl access:** Google Search Console → URL Inspection; confirm no `robots.txt` block.
- **Citation tracking:** see the off-site checklist's monitoring section.
