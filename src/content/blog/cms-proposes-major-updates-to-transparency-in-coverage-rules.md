---
title: "CMS Proposes Major Updates to Transparency in Coverage (TiC) Rules"
description: "CMS is proposing significant updates to TiC requirements including network-based file structures, annual utilization files, quarterly reporting, and enhanced out-of-network data."
date: 2026-02-03
updatedDate: 2026-02-05
author: "Matt Phillips"
category: "Industry Insights"
tags: ["price transparency", "CMS", "transparency in coverage"]
readTime: "10 min read"
image: "/images/blog/cms-proposes-major-updates-to-transparency-in-coverage-rules/hero.jpg"
---

## TL;DR

- CMS is proposing some of the most significant updates to TiC requirements since its inception.
- Plans would consolidate rate files by provider network instead of by individual plan, dramatically increasing usability.
- Annual Utilization File would show which providers actually received reimbursement for a given service
- In-network and out-of-network files move from monthly to quarterly updates
- Enhanced out-of-network data: Claims threshold drops from 20 to 11, reporting period extends from 90 days to 6 months.
- Drug Transparency pushed back: Initially was supposed to begin early 2026 but timeline is now TBD

## What You Need to Know

The proposed rule represents CMS's response to years of feedback about the practical challenges of working with transparency data. While the 2020 final rules succeeded in releasing an enormous amount of previously hidden pricing data, implementation still had significant gaps: massive file sizes, duplicative data, lack of context about which rates actually matter, and misalignment with hospital price transparency formats.

[We've written about these challenges plenty](/post/the-positive-future-of-price-transparency-in-the-u-s-in-2025) and these proposals aim to fix some of those friction points systematically. For CFOs and managed care leaders, this means a more reliable foundation for benchmarking rates, validating contracted amounts, and preparing for negotiations. The data won't just be more accessible—it will be more trustworthy and easier to act on.

### Timeline

The proposed rule was published December 23, 2025. The comment period closes February 23, 2026. If finalized, most provisions would apply for plan years beginning on or after January 1, 2027. You can view the official announcement [here](https://www.federalregister.gov/documents/2025/12/23/2025-23693/transparency-in-coverage).

We've summarized the highlights below.

## Network-Based Rate File Structure: Identify the Correct Network and Rates Faster

### The Problem

Under current rules, health plans and issuers must publish a separate in-network rate file for each plan or coverage option they offer. This creates massive redundancy when multiple plans share the same provider network and negotiated rates.

Consider a realistic scenario: A regional Blue Cross Blue Shield plan might offer different commercial plan variations (different metal tiers, employer groups, and benefit designs) that all use the same underlying provider network with identical negotiated rates. Under current rules, that plan must publish 50 separate rate files—each containing the exact same provider list and rate information, just with different plan identifiers in the header.

Now scale that across the BlueCross BlueCard network, where participating Blue plans across all 50 states can share network access. In addition to the complexity of managing this data, simply finding the "correct" plan in the data becomes unnecessarily complex.

### The Proposed Solution

CMS proposes requiring plans and issuers to publish one in-network rate file per provider network rather than per plan. Each file would include:

- Common provider network name for clear identification
- Enrollment totals for each plan using that network (as of the file posting date)
- All negotiated rates for that network's providers

Plans offering multiple products that use the same network would reference a single network file instead of duplicating the data dozens or hundreds of times.

This change could reduce file sizes, eliminate redundant data, and make it far easier to identify the relevant rate for a specific provider-payer combination.

![Before and after of Network Rate File update](/images/blog/cms-proposes-major-updates-to-transparency-in-coverage-rules/inline-1.jpg)

### Better Alignment with Hospital Reporting

This structure also brings payer reporting into closer alignment with how hospitals report under their own price transparency rules. [Hospitals already organize their data by payer and network](/post/making-sense-of-hospital-price-transparency-data), so having insurers report the same way creates better apples-to-apples comparisons across both datasets.

## Annual Utilization File: Focus Analysis on Providers Who Perform the Service

### The Problem

Current in-network rate files contain negotiated rates for every provider with whom a plan has a contract, regardless of whether that provider ever actually submits a claim. This creates what the community have started calling "zombie rates" or "ghost rates" — contractual arrangements that exist on paper but have zero real-world utilization.

It's unclear if this is intentional obfuscation, data & system limitations on the backend, different interpretations of the rules, or a combination of all of these. But when you're benchmarking rates for a specific procedure or trying to understand the competitive landscape for a service line, these zombie rates add enormous noise to the analysis. You might see a contracted rate for a pediatric cardiologist performing total knee replacements, or negotiated amounts for providers who haven't billed the plan in years.

### The Proposed Solution

CMS proposes a new Utilization File that plans and issuers would post annually. This file would identify all providers (by NPI, TIN, and Place of Service code) who received reimbursement for at least one claim during a 12-month period that ends 6 months before the file posting date.

The Utilization File would list:

- Each covered item or service (by billing code) for which claims were reimbursed
- Each in-network provider who was reimbursed for that item or service
- The connection between what services were actually billed and which providers delivered them

![Before and after of utilization file implementation](/images/blog/cms-proposes-major-updates-to-transparency-in-coverage-rules/inline-2.png)

This creates a useful filter for rate benchmarking. For example, when benchmarking orthopedic surgery rates in a specific market, you can now focus exclusively on providers who actually performed those procedures for that plan's members.

### Real-World Application

We pushed for full utilization & claims data from the payers but this is an important first step. There are no magic bullets here, though - we envision this being a first-pass filter and then further using real-world claims & remits data to understand marketshare, utilization, and validating rate benchmarking.

## Change-Log File: Track Rate Changes from Quarter to Quarter

### The Proposal

Plans and issuers would be required to publish a Change-log File with each quarterly in-network rate file that identifies any changes made to the required information since the last posted file. This includes additions, deletions, or modifications to provider networks, negotiated rates, or plan enrollment data.

The Change-log provides transparency into rate evolution over time. When you see a rate increase or decrease, you can track when it changed and potentially correlate it with contract renewal cycles, policy changes, or market shifts. This is particularly valuable for:

- **Rate trend analysis:** Understanding whether your contracted rates are keeping pace with market movements
- **Contract compliance monitoring:** Verifying that mid-year rate adjustments align with contract terms
- **Competitive intelligence:** Spotting when competitors renegotiate rates or enter/exit networks

We will be monitoring the implementation of this and will continue to provide feedback to CMS on what we see in the data.

## Taxonomy File: See Which Provider-Service Combinations the Plan Considers Valid

### The Problem

Plans and issuers use internal taxonomies during claims adjudication to determine if a provider is appropriately credentialed to perform a specific service. A plan might automatically deny reimbursement for a procedure if the provider's specialty doesn't match the service being billed, regardless of whether a negotiated rate exists in the rate file.

However, these internal taxonomies haven't been published.

### The Proposed Solution

Plans and issuers would be required to publish a Taxonomy File showing their internal provider taxonomy that matches items and services (by billing code) with provider specialties (using Healthcare Provider Taxonomy codes from NUCC).

This reveals which provider specialties the plan considers appropriate for which services. The Taxonomy File helps you understand the logic behind the rate file structure. When a rate doesn't appear in the data, you'll have a better idea if it's because:

- No contract exists for that provider-service combination
- The provider's specialty is deemed inappropriate for that service by the plan's rules
- The rate was excluded for other reasons

## Excluded Provider Information: Remove Clinically Inappropriate Rate Combinations from Files

### The Proposal

CMS proposes requiring plans and issuers to exclude provider-rate combinations for services that a provider is unlikely to perform based on the provider's specialty. The determination would be based on the plan's internal taxonomy used during claims adjudication.

For example, a plan would exclude the negotiated rate for an ophthalmologist performing hip replacements, even if a theoretical rate exists in their contract master file.

This directly addresses file bloat and improves data quality. Excluding implausible provider-service combinations:

- **Reduces file size significantly:** Fewer irrelevant rate entries to store, transfer, and process
- **Improves analysis accuracy:** Benchmarking focuses on clinically appropriate comparisons
- **Eliminates confusion:** No more questioning why certain absurd rate combinations exist in the data

This is complimentary to the Utilization file and a step in the right direction in reducing zombie rates and increasing usability of the price transparency data.

## Enhanced Out-of-Network Data: Access More Comprehensive OON Allowed Amounts

### Three Key Changes

CMS proposes several modifications to make out-of-network allowed amount data more comprehensive and useful:

**1. Lower Claims Threshold:** The minimum number of claims required for reporting drops from 20 to 11 different claims per item or service. This means more out-of-network utilization will be captured in the data, particularly for less common procedures or in smaller markets.

**2. Longer Reporting Period:** The reporting period increases from 90 days to 6 months, and the lookback period extends from 180 days to 9 months. More data over a longer timeframe improves the reliability of out-of-network cost estimates.

**3. Market-Level Aggregation:** Plans and issuers would organize allowed amount data by health insurance market type (individual, small group, large group, or self-funded) rather than by individual plan. This provides clearer market-wide context while maintaining appropriate aggregation for privacy protection.

These changes make out-of-network data more comprehensive and actionable for:

- **Balance billing risk assessment:** Better estimates of potential out-of-network costs for patients
- **Network adequacy analysis:** Identifying gaps in network coverage by specialty and service
- **Reference pricing strategies:** More robust data for establishing reference-based pricing programs
- **No Surprises Act compliance:** Improved data for calculating qualifying payment amounts

### The Remaining Gap

While these improvements are meaningful, the claims threshold issue persists. Even at 11 claims, many payers can still avoid posting out-of-network data for less common services. CMS continues to struggle with balancing privacy protection against the transparency goal of comprehensive out-of-network cost disclosure.

## Quarterly Reporting: Receive Updates Every Three Months Instead of Monthly

### The Change

In-network rate files and out-of-network allowed amount files would move from monthly to quarterly reporting cadence. Prescription drug files would remain monthly.

### Why This Makes Sense

Negotiated rates typically don't change monthly. Contract renewals and rate adjustments usually happen annually or semi-annually, meaning monthly updates often show no meaningful changes while creating substantial administrative burden for plans and bandwidth costs for file distribution.

Quarterly reporting provides a reasonable middle ground: frequent enough to capture meaningful changes, but not so frequent that it generates busywork. The Change-log File (discussed above) ensures that users can track exactly what changed between quarters.

- **For plans and issuers:** Reduced compliance burden, lower data storage and bandwidth costs, fewer opportunities for filing errors
- **For data users:** More stable data for quarterly analysis cycles, less frequent data ingestion overhead, clearer signals when rates actually change

## Text File and Footer Link: Locate Machine-Readable Files Faster

### The Problem

Finding a plan's machine-readable files currently requires navigating through multiple web pages, searching documentation, or using third-party tools that scrape and index file locations. There's no standardized way to locate where a plan posts its transparency files.

### The Proposed Solution

Plans and issuers would be required to:

- **Post a Text File** in the root folder of their website containing:
  - URLs for all required machine-readable files
  - Contact information for inquiries about the files
  - A point of contact for technical questions
- **Include a footer link** on their website homepage titled "Price Transparency" or "Transparency in Coverage" that routes directly to the page hosting the machine-readable files

These simple requirements dramatically improve file discoverability and accessibility. Data teams, researchers, and third-party tool developers can programmatically locate and download files without manual searching. This enables:

- **Automated data pipelines:** Scripts can reliably find and retrieve updated files
- **Consistent file locations:** Standardized paths reduce broken links and missing data
- **Better compliance monitoring:** Regulators and watchdogs can easily verify file availability

This aligns with hospital price transparency requirements, which already use similar standardization for file locations.

## Product Type Identification: Compare Rates Across HMO, PPO, and Other Plan Types

### The Proposal

Plans and issuers would be required to include product type (HMO, PPO, EPO, POS, etc.) in both in-network rate files and out-of-network allowed amount files.

Product type is a fundamental characteristic that affects network breadth, provider access rules, and often negotiated rate levels. Including this field enables more accurate comparisons:

- **PPO vs. HMO rate analysis:** Understanding rate differences across product structures
- **Network strategy development:** Identifying which product types offer the most competitive rates
- **Member communication:** Helping members understand why rates differ across their plan options

This builds on the improvements in Schema 2.0, where plan identification fields were enhanced to enable better apples-to-apples comparisons across carriers.

## What Didn't Make It (But Should Be on Your Radar)

CMS explicitly chose not to address prescription drug transparency requirements in this proposed rule. The agency published a separate Request for Information in June 2025 seeking feedback on how to effectively implement the prescription drug machine-readable file requirement, which has been on hold since 2023.

Expect separate rulemaking on prescription drug transparency in 2026. Given the complexity of pharmacy benefit manager (PBM) relationships, formulary tiers, rebates, and manufacturer pricing, the drug transparency requirements may end up being even more significant than these updates to medical service transparency.

## Price Transparency is continuing to gain momentum

These proposed changes signal that price transparency policy is moving from "get the data out there" to "make the data actually usable." In particular, we're encouraged because a lot of these updates came directly from feedback from the price transparency community. CMS & policymakers are listening and the foundation for fair and equitable healthcare for everyone is solidifying.

## FAQ

**When does this take effect?**
Most provisions would apply for plan years (policy years in the individual market) beginning on or after January 1, 2027. However, this assumes the rule is finalized in 2026. The comment period closes February 23, 2026.

**Will this reduce file sizes significantly?**
Potentially. Depending on how payers implement the network requirement, the network-based structure alone could reduce file counts and total file sizes. We will be closely monitoring the effects of these updates.

**What happens to existing Schema 2.0 requirements?**
These proposed regulatory changes are separate from (but complementary to) the Schema 2.0 technical format updates that CMS released in 2025. If this rule is finalized, the technical schemas will be updated again to accommodate the new data elements and file structures. Both sets of requirements will apply.

**How does the Utilization File interact with the Taxonomy File?**
They serve different purposes. The Taxonomy File tells you which provider-service combinations the plan considers clinically appropriate. The Utilization File tells you which of those appropriate combinations actually happened in the real world. Together, they help you distinguish between rates that could theoretically be used versus rates that are actually driving claims volume.

**Will plans still have to post rates for every provider in their network?**
Yes, the Plan detail will still be available but the network file will add an additional layer or organization to better identify networks and subsequent plans.

## Put Price Transparency Data to Work

Payerset delivers the most comprehensive price transparency data sourced directly from health plans and enriched with all-payer claims data. Compare negotiated rates by carrier, network, service line, and product type with confidence.

- Validate contracted reimbursement with claims-backed utilization context
- Filter out zombie rates and focus on real market dynamics
- Benchmark against the providers actually delivering care in your market
- Build stronger negotiation strategies with utilization-validated rate intelligence
