---
title: "The Positive Future of Price Transparency in the U.S. in 2025"
description: "Analyzing the 2025 executive order on healthcare price transparency, the challenges that must still be addressed, and the path forward for making transparency real and accessible."
date: 2025-02-26
updatedDate: 2025-08-27
author: "Jacob Little"
category: "Industry Insights"
tags: ["health insurance price transparency", "compliance", "MRF"]
readTime: "5 min read"
image: "/images/blog/the-positive-future-of-price-transparency-in-the-u-s-in-2025/hero.webp"
---

*This post was originally published on February 26, 2025, and updated on August 27, 2025.*

On February 25, 2025, President Trump signed his [second executive order regarding price transparency](https://www.whitehouse.gov/presidential-actions/2025/02/making-america-healthy-again-by-empowering-patients-with-clear-accurate-and-actionable-healthcare-pricing-information/). The executive order is titled "Making America Healthy Again by Empowering Patients with Clear, Accurate, and Actionable Healthcare Pricing Information." Below we cover the background his new executive order builds on, challenges we've overcome as an industry and ones that still remain, as well as outline the path forward to ensure the positive impact these new regulations can help create for the healthcare landscape.

We'll update this post throughout the year as healthcare price transparency continues to evolve.

## Foundation laid for price transparency

This new order builds upon Executive Order 13877, issued on June 24, 2019, titled ["Improving Price and Quality Transparency in American Healthcare to Put Patients First."](https://trumpwhitehouse.archives.gov/presidential-actions/executive-order-improving-price-quality-transparency-american-healthcare-put-patients-first/) This regulation was a paradigm shift, requiring hospitals and health plans to provide meaningful price information to the public. Specifically, it mandated:

- **Hospitals** to maintain a consumer-friendly display of pricing information for shoppable services and [provide a machine-readable file (MRF) listing negotiated rates for all services](/post/making-sense-of-hospital-price-transparency-data).
- **Health plans** to publish their negotiated rates with providers, their out-of-network payments, and the actual prices paid for prescription drugs.
- **Health plans** to maintain a consumer-facing tool that allows individuals to access price information.

This was a bold and necessary step toward healthcare and hospital price transparency.

## Barriers to implementation and enforcement

Despite the intent of these regulations, implementation faced several challenges. The data published by payers was often:

- **Infrequently updated**, resulting in missing or incomplete information.
- **Low quality**, with issues such as duplicate records, inconsistent naming, and non-standard billing classifications.
- **Difficult to access**, perhaps the biggest obstacle. Machine-readable files (MRFs) were often intentionally complex, making extraction, normalization, and usability a significant challenge.

As an industry, we have made significant progress in bringing the promised vision to reality yet still there's so much to be done. As a price transparency company, we are frequently asked: "What will the Trump administration do this time around to make this better?"

While we were confident that this administration would continue supporting price transparency, we were uncertain about specific priorities. However, on February 25, 2025, we were excited and relieved to see that the administration is fully committed to advancing transparency.

## The 2025 Executive Order: A renewed focus on price transparency

As stated in [Section 3 of the executive order](https://www.whitehouse.gov/presidential-actions/2025/02/making-america-healthy-again-by-empowering-patients-with-clear-accurate-and-actionable-healthcare-pricing-information/), titled "Fulfilling the Promise of Radical Transparency," the Secretary of the Treasury, Secretary of Labor, and Secretary of Health and Human Services are now required to take all necessary actions to:

- Enforce existing healthcare price transparency regulations.
- Within 90 days, mandate the disclosure of actual prices of services rather than estimates.
- Issue updated guidance to ensure that pricing data is standardized and easily comparable across hospitals and health plans.
- Update enforcement policies to ensure [complete, accurate, and meaningful data reporting.](/post/why-complete-healthcare-price-transparency-is-essential-and-what-it-takes-to-get-it-right)

Sections B and C of the order are particularly critical, as they address major data challenges that have plagued price transparency since 2022.

## What are the price transparency challenges that must be addressed?

We live and breathe this data every day and while price transparency laws have led to progress, several persistent issues must still be resolved.

### 1. Conflicting rates in machine-readable files (MRFs)

Many MRFs list multiple rates for the same provider and service within the same plan but lack the necessary details to clarify which rate applies. This becomes especially problematic in rental networks, such as those used by Blue Cross Blue Shield, where the same provider appears under different contract structures.

One example of this is a provider is listed multiple times under the same plan with different rates, leading to confusion and reduced trust in the data. There are some particularly poor payers when it comes to publishing conflicting rates but on a positive note, United Healthcare made major improvements in 2023 by reducing conflicting rates, but the issue is not fully resolved.

### 2. "Zombie Rates" (Ghost Rates)

Some MRFs contain clinically implausible rates, meaning a provider is listed for services they have never billed for and likely never will. While transparency laws must ensure all contractually covered rates are disclosed, better data refinement strategies are needed to avoid unnecessary data bloat.

An example of this could be pediatricians listed with rates for hip replacement surgeries or hospitals listing rates for treatments they have never provided.

### 3. Barriers to accessing data

Many organizations lack the technical infrastructure to process the massive datasets contained in MRFs. Some insurance carriers submit multiple files for the same network with nearly identical data, creating redundancy and inflating file sizes.

**File Size Issues Across Payers:**

- **Elevance (Anthem)** have some files that exceed 1 terabyte when uncompressed and contain over 10 billion records per file when fully processed.
- **Aetna** files often range from several hundred gigabytes across many of their employer health plans.
- **United Healthcare** files, when uncompressed, are typically around 100 gigabytes.
- Some payers submit multiple MRFs for the same network, adding to unnecessary data duplication.

The sheer size and complexity of these files make it impossible for most organizations to access and analyze the data effectively without specialized technology.

### 4. Poor data retention policies

Many payers do not retain historical MRFs, making it impossible to verify past rates for billing disputes. Even if historical data is retained, changes in schema & structure are rarely documented.

These limited time windows can have very real consequences - reduced auditability, lack of accountability of payers & less negotiation leverage for care organizations.

At Payerset, we store all historical MRFs indefinitely, but this should be standard practice performed by the carriers posting these files. Arguably, this could even be centralized by CMS for single source access and better auditability.

### 5. The problem of "Percent of Charges" contracts

Many contracts express prices as a percentage of charges, rather than providing a fixed dollar amount. This makes it impossible to determine the real cost until after a procedure is billed, reducing price transparency.

A common scenario is a contract that states Procedure X is reimbursed at 75% of charges. However, without knowing the provider's billed charge, there is no way to estimate the cost. While hospital price transparency data helps bridge this gap, it does not cover all healthcare settings, making true price comparison more challenging.

### 6. Expiring file links and API rate limits

Many payers provide MRFs through public APIs, but these APIs have rate limitations that prevent full data downloads before links expire. Some payers even intentionally limit the amount of time current files are accessible when they are published with short download expiration windows.

We overcome this by deploying a distributed computing approach that downloads files in parallel before they expire. However, this should not be necessary.

## A step in the right direction: CMS Schema 2.0 for Transparency in Coverage (TiC)

A lot of exciting updates have happened over the past several months with one of those changes being a new FAQ related to "Schema 2.0" released by CMS.

Schema 2.0 sets out to solve some of the challenges with the initial implementation of the TiC Act. A few of the highlights we're excited about are much clearer direction on provider groupings to help reduce file sizes in many cases and increase usability, increased standardization with place of service and service codes, required Table of Contents, and more. [We dive deep in to these upcoming changes in a Q&A with our co-founder and CTO here.](/post/navigating-the-upcoming-changes-in-cms-schema-2-0-for-healthcare-price-transparency)

## Moving forward: A renewed commitment to healthcare price transparency

We have worked diligently for years to clean, transform, and simplify this data to help customers realize the intended value of these regulations. However, these challenges should not exist and they are not in the spirit of the law. The executive order earlier this year indicates a turning point. We now have the opportunity to accelerate progress, raise the standard for data quality, and ensure that price transparency delivers on its promise.

We are on a mission to:

- Democratize healthcare pricing.
- Make price transparency real, accessible & truly transparent as it should be.
- Work side by side with partners, customers & industry stakeholders to create a transparent, fair and equitable healthcare market.

Here's to 2025 and beyond!
