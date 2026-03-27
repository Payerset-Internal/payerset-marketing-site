---
title: "Key Updates in Price Transparency: Transparency in Coverage (TiC) Schema 2.0"
description: "A comprehensive breakdown of CMS's Transparency in Coverage Schema 2.0, including key improvements to provider group data, plan identification fields, service setting enhancements, and what fell short."
date: 2025-10-03
updatedDate: 2026-02-05
author: "Jacob Little"
category: "Industry Insights"
tags: ["price transparency", "compliance", "MRF"]
readTime: "5 min read"
image: "/images/blog/transparency-in-coverage-schema-2-0/hero.png"
---

## Transparency in Coverage Schema 2.0: What Healthcare Leaders Need to Know

**TL;DR**

- CMS released the long-awaited Transparency in Coverage (TiC) 2.0 schema on Oct. 1, 2025. Enforcement begins Q1 2026.
- Updates and clarifications from December 2025 CMS meeting provide further enhancements.
- Major updates include consolidated provider group data, new plan sponsor/issuer fields, and clearer service setting codes.
- Improvements reduce file size, enhance accuracy, and enable more apples-to-apples comparisons across carriers.
- Bottom line: schema 2.0 is a meaningful step forward but leaves a lot of room for stronger improvements.

## December 2025 CMS Update

On December 11, 2025 CMS hosted a session for solution providers and the broader ecosystem to directly address questions as well as provide a few updates since the initial announcement. Here are highlights from this update:

### Network Name

- Network name will live within objects in the MRF and will reduce the dependency on file-naming conventions.
- The name should contain the common provider network name recognizable by the public.
- Format changed from a string to an array allowing a provider group to be associated with multiple network names without duplicating the provider group structure. This will reduce unnecessary data size increases.
- CMS also emphasized a common real-world pattern: a "network" usually isn't a single provider group. Instead, multiple provider groups can share the same network name, and Schema 2.0 supports documenting that relationship by repeating the same network name across multiple provider groups.

### Clarification on use of "Additional Information" field

Additional information is an open text field meant to serve as a "backstop" when:
- Standardized fields don't fully express the negotiated rate logic, OR
- Contractual provisions materially affect a rate but do not have dedicated schema attributes.

CMS grouped common uses into categories such as:
- Conditional or tiered reimbursement rules
- Alternative payment methodologies
- Contractual nuances

CMS also noted they monitor how additional_information is used and may standardize common patterns in future schema iterations if consistent usage emerges.

### Miscellaneous

**Clarity on new Severity of Illness field vs. Billing Code Modifiers**
- Severity of illness is typically associated with DRG-based coding/payment contexts, and may affect negotiated rates for DRGs.
- Modifiers are typically associated with CPT-based billing contexts, where modifiers may affect the negotiated rate.

**Opportunity to move more metadata in the TOC vs. repeating within MRFs**
- The TOC structure supports defining multiple reporting plans and pointing them to the same in-network file locations.
- This is framed as a core mechanism to avoid producing multiple large in-network files that are effectively duplicates.
- In Q&A, CMS addressed whether it's acceptable to have multiple in-network files with the same plan information without using a TOC. The response emphasized that if multiple files would share the same plan context/rates, the TOC structure is the intended mechanism to represent that relationship and avoid duplication.

Overall, there is room for improvement in standardization here but it is encouraging there is an ongoing dialogue on intention and best practices.

## What You Need to Know

- Schema 2.0 is the first major update to TiC since September 2023.
- The update consolidates provider groups, introduces plan context fields, and improves service setting reporting.
- By reducing duplication and adding clarity, data is now more consistent, human-readable, and actionable.
- However, out-of-network allowed amounts remain hampered by the 20-claim threshold.
- Payerset will continue to track CMS updates and provide customers with schema-aligned insights.

## Transparency in Coverage 2.0 and Why It Matters

When CMS announced Schema 2.0, expectations were high. Industry leaders had requested details on outliers and carveouts, better out-of-network rules, and overall improved detail to more accurately reflect payer-provider contracts. While not all of these changes were included, this release still represents progress.

At a high level, TiC 2.0 brings higher-quality data, reduced file sizes, and clearer plan-level context. For CFOs and managed care leaders, this means a more reliable foundation for benchmarking rates and comparing contract terms across insurance carriers.

## Key Schema Improvements

### Provider Group Data Consolidation

- **Internal references only:** Provider groups must now be defined once and referenced across the file. This should greatly reduce duplication and file size.
- **Removed separate reference file:** All provider group information now resides within the in-network file, preventing dead links and missing provider data.
- **Impact:** Fewer errors from dead links (e.g., Cigna, Geisinger) and easier parsing.

### New Plan Identification Fields

- **Plan sponsor name:** Identifies the employer or group sponsoring the plan.
- **Issuer name:** Separates carrier from plan name for clarity (e.g., "Issuer: BCBS Tennessee" vs. "Plan: Premium Plus PPO").
- **Clarified plan name field:** Now represents only the plan itself.
- **Product type:** Standardized classification (HMO, PPO, EPO, etc.). While this field is not in the schema, it is proposed and documented in the notes. We hope it is included in a fast follow-up update.
- **Impact:** Enables apples-to-apples comparison of plans across carriers. Previously manual workarounds (like Payerset's own categorizations) can now be automated.

### Service Setting and Place-of-Service Enhancements

- **"Setting"** is a new field that now distinguishes between inpatient and outpatient. Previously, inpatient and outpatient information had to be derived from multiple fields.
- **No empty allowed-amounts lists:** Enforces meaningful data if an out-of-network file exists.
- **Impact:** Simplifies alignment between TiC data and claims data (e.g., Type of Bill, POS codes).

### DRG Severity (SOI) Attribute

- A new attribute for Severity of Illness (SOI) within DRGs.
- **Impact:** Allows more precise inpatient benchmarking by distinguishing between base and high-severity DRG payments.

## Where Schema 2.0 Fell Short

- **Out-of-network threshold:** The 20-claim minimum rule remains. This means many payers can legally avoid posting OON data. While CMS removed "aggregation to a single provider," the broader problem may persist.
- **Missed opportunities:** No inclusion of outlier or carveout objects, which would have captured the real nuance of contracts.
- **Impact:** Transparency improves, but contract reality still lags behind.

## How to Act on This

The good news is that for Payerset customers, no action is required. We will incorporate the new fields and guide you on how to apply them to your analysis. The new data will simply "flow through," and the previous schema will be snapshotted so you can access historical data and see how these schema updates have materially changed the data and the insights derived from it.

## FAQ

**When does schema 2.0 enforcement start?**
Feb. 2, 2026. Files published after that date must conform to the new schema.

**Will schema 2.0 reduce file sizes?**
Yes. Provider group references alone dramatically reduce redundancy.

**Why is the out-of-network threshold still an issue?**
The 20-claim rule often results in payers posting nothing. This reduces transparency rather than protecting privacy.

**How does this help CFOs and contracting teams?**
With standardized plan identifiers and service settings, comparisons are more reliable. Negotiation leverage improves when contracts are benchmarked accurately and consistently.

**What's next?**
CMS has hinted at future schema changes, including drug pricing elements in 2026. From our perspective, this TiC 2.0 update was a half measure, with much left to be desired. We hope this update is not a foreshadowing of what the Drug Price Transparency data will hold.
