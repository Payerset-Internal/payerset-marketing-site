---
title: "Making Sense of Hospital Price Transparency Data: 2025 Updates & Solutions"
description: "A breakdown of the current state of hospital machine-readable files (MRFs), the latest 2024-2025 regulatory updates, ongoing challenges, and how Payerset simplifies hospital price transparency data analysis."
date: 2025-02-23
updatedDate: 2025-09-11
author: "Joseph Tollison"
category: "Industry Insights"
tags: ["compliance", "data access", "MRF"]
readTime: "4 min read"
---

*This blog was originally published on February 23, 2025 and updated on September 10, 2025*

Hospital price transparency data has come a long way since its messy early days. But even with 2025 regulations, inconsistencies still make analysis challenging. In this post, we break down the current state of hospital machine-readable files (MRFs), the latest updates, and how Payerset simplifies the process.

[Click here for direct links to each Hospital MRF by State](https://docs.payerset.com/hospital-transparency/mrf-links-by-state)

## The State of Hospital MRF Data

Unlike the Transparency in Coverage (TiC) rule, which applies to insurance carriers, hospital price transparency regulations are a separate initiative with different requirements, schemas, and implementation timelines.

When hospital price transparency requirements were first introduced, the lack of standardization made meaningful analysis nearly impossible. Hospitals published data in different structures, with no consistency in file formats, terminology, or coding methodologies.

Some of the most notable challenges included:

- **Inconsistent File Formats** – No unified schema for reporting, making data difficult to compare
- **Limited Field Utility** – Missing or vague pricing fields made apples-to-apples comparisons difficult
- **Lack of Cross-Referencing** – Theoretically, hospital-posted prices should match payer-posted prices, but discrepancies were common
- **Disorganized File Hosting** – No centralized or predictable locations for file access

Was this lack of consistency intentional obfuscation or just poor implementation? The reality is likely a mix of both, compounded by resource-constrained hospital IT teams.

## 2024-2025 Hospital Price Transparency Data Rule Updates

### July 2024: Standard Charges Format Implementation

To improve data consistency, the July 1, 2024, regulations introduced a standardized format, requiring hospitals to publish:

- **JSON Schema** – A structured, machine-readable format for improved parsing.
- **Wide-Form CSV Format** – A more accessible but still structured alternative.

### January 2025: Enhanced Accessibility and Data Accuracy

Starting in January 2025, additional measures were implemented to improve usability and compliance:

- **Increased Accessibility** – Hospitals must prominently display links to their MRFs in website footers.
- **Affirmation of Data Accuracy** – Hospitals must attest that their posted data is complete and correct.
- **New Data Elements:**
  - Estimated Allowed Amounts – Projected pricing for services.
  - Drug Unit Measurement Standardization – Making National Drug Code (NDC) comparisons easier.

The Centers for Medicare & Medicaid Services (CMS) [provides a detailed breakdown](https://www.cms.gov/newsroom/fact-sheets/hospital-price-transparency-fact-sheet) of the Hospital Price Transparency Rule, including the latest regulatory updates effective July 1, 2024. Similarly, the American Hospital Association (AHA) [discusses how hospitals are implementing these new requirements](https://www.aha.org/news/headline/2024-07-01-new-hospital-price-transparency-requirements-take-effect).

These updates were significant steps forward, but they didn't entirely solve the challenges of normalizing hospital price data for analysis.

## May 2025 Changes to Hospital Price Transparency Guidance

[On May 22, 2025, CMS issued](https://www.cms.gov/files/document/updated-hpt-guidance-encoding-allowed-amounts.pdf) updates regarding Hospital Price Transparency Guidance. The key change is that new guidance for encoding allowed amounts. In short, CMS is closing the "loophole" of placeholders and requiring real dollar values so that hospital transparency files are more consistent and useful.

Here's a summary of the changes that occurred in May.

**Dollar Amounts Required** — Hospitals must encode payer-specific negotiated charges as actual dollar amounts in machine-readable files (MRFs), whenever they can be calculated (e.g., negotiated base rate, case rate, per diem, or percentage of a known fee schedule).

**No More "999999999"** — Hospitals should stop encoding nine 9s as a placeholder for "estimated allowed amounts." CMS found this was overused and made the data less useful.

**Definition of "Estimated Allowed Amount"** — Must represent the average dollar amount historically received from a third-party payer for an item/service.

**How to Calculate** (must use prior 12 months of electronic remittance advice (ERA/835) data):
- If the negotiated algorithm/percentage applied for only part of the year, report the average dollar amount for that period only.
- If the item/service was provided at least one time in the prior 12 months, report the average of those paid amounts, and note "one or more instances in the prior 12 months."
- If the item/service was not provided in prior 12 months, encode an expected dollar value, and note "zero instances in prior 12 months."

**Documentation in Notes Field** — Hospitals must add clarifying notes in the MRF to indicate whether there were zero, one, or more instances in the prior 12 months when reporting estimated allowed amounts.

## Ongoing Challenges in Hospital Pricing Data

Despite improved formatting and regulatory oversight, several challenges persist that got in the way of hospital pricing data standardization. These are the three hurdles to overcome.

### 1. Payer Name and Plan Name Inconsistencies

Different hospitals refer to the same payer in multiple ways like:
- UnitedHealthcare might appear as "UHC," "United," or "UnitedHealthcare."
- Cigna could also be listed as "LifeSource" for transplant networks.
- Blue Cross Blue Shield (BCBS) variations make it difficult to determine the exact plan.

### 2. Billing Code Variability

- Some hospitals use a single billing code for a procedure (e.g., one CPT code for a colonoscopy).
- Others list multiple billing codes, each with slightly different pricing structures.
- There's no uniform approach, making it hard to determine whether differences stem from contract negotiation, billing methodology, or simple misclassification.

### 3. Slow Adoption of New Compliance Measures

- Hospitals are only required to update MRFs once per year, meaning outdated formats linger.
- Many hospitals are still catching up on compliance, delaying the effectiveness of new regulations.

Despite regulatory improvements, compliance remains a major issue. [According to a report from the Office of Inspector General (OIG)](https://oig.hhs.gov/reports/all/2024/not-all-selected-hospitals-complied-with-the-hospital-price-transparency-rule/), a significant percentage of hospitals have yet to fully comply with the transparency rule. Additionally, [a Patient Rights Advocate report found that compliance among hospitals has actually declined,](https://www.healthcaredive.com/news/hospital-price-transparency-continues-drop-patient-rights-advocate/733703/) highlighting ongoing inconsistencies in hospital-reported pricing.

## How Payerset Solves These Challenges

We take a human-first approach to organizing, simplifying, and making hospital price transparency data more actionable and accessible.

**1. Payer Name & Plan Name Normalization** — We standardize payer names and plan names so that they are consistent across all hospital files. This allows for easy comparison across hospitals and alignment with payer-posted data.

**2. Billing Code Categorization** — We map hospital billing codes to categorized, easy-to-understand procedure groups. This helps remove noise from the data and ensures proper comparability across providers.

**3. Compliance Tracking & Continuous Monitoring** — We track hospitals' compliance with regulations and update our datasets accordingly. As hospitals gradually align with the new standards, we incorporate their latest data for accuracy.

**4. Seamless Integration with Payer Data** — By linking hospital-posted data with Transparency in Coverage payer data, we provide a holistic view of healthcare pricing. This allows better benchmarking and removal of outliers to enhance pricing insights.

Hospital price transparency is improving, but significant challenges remain. Payerset makes it easy to work with hospital and payer data, eliminating inconsistencies and enabling smarter analysis.
