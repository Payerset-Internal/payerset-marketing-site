---
title: "Updates to Hospital Price Transparency Requirements and the April 1st Enforcement Deadline"
description: "CMS replaced estimated allowed amounts with percentile-based remittance data in the hospital price transparency rule. Here's what changed before the April 1, 2026 enforcement deadline."
date: 2026-04-03
author: "Andrew Gordon"
category: "News"
tags: ["price transparency", "hospital MRFs", "CMS", "compliance"]
readTime: "11 min read"
image: "/images/blog/updates-to-hospital-price-transparency-requirements-and-the-april-1st-enforcement-deadline/hero.jpg"
---

The Price Transparency Requirements for Hospitals to Make Standard Charges Public is the CMS rule implementing Section 2718(e) of the Public Health Service Act, enacted as part of the Affordable Care Act and codified at [45 CFR Part 180](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-E/part-180). It has been updated with a meaningful set of changes.

If your team works with [hospital machine-readable files](/post/making-sense-of-hospital-price-transparency-data) for benchmarking, contract analysis, or price transparency research, these updates are in effect now and worth understanding before you draw conclusions from the data.

CMS finalized a new round of updates with a January 1, 2026 effective date. Enforcement was delayed to give hospitals more time to comply. That window closes April 1, 2026. Here is what changed.

For the primary source documents, see the [CMS Federal Register notice](https://www.federalregister.gov/documents/2025/11/25/2025-20907/medicare-program-hospital-outpatient-prospective-payment-and-ambulatory-surgical-center-payment) and the [CMS GitHub repository for the hospital price transparency schema](https://github.com/CMSgov/hospital-price-transparency?tab=readme-ov-file).

## From estimated amounts to actual allowed amounts

The biggest structural change in version 3.0.0 of the standardized template is replacing the "estimated allowed amount" with actual dollar-based data. Under the prior framework, when a hospital's contract with a payer was expressed as a percentage of charges rather than a flat fee schedule rate, the hospital was required to publish an estimated allowed amount. Those estimates were often inconsistent, hard to validate, and varied depending on the methodology the hospital used to generate them.

The new requirement is more specific. For any payer-specific negotiated charge that cannot be expressed as a single dollar amount because it is based on a percentage or formula, hospitals must now publish three figures: the median allowed amount, the 10th percentile allowed amount, and the 90th percentile allowed amount. They also have to include the total number of remittance observations used to calculate those figures.

All three values must come from actual EDI 835 electronic remittance advice data, covering a lookback period of at least 12 months and no more than 15 months before the file is posted.

### Why three numbers instead of one

A reasonable question when you first see this requirement is: why a distribution? If a contract says "pay 42% of charges," shouldn't the allowed amount be consistent for a given service at a given hospital?

In theory, yes. In practice, the dollar output tends to vary even under a fixed percentage contract, because the charges themselves vary by encounter. Billed amounts vary because hospitals set their own chargemaster rates for each code, those rates can change over time, and the mix of services billed across claims for the same procedure is not always consistent. Add in coordination of benefits situations, secondary payer scenarios, and outlier provisions, and you end up with a distribution of outcomes rather than a single repeatable figure.

The percentile structure is CMS acknowledging that reality and requiring hospitals to represent it directly rather than collapse it into a single estimate.

From an analytical standpoint, the three-number format gives you more to work with than a point estimate does. A tight band between the 10th and 90th percentile suggests a relatively stable, predictable contract. A wide band signals that something more complex is happening underneath, whether that is charge variation, secondary billing patterns, or contract provisions that produce meaningfully different outcomes depending on the case. That context is helpful when you are using MRF data to benchmark or validate a rate.

One definition worth keeping in mind: the "total allowed amount" in these calculations is the hospital's gross charge minus all contractual adjustments, and it includes both what the health plan paid and any patient cost-sharing. It reflects total reimbursement received, not just the payer's portion. When comparing figures across hospitals, keep in mind that the allowed amount includes both the insurer's payment and any patient cost-sharing; a split that can vary considerably from claim to claim.

## Two other requirements in the update

**Revised attestation language.** The prior template included an affirmation statement. The new version requires a formal attestation confirming that the hospital has included all applicable payer-specific negotiated charges that can be expressed as a dollar amount, and that for charges that cannot be expressed as a dollar amount, it has included all information necessary for the public to derive one. The hospital must also name the CEO or other designated senior official responsible for overseeing the accuracy of the data.

**Organizational NPI encoding.** Hospitals must now encode their Type-2 (organizational) NPI associated with an active hospital taxonomy code directly in the MRF. This is a standardization measure intended to improve comparability across files and connect hospital MRF data more reliably to other provider datasets.

The NPI requirement addresses one of the more persistent friction points in price transparency work. Identifying which entity in a payer's MRF corresponds to a specific hospital facility has been genuinely difficult, particularly for large health systems that appear across dozens of NPIs. Having the organizational NPI encoded in the hospital's own file creates a cleaner bridge between data sources.

## For hospitals preparing for April 1

From the provider side, compliance with the version 3.0.0 template means more than reformatting a file. Hospitals need to pull 12 to 15 months of EDI 835 remittance data, calculate median, 10th percentile, and 90th percentile allowed amounts for each payer-specific negotiated charge that is expressed as a percentage or formula, and encode those figures accurately alongside remittance observation counts. For hospitals with large payer mixes and many percentage-based contracts, that is a meaningful operational lift.

The attestation requirement adds another layer. By signing off with a named senior official, the hospital is taking on formal accountability for the accuracy of what is published. That changes the internal calculus around data quality review before the file goes out.

## Using the new data in practice

The estimated allowed amount was a real limitation in the prior framework. Its value depended entirely on the methodology the hospital used to produce it, which was applied inconsistently and was difficult to audit. The shift to percentile-based actual remittance data closes that gap considerably for percentage-based contracts, and it makes [benchmarking work more reliable](/post/a-practical-look-at-reimbursement-benchmarking-with-price-transparency-data) when you are comparing reimbursement across hospitals.

That said, there are some real limits to what the new data can tell you. The percentile values are backward-looking. They reflect what was actually paid over the prior 12 to 15 months, not what a future claim will pay. For contracts that have been renegotiated or for hospitals that have updated their chargemasters recently, the historical distribution may not reflect current economics.

The observation count field matters a lot here. When a hospital publishes P10/median/P90 figures based on a small number of remittances, those figures carry more uncertainty than figures backed by hundreds or thousands of observations. We look at volume alongside the rate itself when drawing conclusions from this data, and that practice becomes even more relevant under the new framework.

One scoping note worth keeping in mind: these requirements apply to hospitals as defined under 45 CFR Part 180, not to all provider types. Ambulatory surgery centers, physician groups, and diagnostic labs that operate under separate licenses and billing structures are not subject to the same MRF template requirements, regardless of ownership. This is a meaningful distinction for managed care teams doing multi-setting analysis. The percentile data and attestation requirements described here are specific to the hospital MRF. For teams doing multi-setting analysis that includes ASCs, physician groups, or other non-hospital providers, payer MRFs are the more comprehensive source. They cover all in-network providers regardless of facility type and often carry more rate detail.

For fee-schedule-based contracts, the changes are less dramatic. A flat dollar rate is still a flat dollar rate, and the single-value reporting structure remains. The percentile requirement applies specifically to charges that cannot be expressed as a direct dollar amount.

## Enforcement begins April 1

The original hospital price transparency rule took effect in January 2021, requiring hospitals to publish machine-readable files for the first time. Since then, CMS has progressively tightened the requirements through multiple rulemaking cycles, adding the standardized template format in 2024, strengthening the affirmation requirement, and now replacing estimated amounts with actual remittance-based data. Each update has pushed the data closer to reflecting what hospitals are actually paid rather than what they estimate they might be paid. The version 3.0.0 changes are the most significant methodological update to the hospital MRF since the rule's inception, and they set a higher floor for what rigorous price transparency analysis can do.

CMS delayed enforcement of the January 1 effective date to give hospitals additional time to update their files. That window closes April 1, 2026. Hospitals that have not yet moved to the version 3.0.0 template and encoded the required percentile data, attestation language, and organizational NPIs will be out of compliance. Non-compliance carries real financial consequences. CMS can issue civil monetary penalties of up to $300 per day for smaller hospitals and up to $5,500 per day for larger ones, and the agency has been actively issuing penalties since late 2023. Enforcement activity has continued to increase since then.

For anyone consuming hospital MRF data for benchmarking or analysis, April 1 is also a useful moment to audit your sources. Files published before that date may still reflect the old format. After enforcement begins, you should start seeing the new structure more consistently, though file quality and completeness will continue to vary across hospitals as it always has. We have written about [what payer compliance looks like when a major schema update takes effect](/post/transparency-in-coverage-tic-schema-2-0-is-live-updates), and the same dynamic applies here on the hospital side.

We are watching how the new fields roll out across the files we work with and will share what we find.
