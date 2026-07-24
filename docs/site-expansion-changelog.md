# Site Expansion — Changelog & Handoff

Companion to [`site-expansion-plan.md`](./site-expansion-plan.md). Read the plan for the
full IA; this file tracks what's actually been done so a new chat can pick up with
minimal context.

**Branch:** `feature/platform-solutions-ia` (off `main`). Not yet pushed / no PR.

---

## Confirmed decisions

- **Two axes:** **Platform** (what we sell) + **Solutions** (who it's for).
- **Platform pages (4):** Rate Explorer, Data Lake, AI Analyst *(not built)*, MCP *(not built)*.
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

---

## Not started (next up)

- **Phase 2** — Build the real persona page template and flesh out **Employers** first
  (`EmployerCoverageViz` already exists). Then Health Systems, Consultants, Med Device.
  Template shape is in plan §4a.
- **Phase 4** — Build **AI Analyst** (`/platform/ai-analyst`) and **MCP**
  (`/platform/mcp`) pages, add them to the Platform dropdown + footer, and add a
  homepage persona strip. Content is provisional pending product detail.
- Decide whether to build `/platform` and `/solutions` index/landing pages (plan §3
  open decision) vs. dropdown-only.

## Open questions (from plan §8, still unresolved)

- How much AI Analyst / MCP product detail is firm enough to publish now?
- `/platform` + `/solutions` index pages, or dropdown-only nav?
- Persona proof assets (logos/testimonials/stats) for Health Systems / Consultants /
  Med Device? (Employers has LunaJoy on the homepage.)
- Mega-menu vs. two dropdowns in the header (currently two simple dropdowns).

## Notes / gotchas

- Pages under `src/pages/platform/` and `src/pages/solutions/` are two levels deep →
  relative imports need `../../`.
- `Header.astro` `navItems` and `Footer.astro` `footerLinks` are the single sources for
  nav — mobile menu iterates the same `navItems`, so a data change cascades.
- Canonicals auto-derive from `Astro.url.pathname` in `BaseLayout.astro`; only hardcoded
  absolute URLs (e.g. schema `url` fields) need manual updates when moving pages.
