# Site Expansion Plan — Solutions (by persona) + Platform

**Status:** In progress. Branch `feature/platform-solutions-ia`.
**Last updated:** 2026-07-24

---

## 1. Goal

Restructure the site's information architecture around a clean split that the current site conflates:

- **Platform** — *what we sell.* Rate Explorer, Data Lake, AI Analyst, MCP.
- **Solutions** — *who it's for.* Persona-driven pages: Health Systems, Consultants, Med Device, Employers.

Today the nav labels the product list ("Rate Explorer", "Data Lake") as **Solutions**, and there is no persona content anywhere on the site. This plan separates the two axes so a visitor can enter either by the tool they want or by the problem they have.

---

## 2. Current state (baseline)

### Navigation (`src/components/Header.astro`)
```
Solutions ▾   → Rate Explorer (/rateexplorer), Data Lake (/datalake)   ← actually products
Resources ▾   → News, Payer Scorecard, Data Dictionaries
Pricing
Price Transparency Project
About Us
```

### Existing product pages
- `src/pages/rateexplorer.astro`
- `src/pages/datalake.astro`
- `src/pages/snowflakemarketplace.astro`
- `src/pages/pricing.astro`

### Homepage (`src/pages/index.astro`)
- Hero → logo carousel → insight cards → **"Solutions Overview"** (a capabilities grid at `#solutions`, line ~201, NOT persona-based) → Rate Explorer section → Data Lake section → differentiators → testimonial → CTA → FAQ.

### Reusable building blocks (`src/components/`)
- Layout: `PageLayout.astro`, `BaseLayout.astro`
- Viz: `EmployerCoverageViz`, `ExploreRatesViz`, `DataLakeViz`, `RatesGridViz`, `ClaimsDataViz`, `NetworkViz`, `NpiTinViz`, `AnalysisActionViz`, `HeroMap`, `HeroRateExplorer`, `FeatureShowcase`
- Shared: `Header`, `Footer`, `FaqAccordion`, `ScrollReveal`, `InsightCards`, `InsightsCarousel`
- **`EmployerCoverageViz.astro` already exists** — a head start for the Employers persona page.

Design tokens in use: `brand-primary`, `brand-secondary`, `brand-dark-deep`, `text-primary/secondary/muted`. Tailwind v4. Keep all new pages on these tokens.

---

## 3. Target information architecture

```
Platform ▾
  ├─ Rate Explorer            /platform/rate-explorer   (from /rateexplorer)
  ├─ Data Lake                /platform/data-lake       (from /datalake)
  ├─ AI Analyst               /platform/ai-analyst      (NEW)
  ├─ MCP                      /platform/mcp             (NEW)
  └─ Snowflake Marketplace    /snowflakemarketplace     (keep, cross-link)

Solutions ▾
  ├─ Health Systems           /solutions/health-systems           (NEW)
  ├─ Consultants              /solutions/consultants               (NEW)
  ├─ Med Device               /solutions/med-device                (NEW)
  └─ Employers                /solutions/employers                 (NEW)

Resources ▾   (unchanged)
Pricing        (unchanged)
Price Transparency Project   (unchanged)
About Us       (unchanged)
```

**Decision (resolved 2026-07-25):** dropdown-only nav — **no** `/platform` or `/solutions` index/landing pages.

---

## 4. Page-by-page plan

### 4a. Solutions (persona pages) — the net-new work

Each persona page follows a shared template so they feel like a family:

1. **Hero** — persona-specific headline + subhead, primary CTA (`/get-started`), secondary CTA (relevant product).
2. **Pains** — 3–4 problems this persona has (framed in their language).
3. **How Payerset helps** — map each pain to a capability + the platform product that delivers it (deep-link to `/platform/*`).
4. **Persona-specific viz / proof** — reuse or adapt a viz component.
5. **Proof** — testimonial, logo, or stat relevant to the segment.
6. **FAQ** (`FaqAccordion`) — persona-scoped questions (also feeds FAQ schema / SEO).
7. **CTA bookend** — dark section, consistent with homepage.

| Persona | Route | Angle | Viz starting point |
|---|---|---|---|
| Health Systems | `/solutions/health-systems` | Contract negotiation, rate benchmarking vs. peers, payer leverage | `RatesGridViz`, `NetworkViz`, `HeroMap` |
| Consultants | `/solutions/consultants` | Client benchmarking at scale, advisory deliverables, multi-market rate intel | `RatesGridViz`, `AnalysisActionViz` |
| Med Device | `/solutions/med-device` | Reimbursement intel by procedure/code, market access, site-of-care shift | `ClaimsDataViz`, `AnalysisActionViz` |
| Employers | `/solutions/employers` | Plan cost benchmarking, network/steerage, TPA oversight | **`EmployerCoverageViz` (exists)** |

### 4b. Platform section

- **Move + rename** existing pages into `/platform/*` (see redirects, §5). Content largely carries over.
- **AI Analyst** (`/platform/ai-analyst`) — NEW. Overview page for the AI analyst capability. Treat content as provisional until product firms up the details.
- **MCP** (`/platform/mcp`) — NEW. Page for the Payerset MCP server / programmatic access. Treat content as provisional until product firms up the details.
- Give each platform page a consistent template: hero → what it is → key capabilities → viz/demo → who it's for (cross-link back to relevant Solutions pages) → pricing pointer → CTA. The Solutions↔Platform cross-linking is what makes the two-axis IA pay off.

### 4c. Homepage adjustments
- Rework the `#solutions` capabilities grid (index.astro:201) into either (a) a "By persona" entry grid linking to the four Solutions pages, or (b) keep capabilities but add a persona strip above the footer CTA. Recommend adding a persona strip and keeping the capabilities grid — don't lose existing content.
- Keep the Rate Explorer / Data Lake homepage sections; update their CTAs to the new `/platform/*` routes.

---

## 5. Redirects & SEO (do NOT skip)

Moving `/rateexplorer` → `/platform/rate-explorer` etc. requires 301s or we lose ranking + break inbound links.

- Add Netlify redirects (`netlify.toml` or `_redirects`) for every moved URL. Confirm which mechanism this repo uses before writing them.
- Audit internal links to old routes: `grep -rn "/rateexplorer\|/datalake" src/`.
- Update `Header.astro`, `Footer.astro`, homepage CTAs, any MDX/blog references, and `llms-full.txt.ts`.
- Update sitemap and any structured data.
- Per-persona FAQ schema via existing `buildFaqSchema` util (see index.astro usage).
- Consider keeping old routes as thin redirects rather than deleting.

---

## 6. Nav / component work

- `Header.astro`: split the single `Solutions` dropdown into `Platform` + `Solutions`. With 4–5 items each, evaluate a mega-menu vs. two simple dropdowns (mobile menu already iterates `navItems`, so a data change mostly cascades — verify mobile layout with more items).
- Create a shared **persona page template** (either an Astro layout or a set of composable section components) so the four pages stay consistent and cheap to build.
- Reuse `FaqAccordion`, `ScrollReveal`, dark CTA bookend pattern from homepage.
- `Footer.astro`: add Platform / Solutions link columns.

---

## 7. Suggested phasing

1. **Phase 0 — IA sign-off.** Confirm routes, final slugs, and index-page vs. dropdown-only. (Blocks everything.)
2. **Phase 1 — Platform rename + redirects.** Move pages to `/platform/*`, wire redirects, update nav/links. Low-risk, unblocks clean cross-linking. Ship.
3. **Phase 2 — Persona template + first page.** Build the shared template and ship **Employers** first (viz already exists → fastest proof of the template).
4. **Phase 3 — Remaining personas.** Health Systems, Consultants, Med Device.
5. **Phase 4 — AI Analyst + MCP pages + homepage persona strip.**
6. **Phase 5 — Polish:** SEO, schema, sitemap, mobile QA, analytics events per persona.

---

## 8. Open questions (resolve in Phase 0)

- **AI Analyst / MCP:** how much product detail is firm enough to publish now vs. placeholder?
- ~~Do we want `/platform` and `/solutions` index pages, or dropdown-only nav?~~ **Resolved 2026-07-25: dropdown-only, no index pages.**
- Any persona-specific proof assets (logos, testimonials, stats) available for Health Systems / Consultants / Med Device? (Employers has LunaJoy on the homepage.)
- Final URL slugs (`health-systems` vs. `providers`, `med-device` vs. `medical-device`/`medtech`).
- Mega-menu vs. two dropdowns in the header.

---

## 9. File touch-list (for when work starts)

**New:**
- `src/pages/solutions/health-systems.astro`
- `src/pages/solutions/consultants.astro`
- `src/pages/solutions/med-device.astro`
- `src/pages/solutions/employers.astro`
- `src/pages/platform/ai-analyst.astro`
- `src/pages/platform/mcp.astro`
- (optional) `src/pages/solutions/index.astro`, `src/pages/platform/index.astro`
- (optional) `src/layouts/SolutionLayout.astro` or persona section components

**Moved:**
- `src/pages/rateexplorer.astro` → `src/pages/platform/rate-explorer.astro`
- `src/pages/datalake.astro` → `src/pages/platform/data-lake.astro`

**Edited:**
- `src/components/Header.astro` (nav split)
- `src/components/Footer.astro` (link columns)
- `src/pages/index.astro` (persona strip + updated platform CTAs)
- Redirects file (`netlify.toml` / `public/_redirects`)
- `src/pages/llms-full.txt.ts`, sitemap, any MDX linking old routes
