# Site Expansion — Changelog & Handoff

Companion to [`site-expansion-plan.md`](./site-expansion-plan.md). Read the plan for the
full IA; this file tracks what's actually been done so a new chat can pick up with
minimal context.

**Branch:** `feature/platform-solutions-ia` (off `main`). Not yet pushed / no PR.

---

## Status at a glance (updated 2026-07-25)

**The initial plan is fully built — Phases 0–4 done.** Phase 5 (Polish) is intentionally
deferred to a separate plan.

- ✅ Platform pages moved to `/platform/*` + 301 redirects (Phase 1, **committed** `5013b54`)
- ✅ All 4 Solutions persona pages, on a shared `SolutionLayout` (Phases 2–3, **committed** `04f8587`)
- ✅ AI Analyst + MCP platform pages, on a shared `PlatformLayout` (Phase 4a, **committed** `04f8587`)
- ✅ Homepage "Find your solution" persona strip (Phase 4b, **committed** `04f8587`)

**All work is committed on `feature/platform-solutions-ia` (`04f8587`). Branch not pushed / no PR.**
(`.claude/launch.json` is gitignored and stays local.)

**Decisions pending from the user (do not assume):**
1. Push the branch / open a PR?
2. Keep the provisional AI Analyst / MCP pages in the live nav, or hide them until content firms up?
3. Proof assets for the non-Employers personas (see Open questions).

---

## Confirmed decisions

- **Two axes:** **Platform** (what we sell) + **Solutions** (who it's for).
- **Platform pages (4):** Rate Explorer, Data Lake, AI Analyst, MCP — **all built.**
- **Snowflake Marketplace is its own thing** — NOT under Platform in the header. (It
  currently still appears in the *footer* Platform column; left as-is intentionally.)
- **Solutions pages (4)** with confirmed slugs:
  | Nav label | URL |
  |---|---|
  | Health Systems | `/solutions/providers` |
  | Consultants | `/solutions/consultants` |
  | Med Device | `/solutions/medical-device` |
  | Employers | `/solutions/employers` |

---

## Done

### Commit `5013b54` — "Split IA into Platform + Solutions nav"

**Platform rename + redirects (Phase 1)**
- `git mv` `src/pages/rateexplorer.astro` → `src/pages/platform/rate-explorer.astro`
- `git mv` `src/pages/datalake.astro` → `src/pages/platform/data-lake.astro`
- Fixed import depth (`../` → `../../`) and hardcoded schema `url` fields in both.
- Renamed "Solutions" → "Platform" group in `Header.astro` and `Footer.astro`
  (Rate Explorer + Data Lake only; Snowflake removed from the header dropdown).
- Updated internal links: `index.astro` CTAs, `InsightCards.astro`, `public/llms.txt`.
- Added 301s in `public/_redirects`: `/rateexplorer` → `/platform/rate-explorer`,
  `/datalake` → `/platform/data-lake`.
- Sitemap + canonicals regenerate automatically from the new paths (no manual edit).

**Solutions scaffold**
- Added a Solutions dropdown to `Header.astro` and a Solutions column to `Footer.astro`
  (footer grid bumped to `grid-cols-2 md:grid-cols-3 lg:grid-cols-6`).
- Added 4 placeholder pages under `src/pages/solutions/` — each a "coming soon" hero
  (persona name + one-line angle + Get started CTA) on brand tokens.

**Verified:** `npm run build` compiles all pages; nav/footer links resolve; no console
errors. (Netlify `_redirects` only apply on deploy — they 404 on the local dev server,
which is expected.)

### Phases 2 + 3 — Persona template + all four Solutions pages (uncommitted)

**Shared template**
- Added `src/layouts/SolutionLayout.astro` — a data-driven persona template wrapping
  `PageLayout`. Renders the full plan §4a shape: Hero → Pains → How Payerset helps →
  Viz → (optional `proof` slot) → FAQ → CTA bookend, all on brand tokens. Pages pass
  structured copy via props (`pains`, `helps`, `faqs`, hero/viz/CTA text) and drop their
  persona viz into the `viz` named slot. FAQ schema auto-builds via `buildFaqSchema`.
- `helps[]` items deep-link to `/platform/*` (the Solutions↔Platform cross-linking).
- Proof is an optional named slot (`Astro.slots.has('proof')`) — omitted on all four for
  now (launching without proof assets; wire LunaJoy into Employers later if desired).

**Four persona pages built** (replaced the coming-soon scaffolds), each = config + one viz:
| Page | Route | Viz |
|---|---|---|
| Employers | `/solutions/employers` | `EmployerCoverageViz` |
| Health Systems | `/solutions/providers` | `RatesGridViz` |
| Consultants | `/solutions/consultants` | `AnalysisActionViz` |
| Med Device | `/solutions/medical-device` | `ClaimsDataViz` |

- Each viz is self-contained (fixed global IDs, dark-card themed, no props) → used once
  per page inside the dark viz section.
- Unique per-persona SEO title/description + 4 pains, 3 helps, 4 FAQs apiece.

**Verified:** `npm run build` compiles cleanly; all four pages render on the dev server
with no console errors; viz components mount (checked DOM via page text). CTA bookend
links to `/get-started` (no embedded HubSpot form on persona pages — kept lean).

### Phase 4 (part 1) — AI Analyst + MCP platform pages (uncommitted)

**Shared template**
- Added `src/layouts/PlatformLayout.astro` — data-driven template for net-new Platform
  products, mirroring `SolutionLayout` but following plan §4b: Hero (with optional status
  `badge`) → What it is → Key capabilities → Who it's for (cross-links to all four
  Solutions pages) → FAQ → CTA (with a `/pricing` pointer). Builds a `SoftwareApplication`
  + FAQPage schema from props.

**Two pages built** (replaced the coming-soon stubs), content provisional:
| Page | Route | Hero badge |
|---|---|---|
| AI Analyst | `/platform/ai-analyst` | Coming soon |
| MCP | `/platform/mcp` | In preview |
- Copy is deliberately high-level (no unverified product specifics). AI Analyst = natural-
  language layer over the dataset; MCP = programmatic/agent access over the Model Context
  Protocol (the Payerset MCP server is real).
- Added both to `Header.astro` Platform dropdown and `Footer.astro` Platform column.

**Verified:** `npm run build` compiles both; render on dev server with no console errors;
who-it's-for cards deep-link to `/solutions/*`; CTA points to `/pricing`.

> Note: both pages are live in the nav even though content is provisional — pull them from
> `navItems`/`footerLinks` if you'd rather not surface them until product detail firms up.

### Phase 4 (part 2) — Homepage persona strip (uncommitted)

- Added a **"Find your solution"** section to `index.astro`, between `InsightsCarousel`
  and the footer CTA (kept the existing `#solutions` capabilities grid — didn't replace).
- Chose a **divided-list** treatment (not another card grid — the homepage already has two
  6-card grids): full-width rows with hairline dividers, icon + persona name + one-liner +
  arrow, brand tokens, `data-reveal` stagger, hover states. Data-driven via a `personas`
  array in the frontmatter. Links to all four `/solutions/*` pages.
- **Verified:** build compiles; all four rows render with correct labels/hrefs; no console
  errors. **Phase 4 is now complete.**

---

## Not started (next up)

- **Phase 5 — Polish** (SEO/`llms.txt`, mobile QA, per-persona analytics). Deferred to a
  **separate plan** — it needs the personas' full pages fleshed out first (decision
  2026-07-25). Do not start here.

## Resolved decisions

- **No `/platform` or `/solutions` index pages** — dropdown-only nav. (Closes the plan §3
  open decision; the two-dropdown header stays.)

## Open questions (from plan §8, still unresolved)

- Persona proof assets (logos/testimonials/stats) for Health Systems / Consultants /
  Med Device? (Employers has LunaJoy on the homepage — not yet wired into the persona page.)
- Firmer AI Analyst / MCP product detail to replace the provisional copy when available.

## Notes / gotchas

- Pages under `src/pages/platform/` and `src/pages/solutions/` are two levels deep →
  relative imports need `../../`.
- `Header.astro` `navItems` and `Footer.astro` `footerLinks` are the single sources for
  nav — mobile menu iterates the same `navItems`, so a data change cascades.
- Canonicals auto-derive from `Astro.url.pathname` in `BaseLayout.astro`; only hardcoded
  absolute URLs (e.g. schema `url` fields) need manual updates when moving pages.
- Persona pages = data config + one viz in the `viz` slot; platform pages = data config,
  no viz. Both layouts build FAQ (and platform: SoftwareApplication) schema from props.
- Viz components are single-instance (fixed global DOM IDs) → use each once per page.
- `.claude/launch.json` has `autoPort: true` so the dev server picks a free port if 4321
  is taken (Astro then falls back to 4322+; the assigned `PORT` env is ignored). If the
  in-app preview proxy 404s, browse the port Astro actually logs, not the proxy port.
