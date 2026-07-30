# Site Expansion — Changelog & Handoff

Companion to [`site-expansion-plan.md`](./site-expansion-plan.md) (full IA). This file is the
condensed running state so a new chat can pick up fast.

**Branch:** `feature/platform-solutions-ia` (off `main`, 5 commits ahead). **Not pushed / no PR.**
`.claude/launch.json` is gitignored (local only). Dev server: `npm run dev` (port 4321; `autoPort`
falls back to 4322+ — browse the port Astro logs, not the proxy).

---

## Status at a glance (updated 2026-07-26)

The two-axis IA (**Platform** = what we sell, **Solutions** = who it's for) is fully built, and the
Solutions pages have had a design/conversion pass. All committed on the branch.

**Built & committed:**
- Platform pages at `/platform/*` (Rate Explorer, Data Lake, AI Analyst, MCP) + 301 redirects.
- 4 Solutions persona pages on a shared `SolutionLayout`; 2 platform pages (AI Analyst, MCP) on a
  shared `PlatformLayout`.
- Homepage persona strip + Solutions↔Platform cross-linking.
- **This session (`25c2db1`):** Solutions design/conversion pass — see "Latest pass" below.

**Nav labels → routes:**
| Nav label | Route |
|---|---|
| Providers | `/solutions/providers` |
| Med Device | `/solutions/medical-device` |
| Employers | `/solutions/employers` |

**Consultants persona was removed entirely** (page deleted, dropped from nav/footer/personas +
platform-page audience lists). Three personas remain. No redirect added (page was never pushed/live).

Persona was renamed **Health Systems → "Providers"** everywhere in nav/labels. "Health systems"
survives only as descriptive prose (e.g. "managed care and finance teams").

**Commits (main..HEAD):** `5013b54` split IA · `10200cc` changelog · `916e58d` persona/platform
pages + homepage strip · `17b54c6` rework Providers + Rate Explorer · `25c2db1` Solutions enrichment.

---

## Latest pass — Solutions design/conversion (`25c2db1`)

`SolutionLayout` section order is now: Hero → Pains → Helps → Viz → **PlatformHighlights** →
**"Explore other solutions"** persona strip → (proof) → FAQ → **ContactFormCTA**.

- **Hero:** primary CTA "Request your demo today" is now **blue** (`bg-brand-primary`); the secondary
  "Explore …" CTA was **removed** from all solution heroes (don't re-add `secondaryCta`). Optional
  **`heroViz` slot** → 2-column hero (falls back to single-col); optional **`heroStats` prop** →
  trust-marker strip under the CTAs. Providers uses **`HeroBenchmarkViz`** (peer rate bars, "Your
  system" highlighted; DRG 470 major joint replacement, $25–38K illustrative, "16% below peer
  median"). Numbers are placeholders — anchor to real Payerset percentile data if ever asked.
- **New shared components (single source of truth — edit these, not per-page copies):**
  - `components/ContactFormCTA.astro` — dark closing bookend with the inline HubSpot lead form
    (props: `headline`, `description`, `bullets`). Used by the homepage **and** every solution page
    (via layout). Script wires all `form.cta-contact-form`; multi-instance safe.
  - `components/PlatformHighlights.astro` — 4-up product card grid (Rate Explorer / Data Lake /
    AI Analyst / MCP) linking to `/platform/*`. Products baked in; distinct look from the persona list.
  - `utils/personas.ts` — shared persona list feeding the homepage strip and the layout's
    "other solutions" strip (which filters out the current `persona`).
- **Homepage refactored** to consume `ContactFormCTA` + `personas` so the form and persona list
  can't drift between pages.

**Verified:** dev server renders all four solution pages + homepage with no console errors; hero
blue CTA, no secondary CTA, platform section, other-solutions strip (excludes current persona), and
one inline CTA form all confirmed across pages (incl. a no-heroViz page, Med Device).

---

## Med Device refined (uncommitted — this session)

Reworked `/solutions/medical-device` around the **market-access** messaging (per the dictation:
market access, not negotiation). Full hero treatment now matches Providers.

- **Copy:** one narrative pain — *reimbursement blindness* — as 3 beats (adoption is decided by
  reimbursement you can't see / field team calls accounts blind / volume shifting between sites of
  care). 4 helps lead with data completeness, then prove-the-market + VAC/budget-impact, account
  targeting, site-of-care shift. Audience named = **market-access & commercial teams**. Headline
  "See the reimbursement that decides adoption"; `heroStats` added; FAQ reworked (adds account
  targeting + budget-impact/cost-effectiveness Qs).
- **Two new self-activating viz** (IntersectionObserver, same design language as
  `HeroBenchmarkViz`/`RatesGridViz`; illustrative placeholder numbers):
  - `components/SiteOfCareViz.astro` (**heroViz**) — reimbursement-by-site-of-care bars for CPT 64483
    across HOPD/ASC/office, HOPD highlighted, "~3× more across settings" footnote.
  - `components/AccountTargetViz.astro` (**main viz**) — account-targeting list with negotiated rate
    per account + Target/Below-bar pills against an $800 reimbursement threshold.
- **Bug fixed:** the old main viz was `ClaimsDataViz`, which only activates via a `viz:activate`
  event from `FeatureShowcase` — never dispatched by `SolutionLayout`, so it rendered at opacity:0
  (invisible) on this page. Replaced with `AccountTargetViz` (self-activating). *(Note: Consultants
  had the same trap with `AnalysisActionViz` — mooted by deleting that page; see below.)*

**Verified:** clean `npm run build`; dev server, no console errors; hero renders with blue CTA + 3
stats + SiteOfCareViz bars (screenshot); AccountTargetViz DOM-confirmed all 5 rows reveal with
correct pills. (Mid-page screenshots flaky — screenshot pipeline re-renders from top; DOM-verified.)

## Next up

1. **Employers** — messaging not yet nailed; needs web research first.
2. **Phase 5 (Polish)** — SEO/`llms.txt`, mobile QA, per-persona analytics. Deferred to its own plan;
   needs the persona pages fleshed out first.

(Consultants persona dropped — no longer on the roadmap.)

## Decisions pending from the user (do not assume)
- Push branch / open PR?
- Keep provisional AI Analyst / MCP pages in live nav, or hide until content firms up?
- Persona **proof assets** (logos/testimonials/stats) for Providers / Med Device?
  (Employers has LunaJoy on the homepage — not yet wired into the persona page; `proof` is an
  optional named slot in `SolutionLayout`, omitted on all four for now.)

## Copy pattern (Providers set the template)
- Lead with **one narrative pain** as 3 "beats" in the `pains` card grid (not 4 tactical problems).
- **"How Payerset helps"** leads with **data completeness** ("most complete, detailed rate data") as
  help #1, then capabilities. Name the buyer audience explicitly.
- `helps[]` items deep-link to `/platform/*`.

## Notes / gotchas
- Pages under `src/pages/platform/` and `/solutions/` are 2 levels deep → relative imports use `../../`.
- `Header.astro` `navItems` + `Footer.astro` `footerLinks` are the single nav sources (mobile menu
  iterates the same `navItems`).
- Canonicals auto-derive from `Astro.url.pathname`; only hardcoded absolute URLs (schema `url`) need
  manual edits when moving pages.
- Persona viz components (`RatesGridViz`, `HeroBenchmarkViz`, etc.) are single-instance (fixed global
  DOM IDs) → use each once per page.
- Netlify `_redirects` only apply on deploy (404 on local dev — expected).
