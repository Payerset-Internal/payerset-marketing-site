# LLM Visibility — Off-Site Action Checklist

On-site code/schema work is covered in `llm-geo-implementation-plan.md`. **This file is the off-site work** — and off-site corroboration is the single biggest real-world driver of whether an LLM *cites* you. Models trust facts that appear consistently across many independent sources. Your job here is to make "Payerset = healthcare price transparency data" true everywhere on the web, not just on payerset.com.

Owner: ______________   Target review date: ______________

---

## 1. Establish a canonical entity (do this first)

- [ ] **Create a Wikidata item** for Payerset (https://www.wikidata.org). This is the backbone many LLMs and knowledge graphs read. Include: instance of → business/company, industry → health care / health technology, official website, founding date, headquarters, founder(s), and `LinkedIn company ID`. Free, ~30 min.
- [ ] **Crunchbase profile** — claim/create, full description, category tags (Health Care, Data & Analytics, Health Tech), website, team, funding if applicable.
- [ ] *(Stretch)* Evaluate **Wikipedia notability.** Only viable with independent press coverage (see §3). Don't create a thin article — it'll be deleted. Build the press first, revisit later.

## 2. Make every profile say the same thing (NAP + description consistency)

LLMs reconcile your identity across sources; conflicting descriptions dilute the signal. Use **one** canonical 1-sentence and 1-paragraph description (pull from `llms.txt`) everywhere.

- [ ] Lock a canonical boilerplate: name spelling ("Payerset"), 1-line tagline, 1-paragraph description, logo, founding year, HQ.
- [ ] LinkedIn company page — description, website, industry, specialties/keywords match boilerplate.
- [ ] Crunchbase — matches.
- [ ] **G2** and **Capterra** software listings — create/claim; categories: Healthcare Analytics, Data & Analytics. Reviews here are frequently cited by LLMs for "best X" queries.
- [ ] Google Business Profile (if applicable) — matches.
- [ ] Any partner directories (e.g., **Snowflake Marketplace** listing, **PurpleLab**) — confirm consistent description + link back to payerset.com.
- [ ] Ensure every profile's `sameAs` links point back to each other and to payerset.com (this should mirror the `sameAs` array in the Organization schema).

## 3. Earn third-party citations (the real lever)

LLMs cite sources that *other authoritative sites* reference. Get Payerset's name and data into healthcare-finance publications and roundups.

- [ ] **Pitch contributed articles / get quoted** in industry press: HFMA, Becker's Hospital Review, Fierce Healthcare, Modern Healthcare, RevCycle Intelligence, Healthcare Dive. A single byline in one of these is worth more than dozens of self-published posts.
- [ ] **Get into "best price transparency tools / data vendors" listicles** — these are disproportionately cited when users ask LLMs for vendor recommendations. Identify the top 5 ranking listicles and reach out for inclusion.
- [ ] **Original data / research angle** — Payerset sits on unique rate data. Publish a quotable annual stat or index (you already have a "scorecard" and a "field guide"). Reporters and LLMs cite *named statistics*. Give each one a stable URL and a one-line citable claim.
- [ ] **Podcasts / webinars** — you have Payercast and have appeared on Relentless Health Value. Get episodes transcribed and indexed; guest on others; ensure show notes link to payerset.com.
- [ ] **Conference presence** (HFMA, HIMSS, the National Healthcare Price Transparency Conference) — ensure agendas/recaps that mention Payerset are crawlable and linked.

## 4. Distribute your best content where LLMs already read

- [ ] Cross-post or summarize flagship articles on **LinkedIn** (high-trust, heavily crawled).
- [ ] Put **Payercast** on YouTube with full transcripts + descriptions (video transcripts are ingested and cited).
- [ ] Answer real questions on **Reddit** (r/healthIT, r/hospitalfinance), **Quora**, and healthcare-finance forums where price transparency comes up — LLMs lean heavily on these for category/recommendation queries. Be genuinely helpful, disclose affiliation, link only where relevant.

## 5. Monitor — measure whether it's working

You can't manage what you don't measure. Run this **monthly** and log results.

- [ ] Ask each engine (ChatGPT w/ search, Perplexity, Gemini, Claude w/ web) a fixed set of prompts and record whether Payerset appears and whether it's cited correctly:
  - "What is Payerset?"
  - "Who provides healthcare price transparency data?"
  - "Best tools for reimbursement benchmarking with MRF data"
  - "How do I benchmark hospital reimbursement using price transparency data?"
  - "Companies that parse Transparency in Coverage machine-readable files"
- [ ] Track **referral traffic from AI sources** in analytics (you have GA4, GTM, and Fathom). Watch for referrers: `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`. Tag them in GA4.
- [ ] Check server/Netlify logs for AI crawler user-agents (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `OAI-SearchBot`) to confirm you're being crawled.
- [ ] *(Optional, paid)* Consider a GEO monitoring tool (Profound, Peec, Otterly.ai, or similar) for automated answer-share tracking across engines.

## 6. Cadence

| Frequency | Action |
|---|---|
| One-time | Wikidata, Crunchbase, G2/Capterra, profile consistency (§1–2) |
| Quarterly | Press pitch push, listicle outreach, one original-data release (§3) |
| Monthly | Run the monitoring prompt set + analytics review (§5) |
| Ongoing | LinkedIn cross-posts, podcast transcripts, forum answers (§4) |

---

**Reminder:** keep the canonical description in §2 in sync with the `Organization` JSON-LD `description`/`knowsAbout` and the `llms.txt` summary. The whole point is that on-site and off-site tell the *exact same story*.
