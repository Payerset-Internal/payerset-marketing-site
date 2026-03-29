---
title: "Transparency in Coverage (TiC) Schema 2.0 Is Live - Updates"
description: "February 2nd, 2026 marked the first enforcement deadline for TiC Schema 2.0. Here's what we're seeing on the ground with payer compliance and the new data fields."
date: 2026-02-05
author: "Matt Phillips"
category: "Industry Insights"
tags: ["price transparency", "transparency in coverage", "Schema 2.0"]
readTime: "3 min read"
image: "/images/blog/transparency-in-coverage-tic-schema-2-0-is-live-updates/hero.png"
---

February 2nd, 2026 marked the first enforcement deadline for Transparency in Coverage Schema 2.0, a significant change to how payer data is published and accessed. We've been parsing the latest MRFs and wanted to share what we're seeing on the ground.

We plan to update this post each quarter as payers continue adapting to the new requirements.

Schema 2.0 is the first step. [We recently did a deep dive in to proposed rules for 2027 and beyond.](/post/cms-proposes-major-updates-to-transparency-in-coverage-rules)

## Refresher: What's New in Schema 2.0

There are a lot of updates, but here are a few of the highlights:

**Network Name**
The common carrier network name most familiar to members and the public. No more filtering through dozens of internal plan names. BlueCard networks are now called out explicitly, which helps separate local contracted rates from BlueCard passthrough rates for benchmarking and negotiation.

![Network name in payer MRF](/images/blog/transparency-in-coverage-tic-schema-2-0-is-live-updates/network-name.png)

**Business Name**
The common business name associated with the EIN (Tax ID). Previously, business names were only tied to NPIs via NPPES. Now we can group rates by business name and Tax ID, making it easier to determine if a rate applies to, as an example, Hospital A, Hospital B, or a physician's private practice.

![Business organization name in payer MRF](/images/blog/transparency-in-coverage-tic-schema-2-0-is-live-updates/business-name.png)

**Plan Sponsor Name**
For employer plans, shows the plan sponsor's business name. Helpful for distinguishing employer-sponsored vs. commercial plans.

**Issuer Name**
More specific than before. For example, "UnitedHealthcare Florida" rather than just UnitedHealthcare.

**Setting**
Indicates whether the rate applies to inpatient, outpatient, or both (in addition to the existing billing class for facility fee and pro fee).

## What We're Actually Seeing with Compliance

We'll update this throughout the year and, as a reminder, [you can also view our public payer compliance scorecard.](https://docs.payerset.com/payers/)

### February 2026 Update

It's rare for the Transparency in Coverage schema to get a dramatic update like this. Payers are retrofitting their processes and systems to comply. It's inevitable that mistakes will happen but we're also seeing some payers aren't posting the new format at all.

**Payers not posting the new schema**

As of February 2nd (the official enforcement day for TiC 2.0), many State Blues and Cigna have not updated to the new schema. This creates a fragmented landscape where some payers are posting 2.0-compliant files while others remain on the original schema, requiring anyone working with this data to reconcile both formats.

For context, here's a screenshot showing the only Blues that are posting under the new 2.0 federal TiC rule:

![Overview of which payers are complying with Transparency in Coverage Schema 2.0](/images/blog/transparency-in-coverage-tic-schema-2-0-is-live-updates/compliance-overview.png)

**Erroneous machine-readable files (MRFs)**

UnitedHealthcare has published files with errors and typos. At Payerset, we don't blindly parse data according to the rules. We review how each payer is actually posting, then adjust our processes to handle the nuance and interpretation from payer to payer. This kind of manual remediation is necessary to ensure accuracy, but it takes additional time with such a monumental change.

**Material changes to data access methods**

Some payers have significantly changed how files are accessed. United, for example, has restructured their file access methods, requiring anyone ingesting this data to rebuild parts of their pipelines.

**Last-minute CMS updates**

At 9:52 AM on February 2nd, CMS was still updating their official schema documentation. When payers see last-minute updates, it can delay their internal processes too.

The bottom line: many payers are not currently compliant with federal law. This is a transitional period, and the industry is figuring it out in real time.

## What This Means for Anyone Working with MRF Data

If you're working with MRF data, expect some turbulence this quarter. The mix of 1.0 and 2.0 files, varying compliance levels, and payer-specific quirks means more data validation work.

Keep in mind this schema is new and everyone is figuring out compliance. This is a transitional period, but it's a transition toward better, more detailed information.

If you have questions about what you're seeing in the data or how to work with the new fields, reach out to us directly at [info@payerset.com](mailto:info@payerset.com). We're happy to help. [You can read our deeper guide to understand everything that's in Schema 2.0.](/post/transparency-in-coverage-schema-2-0)
