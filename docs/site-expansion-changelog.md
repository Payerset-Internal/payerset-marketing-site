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
| Consultants | `/solutions/consultants` |
| Med Device | `/solutions/medical-device` |
| Employers | `/solutions/employers` |

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

## Next up

1. **Refine Med Device** (`/solutions/medical-device`) — the immediate next task.
   - Give it the same hero treatment: a market-access / site-of-care **heroViz** + `heroStats`.
   - Rework copy around the Med Device messaging (per dictation): use cases are **market access**,
     not contract negotiation — prove product viability / go-to-market, educate customers on
     reimbursement, **sales targeting** (call on accounts with adequate reimbursement for the
     relevant codes), budget-impact & cost-effectiveness models, hospital **VAC** (value analysis
     committee) contracting, tracking adoption of own tech, and **site-of-care shift** analysis.
   - Source: `~/Downloads/solution transcripts/Medical Device Market Strategy_transcript.txt`.
2. **Employers** — messaging not yet nailed; needs web research first.
3. **Consultants** — later.
4. **Phase 5 (Polish)** — SEO/`llms.txt`, mobile QA, per-persona analytics. Deferred to its own plan;
   needs the persona pages fleshed out first.

## Decisions pending from the user (do not assume)
- Push branch / open PR?
- Keep provisional AI Analyst / MCP pages in live nav, or hide until content firms up?
- Persona **proof assets** (logos/testimonials/stats) for Providers / Consultants / Med Device?
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
