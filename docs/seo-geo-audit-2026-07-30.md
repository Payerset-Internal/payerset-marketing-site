# Payerset SEO + GEO Audit — payerset.com

**Audited:** 2026-07-30 · **Target:** production (`https://payerset.com`) · **Stack:** Astro 5 + Tailwind v4 on Netlify
**Auditor note:** findings below are from live production responses, the production sitemap/robots/llms files, Lighthouse runs, and the repo at commit `3bcfb0c`. Every claim is backed by a measurement in [Appendix A](#appendix-a--raw-measurements).

---

## 1. Executive summary

The site is in **better shape than most B2B healthcare-data sites**. Structured data, `llms.txt`, AI-crawler policy, heading hygiene, and alt text are all already done — a prior GEO initiative (`docs/llm-geo-*.md`) covered real ground and it shows. Lighthouse SEO scores **100/100**.

Two things are holding it back, and they are both concentrated, fixable, and not content problems:

| # | Issue | Severity | Effort |
|---|---|---|---|
| **1** | **Host mismatch.** Site serves on apex `payerset.com`, but every canonical tag, `og:url`, all 71 sitemap URLs, and all 18 `llms.txt` links point to `www.` — which 301-redirects back to apex. | 🔴 **P0** | ~1 line |
| **2** | **Image payload.** 20.7 MB of unoptimized PNG/JPG in `public/images`, including a **1.5 MB PNG rendered on the homepage** via a raw `<img>` with no dimensions or lazy-loading. | 🔴 **P0** | ~2 hrs |

Then the GEO gap, which is strategic rather than technical:

> **Payerset ranks on page 1 for its core queries but is not being *extracted* into AI answers — and where it *is* mentioned, the citation goes to somebody else's domain.**

In a head-to-head vendor comparison query, an AI answer described Payerset accurately and favorably ("*if claims data alongside rates matters, look at Payerset*") while citing **zero payerset.com URLs**. All nine sources were Turquoise Health's own domain plus third-party media. In a "price transparency data vendor" query, the generated answer's "Key Vendors" section named **Milliman, PayerPrice, and Gigasheet — not Payerset** — despite payerset.com ranking #8 on the same page.

That is the whole GEO problem in one sentence: **third parties currently control Payerset's narrative in AI answers.** Section 5 addresses it.

### Scorecard

| Dimension | Grade | Note |
|---|---|---|
| Crawlability / indexation | **C** | Everything resolves, but canonical/sitemap host is wrong across the board |
| Structured data | **A−** | Broad, valid, no drift. Gaps: solutions pages, `Person.sameAs`, `foundingDate` |
| On-page / content | **B+** | Clean H1s, real static text, 800–1,600 words/page. Weak PTP hub H1 |
| Performance | **C−** | Desktop fine; mobile FCP 3.4 s, Speed Index 4.9 s, 2.9 MB page |
| Accessibility | **B+** | 92/100; 3 contrast failures + 1 unlabeled `<select>` |
| AI crawler access | **A** | Explicit `Allow` for all major AI agents |
| `llms.txt` / AI-readable | **B−** | Excellent that it exists; every link 301s, and the money pages are missing |
| AI answer presence | **C** | Ranks well, gets paraphrased, doesn't get cited |

---

## 2. Method, and what I could not measure

**What this audit is based on:** live HTTP responses and headers, rendered HTML from production, `robots.txt` / `sitemap-index.xml` / `sitemap-0.xml` / `llms.txt` / `llms-full.txt`, two Lighthouse runs (mobile + desktop presets), static analysis of the repo, and live search queries against buyer-intent terms.

**Explicit limitations — read these before acting on anything ranked by "priority":**

- **No Search Console, Bing Webmaster, or analytics data.** I have no impressions, clicks, CTR, average position, query-level data, or Core Web Vitals field data. Everything about "what you rank for" in this report comes from live search results, which is a snapshot, not a trend.
- **No backlink data.** No referring-domain count, no authority metric, no competitor gap. This matters because §5 concludes off-site citation is the main GEO lever — and I currently can't size that gap.
- **Lighthouse LCP failed to register (`NO_LCP`) on both runs.** So the reported performance score of 0 is **not trustworthy and should be ignored.** FCP, Speed Index, CLS, and byte weight *are* valid and are what I've cited. Treat performance conclusions as directional until you have field data.
- **I cannot observe how ChatGPT, Perplexity, Claude, or Google AI Overviews actually answer a prompt today.** What I did was test whether the underlying retrieval surfaces Payerset, and whether the site is structurally extractable. That's a strong proxy, not the real thing.

§6 covers how to close each of these gaps.

---

## 3. Technical SEO findings

### 🔴 P0-1 — Host/canonical mismatch across the entire site

`astro.config.mjs:11` sets `site: 'https://www.payerset.com'`. Netlify serves the site on the **apex** domain and 301-redirects `www.` → apex. Result:

```
https://payerset.com/pricing/     → 200   ← the page users and crawlers actually get
  <link rel="canonical" href="https://www.payerset.com/pricing/">   ← points at a 301
  <meta property="og:url" content="https://www.payerset.com/pricing/">  ← points at a 301
```

Concretely, right now:

- **All 71 URLs in `sitemap-0.xml` are `www.` URLs that return 301.** A sitemap of 100% redirects is the classic "Page with redirect" mass-exclusion pattern in Search Console.
- **All 18 links in `llms.txt` return 301.** This is the most damaging instance. `llms.txt` exists specifically so AI crawlers can find your best pages — and every single link makes them take an extra hop. Some retrieval pipelines don't follow redirects on discovery.
- `robots.txt` declares `Sitemap: https://www.payerset.com/sitemap-index.xml` — also a 301.
- `og:url` pointing at a redirect degrades social/AI unfurling.
- JSON-LD `Organization.@id`, `url`, and `logo` all use `www.` — so your entity identifier doesn't match your live host.

Google normally resolves this by following the redirect, so this is **not** an emergency that's de-indexing you. But you are sending a contradictory signal on every page of the site — the redirect says "apex is canonical," the canonical tag says "www is canonical" — and you're paying a redirect hop on every crawl of every URL, including the AI-crawler entry point.

**Fix:** one line. Change `site` to `'https://payerset.com'` in `astro.config.mjs` and update the hardcoded `www.` strings in `BaseLayout.astro` (Organization `@id`/`url`/`logo`, publisher logo) and `public/llms.txt`. Rebuild regenerates the sitemap automatically.

**Decide first:** apex or www? Apex is what Netlify currently serves, so matching apex is the smaller, safer change. If you'd rather standardize on `www.` (marginally better for cookie isolation and CDN flexibility), flip the Netlify domain setting instead and leave the code alone. **Either is fine — they just have to agree.** Don't do both halves in opposite directions.

### 🔴 P0-2 — Unoptimized images, and a 1.5 MB PNG on the homepage

`src/components/InsightsCarousel.astro:36` renders blog thumbnails with a **raw `<img src={post.data.image}>`** — no `width`, no `height`, no `loading`, and no `astro:assets` optimization. Because those images live in `public/images/` rather than `src/assets/`, they bypass Astro's image pipeline entirely and are served at full size.

The homepage therefore downloads `transparency-in-coverage-schema-2-0/hero.png` at **1,561 KiB** as a carousel thumbnail.

Site-wide in `public/images`:

| Format | Files | Total |
|---|---|---|
| `.png` | 32 | **15.4 MB** |
| `.jpg` | 19 | **4.8 MB** |
| `.webp` | 3 | 0.12 MB |

**11 files exceed 500 KB**, topped by a 2.65 MB PNG (`cfo-blueprint-.../hero.png`) and a 1.92 MB PNG (`transparencyproject/rate-review-2026-cover.png`).

Total homepage weight is **2,912 KiB**, mobile FCP is **3.4 s**, Speed Index **4.9 s**. Note the homepage already uses `astro:assets` correctly for its logo carousel (those go through `/.netlify/images`) — so the machinery is there; the carousel and blog heroes just aren't using it.

**Fix, in order:**
1. Add `width`, `height`, and `loading="lazy"` + `decoding="async"` to the `InsightsCarousel` `<img>`. Stops layout shift and defers the download. *(minutes)*
2. Route these through the Netlify Image CDN (`/.netlify/images?url=…&w=…`) or move them into `src/assets/` and use `<Image>`. *(~1 hr)*
3. Batch-convert the 11 files >500 KB to WebP at sensible dimensions. Expect an 80–90% reduction. *(~1 hr)*

### 🟡 P1-3 — Two-hop redirect chains

Every legacy redirect target in `public/_redirects` omits its trailing slash, but the site enforces trailing slashes — so each one costs two hops:

```
/rateexplorer  → 301 → /platform/rate-explorer  → 301 → /platform/rate-explorer/
/transparencyproject → 301 → /pricetransparencyproject → 301 → /pricetransparencyproject/
```

And from `www.`, it's three: `www.payerset.com/pricing` → `payerset.com/pricing` → `payerset.com/pricing/`.

**Fix:** append trailing slashes to redirect *targets* in `public/_redirects`. Chains dilute link equity slightly and waste crawl budget; low severity, near-zero effort.

### 🟢 Verified healthy

I checked these and they're **fine** — don't spend time here:

- ✅ 404s return a real 404 (`/nonexistent-page-xyz` → 404).
- ✅ All legacy `/post/*` → `/pricetransparencyproject/blog/*` redirects **fire correctly** with correct canonicals. Google currently shows *both* URLs for the "practical look at benchmarking" article — that's a **stale index entry, not a bug.** It will resolve on recrawl; you can accelerate it with a Search Console inspection request.
- ✅ `robots.txt` explicitly `Allow`s GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, Applebot-Extended, CCBot. This is genuinely well done and ahead of most peers.
- ✅ Exactly one `<h1>` per page across all 9 pages tested.
- ✅ Content is in static HTML, not JS-rendered — 800–1,600 words per page, fully extractable.
- ✅ Zero missing or empty `alt` attributes on the pages tested.
- ✅ CLS is 0.000 (mobile) / 0.001 (desktop).
- ✅ Lighthouse SEO 100/100. Structured data: 19 JSON-LD blocks, 0 invalid, and the `SoftwareApplication`/`Dataset`/`FAQPage` schema survived the `/platform/*` IA move intact.
- ✅ `llms.txt` **and** `llms-full.txt` (241 KB, 40 articles) both serve 200 as `text/plain`. Very few competitors have this.

### 🟡 P1-4 — Accessibility + tag bloat

**Accessibility (92/100):** 3 color-contrast failures on the homepage — a `.px-6 py-3` primary CTA, the mobile "insights" link, and a `text-slate-500` paragraph. Worth re-checking against the recent brand-blue CTA change (`07e2b7f`). Also one `<select name="role">` with no associated `<label>`.

**Tag bloat:** `BaseLayout.astro` loads **four** analytics/tag systems — GA4 (`G-FMZN9NHQ61`), GTM (`GTM-NR5QDW4`), HubSpot, and Fathom — plus a Google Ads tag (`AW-11457997785`) firing through GTM. That's **531 KiB of Google tag JavaScript alone**, and GTM is very likely double-loading GA4. Google Fonts is also a render-blocking `<link>` in `<head>`.

**Fix:** consolidate GA4 under GTM (or drop GTM), decide whether you need both Fathom *and* GA4, and self-host or `preload` the two font files. Best-practices score is 61/100, dragged down by 16 third-party cookies.

---

## 4. On-page / content SEO findings

Titles and descriptions are **strong across the board** — keyword-bearing without being spammy, and unique per page. The solutions pages in particular are well-written.

Two fixable items:

### 🟡 P1-5 — The Price Transparency Project hub has a tagline as its H1

```
/pricetransparencyproject/  →  <h1>Practical tips and lessons for healthcare finance
                                   leaders and analysts leveraging price transparency data.</h1>
```

The H1 on your best-performing editorial asset never says **"The Price Transparency Project."** H1 is a primary entity-identification signal for both crawlers and LLMs. The `<title>` is correct; the H1 isn't.

**Fix:** make the H1 the entity name, demote the current sentence to a `<p>` subhead.

### 🟡 P1-6 — Solutions pages have no schema and are missing from `llms.txt`

`/solutions/providers`, `/solutions/employers`, `/solutions/medical-device` are your three persona/conversion pages. They have:

- ❌ no `extraSchema` at all — no `Service`, no `FAQPage`, no `BreadcrumbList`
- ❌ no entry in `llms.txt`

Every other significant page type got schema in the prior initiative. These three were added later (the `feature/platform-solutions-ia` branch) and never picked it up.

---

## 5. GEO (Generative Engine Optimization) findings

### The core problem, stated precisely

Payerset **ranks** for its target queries. It does **not get cited** in the answers built on top of those rankings.

Evidence from live retrieval:

**Query: "how to analyze hospital price transparency data for reimbursement benchmarking"** — this is Payerset's strongest showing. Four payerset.com URLs in the top 9 (Part 1 at #2, the analysis hub at #4, Part 2 at #6, PTP home at #8). The generated answer drew substantively on that content. **This is what winning looks like** — and it's the direct payoff of the PTP editorial hub.

**Query: "healthcare price transparency data vendor negotiated rates benchmarking"** — payerset.com ranks **#8**. The generated answer's "Key Vendors & Solutions" section named **Milliman, PayerPrice, and Gigasheet.** Payerset was omitted despite being on the same results page.

**Query: "Turquoise Health vs Serif Health vs Payerset comparison"** — the answer described Payerset *by name and favorably*. Sources cited: **9 URLs, 0 from payerset.com.** Turquoise's own domain supplied most of them; the Payerset characterization traced to a third-party listicle ("The 6 Best Price Transparency Tools for 2026," medigy.com).

### Why this is happening

The pattern is consistent and diagnosable:

1. **Category-defining prose is missing where it matters.** Your pages are *benefit-led* ("Healthcare Price Transparency Solutions to Grow Margins," "Understand every contracted rate in your market"). Competitors that got extracted are *category-led* — they state plainly "X is a price transparency platform that does A, B, C for personas D." LLMs extract the latter. Your `llms.txt` and `Organization` schema both have excellent category-led descriptions; **your visible pages don't.**

2. **Every `llms.txt` link 301s** (see P0-1). Your best AI-discovery asset makes crawlers take an extra hop on all 18 links, and omits the solutions pages, the scorecard, and the field guide entirely.

3. **No comparison or alternatives content exists.** "X vs Y" and "best tools for Z" are among the highest-intent LLM prompts in B2B. You have zero pages targeting them, so third parties answer on your behalf — and they cite themselves.

4. **Your most citable asset isn't packaged to be cited.** The Payer Compliance Scorecard grades **180+ payers on three dimensions** — that is exactly the kind of named, quantified, attributable claim LLMs quote. It is not in `llms.txt`, has no `Dataset` schema, and has no stable "here is the headline number" statement to lift.

5. **Two open items from your own prior plan are the highest-leverage remaining content work** — and they're still open: answer-first TL;DRs on posts, and plain-text product intros on pages that currently lead with visual components LLMs can't read.

6. **Author authority is unset.** `BlogPosting.author` is typed as `Person` but has no `sameAs`. `Organization` has no `foundingDate` or `founders`. Both were deliberately left for you to supply — they're still blank.

### GEO items already done well

Credit where due — these are real advantages over competitors and should not be redone: explicit AI-crawler allowlist; `llms.txt` **and** a 241 KB `llms-full.txt`; `FAQPage` schema on 6 pages with visible-text/schema parity enforced in code (`src/utils/faq.ts`) so they can't drift; a 14-term glossary with `DefinedTermSet`; `BreadcrumbList` on both post types; `knowsAbout` topic array on `Organization`.

---

## 6. Action plan

Sequenced by impact ÷ effort. Phase 1 is a single afternoon and clears both P0s.

### Phase 1 — Foundation (½ day, do this first)

| # | Action | File(s) | Effort |
|---|---|---|---|
| 1.1 | **Pick apex or www, then make everything agree.** Set `site` accordingly; update hardcoded `www.` in Organization `@id`/`url`/`logo` + publisher logo; update all 18 `llms.txt` URLs; update `robots.txt` sitemap line. Rebuild + verify sitemap emits the right host. | `astro.config.mjs:11`, `src/layouts/BaseLayout.astro:38-41,90-95`, `public/llms.txt`, `public/robots.txt` | 30 min |
| 1.2 | Add `width`/`height`/`loading="lazy"`/`decoding="async"` to the carousel `<img>`. | `src/components/InsightsCarousel.astro:36` | 15 min |
| 1.3 | Convert the 11 images >500 KB to WebP at display dimensions; re-point references. | `public/images/**` | 1–2 hr |
| 1.4 | Add trailing slashes to all redirect targets. | `public/_redirects` | 10 min |
| 1.5 | Fix 3 contrast failures + label the `role` `<select>`. | `src/pages/index.astro`, contact form | 30 min |

**Verify Phase 1:** rebuild, confirm `sitemap-0.xml` URLs return 200 (not 301), confirm every `llms.txt` link returns 200, re-run Lighthouse and check FCP/Speed Index/byte weight moved. Then submit the sitemap in Search Console.

### Phase 2 — Close the known GEO gaps (1–2 days)

| # | Action | Where | Why |
|---|---|---|---|
| 2.1 | Add the 3 solutions pages + scorecard + field guide + PTP topic hubs to `llms.txt`. | `public/llms.txt` | Money pages are invisible to AI discovery |
| 2.2 | Add `Service` + `FAQPage` + `BreadcrumbList` schema to the 3 solutions pages via the existing `extraSchema` mechanism. | `src/pages/solutions/*.astro` | Only page type with no schema |
| 2.3 | Fix the PTP hub H1 to name the entity. | `src/pages/pricetransparencyproject/index.astro` | Entity signal on best asset |
| 2.4 | **Answer-first TL;DRs** — 3–5 bullets at the top of each post. Pattern already exists in `cms-proposes-major-updates-to-transparency-in-coverage-rules.md`. | `src/content/tp-blog/*`, `src/content/blog/*` | Highest-leverage open item from prior plan |
| 2.5 | **Plain-text product intros** — one category-led paragraph on homepage + `/platform/*`, above or beside the visual components. Reuse the `llms.txt` phrasing, which is already right. | `src/pages/index.astro`, `src/pages/platform/*.astro` | Directly addresses the extraction failure in §5 |
| 2.6 | Add `Person.sameAs` (author LinkedIn URLs) and `Organization.foundingDate` + `founders`. **Needs your input — don't guess.** | `src/layouts/BaseLayout.astro` | E-E-A-T; blocked since June |

### Phase 3 — Compete for the answer (1–2 weeks, content work)

| # | Action | Why |
|---|---|---|
| 3.1 | **Build comparison/alternatives pages.** At minimum an honest "how to evaluate price transparency data vendors" page with a real criteria matrix. This is the single biggest uncovered high-intent surface, and right now medigy.com owns it. | Third parties are writing your comparison narrative |
| 3.2 | **Package the scorecard as a citable dataset.** Add `Dataset` schema, a stable headline stat ("Payerset grades 180+ payers across 3 MRF dimensions; N% fail X"), a methodology section, and a canonical citation line. Add to `llms.txt`. | LLMs quote named, attributable statistics |
| 3.3 | **Build a "by the numbers" stats page** — payers covered, codes, providers, refresh cadence, historical depth. One page of quantified, quotable facts. | Already flagged in your own plan as a next-highest-impact idea |
| 3.4 | **Query-targeted answer pages** for definitional/procedural queries you don't yet own (e.g. "what is an allowed amount vs negotiated rate," "how often do payers update MRFs"). The glossary is a strong base to expand from. | Where you already win, you win via PTP-style explainers |
| 3.5 | **Off-site corroboration** — this is the real citation driver and it is *not* code work. `docs/llm-geo-offsite-checklist.md` already scopes it: Wikidata entry, profile consistency (LinkedIn/Crunchbase/G2/Capterra), third-party citations/PR. Getting into the listicles that LLMs cite is the fastest path. | Turquoise wins comparison queries on third-party press, not on-site SEO |

---

## 7. What's next: the data you should go get

Everything above is what I could determine without access to your measurement stack. These are the gaps, in priority order, and how to close each.

### 7.1 Google Search Console — highest priority, free, you already own it

The `google-site-verification` meta tag is in `BaseLayout.astro:146`, so a property exists.

**Get:** Performance report (16 months, queries + pages + CTR + position), Page Indexing report, Core Web Vitals field data, sitemap status.

**How:** Search Console → Performance → Export → CSV. Also export Page Indexing → "Why pages aren't indexed." Drop both in `docs/data/` and I'll fold them in.

**Why it matters here:** it's the only way to (a) confirm whether the www/apex mismatch is actually causing "Page with redirect" exclusions, (b) find pages ranking 5–20 where small changes pay off fastest, (c) get *field* Core Web Vitals instead of my lab numbers with the broken LCP, and (d) confirm the stale `/post/` duplicate is resolving.

⚠️ **Check both properties.** If you only have a `www.payerset.com` property and the site serves on apex, you may be looking at a mostly-empty dataset. Verify a **Domain property** (covers both hosts + all subdomains) if you haven't.

### 7.2 Bing Webmaster Tools — free, and disproportionately important for GEO

**Why:** ChatGPT search and Copilot are Bing-grounded. Bing indexation is a direct input to whether ChatGPT can retrieve you — and it's the cheapest GEO lever there is. Most teams skip it.

**How:** bingwebmastertools.com → add site → import from Search Console (one click). Then check Bing's index coverage against your 71 sitemap URLs. If Bing's count is materially lower, that's a GEO problem you can't see any other way.

### 7.3 Backlink data — the gap I most need filled

I have **zero** visibility here, and §5 concludes off-site citation is the primary GEO driver. This is the largest unknown in the audit.

**How, cheapest first:**
- **Free:** Ahrefs Webmaster Tools (free for verified sites) or Semrush's free tier — enough for referring-domain count and top linking pages.
- **Paid, if you'll act on it:** one month of Ahrefs or Semrush (~$100–130) to run a *link gap* analysis against turquoise.health, serifhealth.com, rivethealth.com, trillianthealth.com. That tells you exactly which publications link to competitors and not you — which is the target list for 3.5.

**Ask for:** referring domains, domain rating, top 50 linking pages, and the competitor link gap export.

### 7.4 AI answer monitoring — measure the thing §5 is about

Right now nobody knows how often Payerset appears in AI answers, so nobody can tell whether Phase 2–3 worked.

**Cheap version (free, do this first):** build a fixed prompt set of ~20 buyer questions — "best price transparency data vendors," "how do I benchmark negotiated rates," "Turquoise Health alternatives," "where do I get TiC MRF data" — and run it monthly against ChatGPT, Perplexity, Claude, and Google AI Overviews. Log: were you mentioned, were you *cited*, which URL, who else appeared. A spreadsheet is genuinely sufficient. `docs/llm-geo-offsite-checklist.md` already calls for a monthly prompt set — this is that, made concrete.

**Paid version:** Profound, Peec AI, or Semrush AI Toolkit (~$100–500/mo) automate exactly this. Worth it only *after* Phase 1–2 ship, so you're measuring something that can move.

**Do this before Phase 2 lands** so you have a baseline.

### 7.5 Server logs / crawler analytics — verify AI bots actually arrive

Your `robots.txt` invites nine AI crawlers. Nobody has confirmed any of them show up.

**How:** Netlify doesn't expose raw logs on all plans. Either enable Netlify Log Drains, or add a lightweight edge function that records user-agent + path for known bot UAs. Then answer: which AI crawlers hit the site, how often, which paths, and **do they fetch `/llms.txt`?** That last one is the only real way to know whether the `llms.txt` investment is doing anything.

### 7.6 Field performance data

My Lighthouse LCP failed twice (`NO_LCP`), so lab performance numbers are incomplete.

**How:** GSC Core Web Vitals report (real users), plus [PageSpeed Insights](https://pagespeed.web.dev/) on `payerset.com` for CrUX field data. Free, instant. Re-check after Phase 1.3 to quantify the image win.

### 7.7 One thing only you can answer

Phase 2.6 has been blocked since June on two facts I won't guess:

1. **Author LinkedIn URLs** for blog authors (at minimum Matt Phillips and Jacob Little).
2. **Founding year**, and founder name(s) if you want them in schema.

---

## 8. Recommended sequence

```
Week 1   Phase 1 (½ day)  ─── then ─── export GSC + verify Bing + set up free backlink tool
                                       + record the AI-answer baseline (7.4 cheap version)
Week 2   Phase 2, items 2.1–2.5 ── 2.6 unblocks when you supply the two facts (7.7)
Week 3+  Phase 3 content work, prioritized by whatever GSC actually shows
Monthly  Re-run the AI prompt set; watch GSC indexation + CWV
```

**Do Phase 1 before pulling data**, so the GSC export you analyze reflects a site with consistent canonicals. **Do record the AI baseline before Phase 2**, or you won't be able to prove the content work moved anything.

---

## Appendix A — raw measurements

**Host / canonicalization**
```
https://payerset.com/              200
https://www.payerset.com/          301 → https://payerset.com/
http://payerset.com/               301 → https://payerset.com/
https://payerset.com/pricing       301 → https://payerset.com/pricing/
https://payerset.com/pricing/      200
/nonexistent-page-xyz              404   ✅
```
Canonical served on apex for `/`, `/pricing`, `/platform/rate-explorer`, `/solutions/providers`, `/glossary`, `/pricetransparencyproject`: **all point to `https://www.payerset.com/…/`** (a 301).

**Sitemap:** `sitemap-index.xml` → `sitemap-0.xml`, **71 URLs, all `www.` (all 301).**

**`llms.txt`:** 4,156 bytes, `text/plain`, 200. **18 `www.` links, all 301.** Missing: `/solutions/*` (×3), `/pricetransparencyproject/scorecard`, `/pricetransparencyproject/analysis|employer|equity|playbook|policy`, `/pricetransparencyproject/blog/same-surgery-different-price`, `/insights/categories/*` (×4).
**`llms-full.txt`:** 246,766 bytes, `text/plain`, 200. ✅

**Redirect chains:** `/rateexplorer` → `/platform/rate-explorer` → `/platform/rate-explorer/` (2 hops). `www.payerset.com/pricing` → 3 hops.

**Lighthouse — mobile** (`payerset.com/`, lighthouse@12): SEO **100**, Accessibility **92**, Best Practices **61**, Performance **unreliable (NO_LCP)**. FCP **3.4 s**, Speed Index **4.9 s**, CLS **0**, total **2,912 KiB**, DOM 1,052 elements, main-thread 3.0 s, Max Potential FID 380 ms.
**Lighthouse — desktop:** FCP **0.7 s**, Speed Index **0.8 s**, CLS **0.001**, LCP `NO_LCP`.

**Largest homepage resources**
```
1561 KiB  /images/blog/transparency-in-coverage-schema-2-0/hero.png
 192 KiB  /images/blog/putting-price-transparency-data-to-work.../hero
 186 KiB  googletagmanager.com/gtag/js?id=G-FMZN9NHQ61
 186 KiB  googletagmanager.com/gtag/js?id=AW-11457997785
 159 KiB  googletagmanager.com/gtm.js?id=GTM-NR5QDW4
  47 KiB  fonts.gstatic.com/…/inter…woff2
```

**`public/images` totals:** 32 PNG = 15,736 KB · 19 JPG = 4,869 KB · 3 WebP = 125 KB. **11 files > 500 KB**, max 2,653 KB.

**Headings / text volume (live)** — one `<h1>` on every page tested:
```
/                                    h1=1  1488 words
/pricing/                            h1=1   980
/platform/rate-explorer/             h1=1   900
/solutions/providers/                h1=1   801
/solutions/employers/                h1=1  1037
/solutions/medical-device/           h1=1   953
/glossary/                           h1=1   948
/pricetransparencyproject/           h1=1  1036   ← H1 is a tagline, not the entity name
/pricetransparencyproject/scorecard/ h1=1  1568
```

**Images (rendered):** homepage 32 `<img>`, 0 missing `alt`, 0 empty `alt`, 4 missing width/height, 3 lazy. `/solutions/providers/` 2 `<img>`, all with `alt` + dimensions.

**Schema coverage:** `index`, `platform/rate-explorer` (+`SoftwareApplication`), `platform/data-lake` (+`Dataset`), `pricing`, `research`, `pricetransparencyproject` → `FAQPage`; `glossary` → `DefinedTermSet`; `snowflakemarketplace` → `Dataset`; posts → `BlogPosting` + `BreadcrumbList`. **`solutions/*` → none.**

**Accessibility failures:** contrast on (1) `.px-6 py-3` primary CTA → `/get-started`, (2) mobile `/insights` link, (3) `p.text-sm.text-slate-500`; plus `<select name="role">` with no label.

**Search visibility snapshot (2026-07-30)**

| Query | Payerset result | AI answer cited Payerset? |
|---|---|---|
| how to analyze hospital price transparency data for reimbursement benchmarking | **#2, #4, #6, #8** | ✅ Yes, substantively |
| healthcare price transparency data vendor negotiated rates benchmarking | #8 | ❌ No — named Milliman, PayerPrice, Gigasheet |
| Turquoise Health vs Serif Health vs Payerset comparison | none in top 9 | ⚠️ Described favorably, **0 payerset.com sources** |

Competitors recurring across queries: Turquoise Health, Serif Health, Rivet Health, Trilliant Health, Gigasheet, PayerPrice, Milliman, HiLabs.

---

## Appendix C — Phase 1 execution record (2026-07-30)

**Status: complete, built clean, verified locally. Not yet deployed.** Decision taken: **apex (`https://payerset.com`) is canonical**, standardized in code because Netlify access wasn't available.

### 1.1 Host standardization ✅
Scope was larger than §6 estimated — **11 source files**, not 3. Introduced [`src/consts.ts`](../src/consts.ts) exporting `SITE_URL` + `ORG_ID` as the single source of truth, so this class of drift can't recur.

Changed: `astro.config.mjs` (`site`), `BaseLayout.astro` (Organization `@id`/`url`/`logo`/`contactPoint`, WebSite `url`, publisher logo), `platform/rate-explorer.astro`, `platform/data-lake.astro`, `glossary.astro`, `snowflakemarketplace.astro`, `post/[...slug].astro` (BreadcrumbList ×4 + LinkedIn/X share URLs), `pricetransparencyproject/blog/[slug].astro` (BreadcrumbList ×3 + share URLs), `llms-full.txt.ts`, `public/llms.txt` (18 links), `public/robots.txt`.

Verified in `dist/`: sitemap **70/70 apex**, all canonicals apex, `robots.txt` sitemap line apex, `llms.txt` **18 apex / 0 www**, JSON-LD **25 blocks / 0 invalid / 0 www**.

> ⚠️ **This fixed only half the problem — see §1.1b.** P0-1 had two independent causes of redirects (wrong host *and* missing trailing slash). The first deploy fixed the host; post-deploy verification showed 17 of 18 `llms.txt` links were still 301s.

### 1.1b Trailing slashes on emitted absolute URLs ✅ (follow-up, commit `f1d97ea`)

Production verification after the first deploy revealed the second cause. The site enforces trailing slashes (`/pricing` → 301 → `/pricing/`), so every absolute URL emitted without one still redirected — even on the correct host:

| Surface | Before `f1d97ea` |
|---|---|
| `llms.txt` links | 17 of 18 → 301 |
| `llms-full.txt` article URLs | ~40 → 301 |
| JSON-LD `url` / `item` values | 8 of 51 missing slash after audit; all breadcrumbs, Dataset/SoftwareApplication urls, DefinedTerm anchors affected |
| LinkedIn / X share URLs | all 4 → 301 |

Added `pageUrl()` to [`src/consts.ts`](../src/consts.ts) — always returns a trailing-slashed absolute URL — and routed every page-URL construction through it. `SITE_URL` is still used directly where a trailing slash would be *wrong*: `ORG_ID`'s fragment, `og-default.png`, and `llms.txt`'s own path.

Verified in `dist/`: **25 JSON-LD blocks, 0 invalid, 51 `url`/`item` values, 0 missing a trailing slash**; `llms.txt` and `llms-full.txt` both clean.

**Lesson for future passes:** "canonical URL is wrong" can have more than one cause stacked on it. Check host *and* path form, and verify against production after deploy rather than trusting the build output — the build can't tell you what the CDN does with a path.

**Deliberately left as `www`** — 2 instances of legal body copy (`terms-of-use.astro:116`, `datadestructionpolicy.astro:41`). These are visible URL labels inside legal documents whose actual `href`s are already relative. No SEO signal, and silently editing legal text isn't appropriate. **Your call whether to update them.**

Also untouched: `scripts/*` (`scrape-blog-links.mjs`, `insert-blog-links.mjs`, `scrape-blog-images.mjs`, `blog-links-manifest.json`) — one-off Wix migration tooling, not part of the build.

### 1.2 + 1.3 Images ✅
`InsightsCarousel.astro` now emits `width="640" height="360" loading="lazy" decoding="async"`.

Converted **9 referenced** files >500 KB to WebP at ≤1600px:

| Before | After | Δ | File |
|---|---|---|---|
| 2653 KB | 90 KB | −97% | cfo-blueprint/hero |
| 1560 KB | 37 KB | −98% | transparency-in-coverage-schema-2-0/hero ← *was on the homepage* |
| 1380 KB | 81 KB | −94% | unlocking-historical-data/hero |
| 1029 KB | 39 KB | −96% | payerset-and-snowflake/hero |
| 769 KB | 44 KB | −94% | why-complete-transparency/hero |
| 728 KB | 148 KB | −80% | and-then-there-was-humana/hero |
| 541 KB | 9 KB | −98% | how-to-analyze.../hero |
| 540 KB | 102 KB | −81% | uncovering-the-future/hero |
| 523 KB | 97 KB | −81% | conference-recap/inline-1 |

Frontmatter refs rewritten in the 9 owning markdown files; originals deleted (recoverable in git). **`public/images`: 20,730 KB → 11,656 KB (−44%).** Homepage carousel image specifically: **1560 KB → 37 KB.**

⚠️ **2 orphaned files left in place** — zero references anywhere in the repo, so converting them would be pointless, but they still deploy:
- `public/images/transparencyproject/rate-review-2026-cover.png` — **1917 KB**, leftover from the 2026 report → field guide rename
- `public/images/blog/blog-visuals/hero-constellation.png` — **541 KB**

Deleting both reclaims **2.4 MB**. Confirm they're unused before removing.

### 1.4 Redirect chains ✅
All 301 targets in `public/_redirects` now carry trailing slashes, eliminating the second hop. `/rateexplorer` → `/platform/rate-explorer/` is now one hop instead of two. The four `/insights/categories/*` rules are `200` rewrites, not redirects — correctly left alone.

### 1.5 Accessibility ✅
Root cause was the brand token, not three one-off elements: `#0092CA` yields only **3.52:1** both as white-on-blue and blue-on-white, and `text-white bg-brand-primary` appears in **6 places** (Lighthouse only flagged the one above the fold).

Token-level fix in `global.css`:
- `--color-brand-primary`: `#0092CA` → **`#007BB0`** (4.71:1 ✅)
- `--color-brand-primary-hover`: `#007bb0` → **`#00658F`** (6.45:1 ✅, stays visibly darker than base)
- Footer copyright: `text-slate-500` → `text-slate-400` (3.59:1 → **6.67:1** ✅)

Measured in-browser after the change: **4.71 / 4.71 / 6.67** — all three pass 4.5:1.

> ⚠️ **This is a visual change to the brand blue sitewide**, and it darkens the CTA colour set in `07e2b7f`. Same hue, slightly deeper. `--color-brand-secondary` (`#00B7FD`) is untouched, so bright-cyan accents in gradients and visualisations are unchanged. Eyeball it before deploying; the alternative is per-element overrides in 6+ files, which leaves the trap in place.

Also fixed: `ContactFormCTA.astro` had 6 labels but only 1 associated. Added `for`/`id` to all six, matching the `gs-` convention already used correctly in `get-started.astro`.

### Not measurable yet
Performance gain can't be quantified until deploy — local dev numbers aren't comparable to the production Lighthouse baseline in Appendix A. Re-run PageSpeed Insights on `payerset.com` after deploy and compare against FCP 3.4 s / SI 4.9 s / 2,912 KiB.

---

## Appendix B — relationship to prior GEO work

This audit **supersedes nothing** in `docs/llm-geo-*.md` — that work is real and I verified it shipped. Reconciliation:

- ✅ Verified live: AI-crawler `robots.txt`, expanded `Organization` schema, `extraSchema` mechanism, `FAQPage` ×6 with drift-proof parity, `DefinedTermSet` glossary, `BreadcrumbList` ×2, `llms.txt`, `llms-full.txt`, logo alt text.
- 📌 Still open from that plan, restated here: TL;DRs (→ 2.4), plain-text product intros (→ 2.5), author `sameAs` + `foundingDate` (→ 2.6), off-site checklist (→ 3.5), stats page (→ 3.3).
- 🆕 New in this audit: **the host/canonical mismatch (P0-1)** — which notably *broke the `llms.txt` links that initiative created*; the image payload (P0-2); redirect chains (P1-3); tag bloat + a11y (P1-4); PTP hub H1 (P1-5); solutions pages missing schema and `llms.txt` (P1-6); and the §5 evidence that ranking without citation is the actual GEO failure mode.
- ⚠️ **Stale reference:** the changelog names `src/pages/rateexplorer.astro` and `datalake.astro`. Those moved to `src/pages/platform/`. Schema survived; the doc paths didn't.
