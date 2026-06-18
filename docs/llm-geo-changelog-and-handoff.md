# LLM / AI-Search Visibility (GEO) — Changelog & Knowledge Transfer

> **Purpose:** self-contained handoff so this initiative can continue in a fresh chat with no prior context.
> **Project:** Payerset marketing site (`payerset-site`) — Astro 5 + Tailwind v4 + MDX, deployed on Netlify. Dev server: `npm run dev` (port 4321). Build: `npm run build`. Production: https://www.payerset.com
> **Branch:** `main` · **Status:** Tier 1 + core Tier 2 schema committed & pushed in `9f52803`. **FAQ + Glossary + `llms-full.txt` work (2026-06-18) committed & pushed in `b8dea7c` on `origin/main`** — see §2b. Remaining: TL;DR standardization, plain-text product intros, and 2 user inputs (founding year, author LinkedIn URLs).

---

## 0. TL;DR for the next session

We're improving how Payerset shows up in / gets cited by LLMs (ChatGPT, Perplexity, Claude, Google AI Overviews) — a.k.a. **GEO (Generative Engine Optimization)**. The on-site quick wins and structured-data foundation are **done and verified building**. What remains is (a) two facts only the user can supply, and (b) content-writing passes (FAQ, glossary, TL;DRs, author pages). Full plan in [`llm-geo-implementation-plan.md`](./llm-geo-implementation-plan.md); off-site/marketing actions in [`llm-geo-offsite-checklist.md`](./llm-geo-offsite-checklist.md).

**If you're resuming: start at §4 (Open items).** Everything in §2 is already done.

---

## 1. How LLM visibility works (the rationale)

Two channels, both targeted:
1. **Training ingestion** — `GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot` scrape pages into training data.
2. **Live retrieval / citation** — ChatGPT Search, Perplexity, Claude (web), Google AI Overviews fetch + **cite** pages at query time.

What earns surfacing/citation: **answer-first prose**, **machine-readable structure** (JSON-LD, headings, dates, named authors), and **corroboration** (the same facts about Payerset appearing consistently across the site and the wider web). Every change below serves one of those three.

---

## 2. Changelog — what was shipped (2026-06-10)

All changes below are **committed and pushed** in `9f52803` on `origin/main`. `dist/` is gitignored (build artifact). Files in that commit:

### New files
| File | What it does |
|---|---|
| `public/llms.txt` | Curated, AI-readable markdown index of what Payerset is + best products/articles. Astro serves `public/` at root → live at `https://www.payerset.com/llms.txt`. |
| `docs/llm-geo-implementation-plan.md` | Full plan; top section tracks shipped vs. open. |
| `docs/llm-geo-offsite-checklist.md` | Off-site/marketing actions (Wikidata, profile consistency, citations, monitoring). |
| `docs/llm-geo-changelog-and-handoff.md` | This file. |

### Modified files
| File | Change |
|---|---|
| `public/robots.txt` | Replaced bare wildcard with **explicit `Allow: /` rules for AI crawlers** (`GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-Web`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`) + kept `User-agent: *` and the sitemap line. |
| `src/layouts/BaseLayout.astro` | (1) **Expanded `Organization` JSON-LD**: added `@id` (`https://www.payerset.com/#organization`), richer `description`, `contactPoint`, and `knowsAbout` topic array. (2) Added a reusable **`extraSchema?: Record<string, unknown>[]`** prop, rendered in `<head>` as one `<script type="application/ld+json">` per entry. (3) `BlogPosting` now references the Org `@id` as publisher and adds `mainEntityOfPage` + `inLanguage: 'en-US'`. |
| `src/layouts/PageLayout.astro` | Added `extraSchema` to its `Props` interface so it type-checks through to `BaseLayout` (it already spreads `{...props}`). |
| `src/pages/index.astro` | **Logo carousel alt text**: all 12 trust logos now name the real org (see table §3). Was `alt="Partner logo"` on 10 of them. |
| `src/pages/rateexplorer.astro` | Added `SoftwareApplication` schema via `extraSchema`. |
| `src/pages/datalake.astro` | Added `Dataset` schema via `extraSchema`. |
| `src/pages/snowflakemarketplace.astro` | Added `Dataset` schema (`isAccessibleForFree: true`) via `extraSchema`. |
| `src/pages/post/[...slug].astro` | Added `BreadcrumbList` (Home → Insights → Category → Post) via `extraSchema`. |
| `src/pages/pricetransparencyproject/blog/[slug].astro` | Added `BreadcrumbList` (Home → The Price Transparency Project → Post) via `extraSchema`. |

### Side effect
- Rebuilding regenerated the (gitignored) sitemap, which now uses correct `/pricetransparencyproject/` paths instead of stale `/transparencyproject/` ones. Production rebuilds on every Netlify deploy, so this self-heals.

---

## 2b. Changelog — FAQ schema + Glossary (2026-06-18)

**Committed & pushed in `b8dea7c` (2026-06-18).** Build passes; all emitted JSON-LD validated (**19 blocks, 0 invalid**); verified rendering in the dev preview (homepage / rateexplorer / datalake / pricing / research / PTP hub FAQs + `/glossary`) with no console errors.

This closed open items **§4b #3 (FAQPage)** and **§4b #4 (Glossary)**.

### New files
| File | What it does |
|---|---|
| `src/utils/faq.ts` | `FaqItem` type + `buildFaqSchema(faqs)`. One array drives both the visible accordion and the `FAQPage` JSON-LD, so on-page Q&A and schema **cannot drift** (Google's match requirement). Strips inline HTML to clean schema text; `text?` field overrides when markup (e.g. a bulleted list) won't strip cleanly. |
| `src/components/FaqAccordion.astro` | Shared `<details>` accordion (renders only the Q&A list, so each page keeps its own section heading/eyebrow/background). Props: `faqs`, `reveal?` (staggered scroll-reveal). Questions/answers rendered via `set:html` to preserve ™ superscripts, `<strong>`, bullet lists. |
| `src/pages/glossary.astro` | New `/glossary` page. 14 terms (MRF, TiC, Hospital Price Transparency, negotiated/allowed rate, in-/out-of-network, payer, reimbursement benchmarking, NPI, TIN, CPT/HCPCS, DRG, billing code) each as an `<h2>` + definition, anchor-linked, with a quick-nav. Emits `DefinedTermSet` JSON-LD (each term a `DefinedTerm` with `@id`/`url` anchors, `inDefinedTermSet`, publisher → Org `@id`). Single `terms` array drives visible text **and** schema. |

### Modified files
| File | Change |
|---|---|
| `src/pages/index.astro` | FAQ refactored to `FaqAccordion` + `buildFaqSchema` (5 Q&A) → `FAQPage`. |
| `src/pages/rateexplorer.astro` | Same; `extraSchema=[softwareSchema, buildFaqSchema(faqs)]`. The bullet-list answer uses a `text` override for clean schema. |
| `src/pages/datalake.astro` | Same; `extraSchema=[datasetSchema, buildFaqSchema(faqs)]`. |
| `src/pages/pricing.astro` | Same (6 Q&A). |
| `src/pages/research.astro` | Same (3 Q&A) — previously had visible FAQ but no schema. |
| `src/pages/pricetransparencyproject/index.astro` | **Net-new** FAQ section (6 educational/definitional Q&A: "what is TiC/MRF/hospital price transparency", etc.) inserted before `TPBottomCta`, + `FAQPage`. |
| `src/components/Footer.astro` | Added **Glossary** link under Resources. |
| `public/llms.txt` | Added a **Reference** section linking `/glossary`. |

**Note on visible/schema match:** the 4 pages that already had hardcoded FAQs (index, rateexplorer, datalake) and the array-based ones (pricing, research) were all migrated to the shared component, so the visible text is now generated from the same array as the schema — no duplication/drift. Minor formatting (e.g. "Rate Explorer™" → "Rate Explorer ™" in stripped schema text) is cosmetic and within Google's tolerance.

### Also added: `llms-full.txt` (full-text AI export)
| File | What it does |
|---|---|
| `src/data/glossary.ts` | Glossary terms extracted to a shared module (single source of truth). Imported by both `glossary.astro` and the export below — no duplication. |
| `src/pages/llms-full.txt.ts` | **Build-time endpoint** (`export const prerender = true`) that emits a static `/llms-full.txt` — the full-text companion to the curated `/llms.txt`. Concatenates the company description, the 14 glossary definitions, all Price Transparency Project posts, and all Insights posts (full markdown bodies, newest-first), pulled live from the content collections so it regenerates on every deploy (self-healing like the sitemap). Last build: **~227 KB, 40 articles**, served `text/plain; charset=utf-8`. |
| `public/llms.txt` | Added a pointer to `llms-full.txt` near the top. |

This was a **zero-visible-change** addition (chosen deliberately over TL;DR/product-intro passes, which would alter existing page appearance). Verified: served 200, correct content-type, links resolve, glossary page still emits its 14-term `DefinedTermSet` after the refactor.

---

## 3. Reference: trust-logo → org mapping (homepage carousel)

Identified by viewing each PNG in `src/assets/images/`. Use these names if the carousel changes.

| Import | File | Org |
|---|---|---|
| `logo453` | logo-453.png | Northwell Health |
| `logo454` | logo-454.png | Prisma Health |
| `logo456` | logo-456.png | Forvis Mazars |
| `logo457` | logo-457.png | IntelliMed |
| `logo458` | logo-458.png | Library of Congress |
| `logo460` | logo-460.png | Cone Health |
| `logo461` | logo-461.png | Huron |
| `logo462` | logo-462.png | Mployer |
| `logo463` | logo-463.png | PurpleLab |
| `logo464` | logo-464.png | Buffalo Medical Group |
| `logo465` | logo-465.png | Eide Bailly |
| `logo466` | logo-466.png | WakeMed |

(`logo-455.png` and `logo-459.png` exist on disk but are not imported/used.)

---

## 4. OPEN ITEMS — pick up here

### 4a. Needs input from the user (blocking 2 small schema enrichments)
1. **Author LinkedIn URLs** for blog authors (at least **Matt Phillips** and **Jacob Little**). → Add `sameAs` to the `BlogPosting.author` `Person` object in `BaseLayout.astro` (it's already typed as `Person`, just missing `sameAs`). Best done via a small `name → {sameAs}` map. Author authority (E-E-A-T) is a real weighting factor. *Optionally* build `/authors/<slug>` bio pages with `Person` schema.
2. **Founding year** (+ founder name[s], optional) → add `foundingDate` and `founders` to `organizationSchema` in `BaseLayout.astro`. **Do not guess these** — they were deliberately omitted.

### 4b. Content passes (mechanism ready, needs copy)
3. ✅ **DONE (2026-06-18, on `origin/main`).** **FAQ + `FAQPage` schema** on homepage, `pricing`, `rateexplorer`, `datalake`, `research`, and the PTP hub — via the shared `FaqAccordion` + `buildFaqSchema` (visible text and schema share one array, so they can't drift). See §2b.
4. ✅ **DONE (2026-06-18, on `origin/main`).** **Glossary** at `/glossary` with `DefinedTermSet`/`DefinedTerm` schema, 14 terms. See §2b. **`llms-full.txt`** full-text export also shipped (see §2b).
5. **TL;DR standardization** — add a 3–5 bullet answer-first summary to the top of each post (the CMS/TiC post already has one as the pattern: `src/content/tp-blog/cms-proposes-major-updates-to-transparency-in-coverage-rules.md`). **Still open** — highest-impact remaining content pass.
6. **Plain-text product intros** — homepage + product pages lead with visual components (`HeroMap`, etc.) that LLMs can't read. Add a short plain-text "what Payerset does" paragraph. **Still open.**

> **Next-highest-impact ideas (newer, beyond original plan):** ~~`llms-full.txt`~~ ✅ **done 2026-06-18** (see §2b); a citable "by the numbers" stats page (LLMs quote named statistics — leverage the scorecard/field-guide data); query-targeted answer pages. Off-site corroboration (§4c) remains the single biggest real-world citation driver.

### 4c. Off-site (separate owner — marketing)
See [`llm-geo-offsite-checklist.md`](./llm-geo-offsite-checklist.md): Wikidata entry, profile consistency (LinkedIn/Crunchbase/G2/Capterra), third-party citations/PR, and a monthly monitoring prompt set. This is the biggest real-world driver of citations and is NOT code work.

---

## 5. How the `extraSchema` mechanism works (for adding any future schema)

`BaseLayout.astro` accepts an optional `extraSchema` array; each object is emitted as its own JSON-LD `<script>`. `PageLayout` passes it through. To add schema to **any** page:

```astro
---
import PageLayout from '../layouts/PageLayout.astro';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a machine-readable file (MRF)?',
      acceptedAnswer: { '@type': 'Answer', text: 'A standardized file payers/hospitals publish that lists negotiated rates...' } },
  ],
};
---
<PageLayout title="..." description="..." extraSchema={[faqSchema]}>
  <!-- the SAME Q&A must also appear as visible content on the page -->
</PageLayout>
```

Reference the Organization by `@id` instead of redefining it: `{ provider: { '@id': 'https://www.payerset.com/#organization' } }`.

---

## 6. How to verify after any schema change

```bash
npm run build    # must succeed

# Validate every emitted JSON-LD block parses as JSON:
cd dist && node -e '
const fs=require("fs");
const files=["index.html","rateexplorer/index.html","datalake/index.html","snowflakemarketplace/index.html"];
let total=0,bad=0;
for(const f of files){
  const html=fs.readFileSync(f,"utf8");
  const blocks=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for(const b of blocks){total++;try{JSON.parse(b[1])}catch(e){bad++;console.log("INVALID",f,e.message)}}
  console.log(f, blocks.map(b=>{try{return JSON.parse(b[1])["@type"]}catch{return"ERR"}}).join(", "));
}
console.log("blocks:",total,"invalid:",bad);'
```

Last verified run (2026-06-18): **19 blocks, 0 invalid.** Homepage = Organization + WebSite + FAQPage; rateexplorer = Organization + SoftwareApplication + FAQPage; datalake = Organization + Dataset + FAQPage; pricing/research/PTP hub = Organization + FAQPage; glossary = Organization + DefinedTermSet; blog posts = Organization + BlogPosting + BreadcrumbList. (Add the FAQ pages + `glossary/index.html` to the `files` array in the script above.)

External validators (post-deploy): [Google Rich Results Test](https://search.google.com/test/rich-results), [Schema.org validator](https://validator.schema.org). Confirm `https://www.payerset.com/llms.txt` and `/robots.txt` render as plain text.

---

## 7. Project conventions / gotchas
- **Blog frontmatter:** never add schema fields that don't exist in the collection definition (`src/content.config.ts`). Two collections feed posts: `blog` → `/post/<slug>` (35 legacy posts), `tp-blog` → `/pricetransparencyproject/blog/<slug>` (Price Transparency Project, the active hub).
- **Redirects:** `public/_redirects` (Netlify) maps old Wix/`/transparencyproject/` URLs → current paths. Don't break these.
- **Don't commit `dist/`** (gitignored). Commit only `src/`, `public/`, `docs/` changes — and only when the user asks.
- The code + the two planning docs are already **committed & pushed** in `9f52803` on `origin/main`. The §4 open items are new work. (This handoff doc itself may be uncommitted until added separately.)
