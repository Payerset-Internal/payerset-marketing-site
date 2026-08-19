---
title: "Gaining Leverage by Uncovering Contract Structures"
description: "A single negotiated base rate can price most of a hospital's inpatient DRG grid. Here is how to back into it from price transparency data—and turn it into negotiation leverage."
date: 2026-08-18T12:00:00
author: "Matt Phillips, Mac Howard & Andrew Gordon"
tags: ["price transparency", "contract negotiation", "DRG", "base rate", "reimbursement benchmarking"]
readTime: "6 min read"
topics: ["analysis", "playbook"]
featured: true
image: "/images/blog/gaining-leverage-uncovering-contract-structures/hero.jpg"
cardImage: "/images/blog/gaining-leverage-uncovering-contract-structures/hero.jpg"
statNumber: "94%"
statLabel: "of a hospital's DRG grid priced off a single negotiated base rate"
seriesLabel: "Series · Part 1"
---

Data analysts and contracting experts understand price transparency data from opposite ends. Data teams can sift through the numbers fluently, but they don't live inside the contracts. Managed care veterans know the contract language cold but are not data analytics experts. Getting the most value out of price transparency data sits in the overlap, where a reader can pull contract logic straight out of the published data. Part one of a series on pulling contract structure out of price transparency data, starting with the inpatient DRG base rate.

## Thousands of prices. Is each one really negotiated?

There are tens of thousands of billable codes in play, and working through them one at a time is not a practical use of either side's time. Both sides tend to agree instead on a structure: a small number of negotiated figures that generate thousands of published prices. Three common structures show up time and again:

1. Inpatient DRG base rate
2. Clinical Laboratory Fee Schedule (CLFS) multiplier
3. Outpatient surgical groupers

Let's start by breaking down the base rate. We'll concentrate on hospital services, specifically inpatient care, but the principles apply more broadly.

<table class="tp-glossary">
  <thead>
    <tr><th colspan="2">Terminology</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>Diagnosis-related group (DRG)</td>
      <td>The code that describes an entire inpatient stay. Rather than pricing each service delivered during an admission, hospital inpatient billing rolls the whole stay into one MS-DRG that reflects the diagnosis, the major procedure, and whether complications were present. There are roughly 770 in the current CMS list.</td>
    </tr>
    <tr>
      <td>DRG weight</td>
      <td>A number CMS assigns to each MS-DRG reflecting the resources a stay is expected to consume relative to other stays. A stay weighted 2.0 is expected to take roughly twice the resources of a stay weighted 1.0. Published annually in Table 5 of the inpatient prospective payment system final rule and identical for every hospital.</td>
    </tr>
    <tr>
      <td>Base rate</td>
      <td>A single negotiated dollar amount that large portions of published rates are built off of. Payment is the base rate multiplied by the DRG weight, so a published rate divided by its weight backs into the base rate.</td>
    </tr>
    <tr>
      <td>Case rate</td>
      <td>One payment covering an entire episode rather than each line item on the claim. An inpatient DRG payment is a case rate that scales with the weight, which is what distinguishes it from a flat rate.</td>
    </tr>
    <tr>
      <td>Carve-out</td>
      <td>A service pulled out of the base rate grid and priced on its own terms, such as a transplant, a burn admission, or a specific set of orthopedic procedures.</td>
    </tr>
  </tbody>
</table>

## What a DRG prices

For each MS-DRG, CMS assigns a relative weight to the code. Each fiscal year, CMS republishes the full list in Table 5 of the Inpatient Prospective Payment System final rule, which anyone can download directly from CMS. The weight is not a price and not a score on a fixed scale. It states expected resource use relative to other stays, so a stay weighted 2.0 is expected to consume roughly twice what a stay weighted 1.0 consumes. The same procedure appears at several weights depending on severity, which is what the abbreviations in a DRG title record. A major complication or comorbidity (MCC) carries the highest weight, a complication or comorbidity (CC) carries a lower one, and a stay without either carries the lowest. Spinal fusion runs across all three.

The weights are public, and they are the same for every hospital in the country. Medicare applies locality adjustments to the payment, after the weight, not to the weight itself. So when a commercial contract is built on these weights, payments may differ, but benchmarking becomes a practical exercise.

## The base rate behind published prices

Because the weights are fixed and public, oftentimes much of the published rates can be traced back to one number. The payer and the hospital agree on a base rate across a bucket of DRGs, and within that bucket each price follows from it: **published rate equals the base rate multiplied by the DRG weight.**

That one figure can price a lot of the inpatient grid. A hospital with a $22,568 base rate collects $22,568 for a stay weighted 1.0, about $45,000 for a stay weighted 2.0, and about $479,000 for a stay weighted 21.2. Rather than settling hundreds of prices one at a time, both sides settle the base rate and the published weights do the rest.

How a payer arrives at a particular base rate reflects the hospital's service mix, claims volume, and whatever has happened for potentially decades at the negotiation table. The current number is an adjustment to one that has been carried forward through contract cycles for years.

Why does this matter? Price transparency data has *a lot* of information. Hospital A vs. Hospital B's prices will always differ. But where the specific areas for leverage in benchmarking sit is what matters. Breaking down the variations into rates tied to a single base rate, and then additional potential leverage points that sit outside this structure, can help focus a negotiation strategy.

## An example of base rates in transparency data

Let's walk through a real example. Take a large general acute care hospital in Chicago and one payer: Aetna. To hold the comparison steady, we'll anchor to a single Aetna PPO plan, since different plans under the same payer can carry different negotiated terms even at the same facility. If we pull their rates and look at a handful of DRGs, no major surprises. Each of these reads as its own negotiated number. Nothing in the file tells you whether it was priced on its own or actually maps back to a consistent, underlying structure—a single base rate.

| MS-DRG | Description | Negotiated Rate |
| :----- | :---------- | --------------: |
| 470 | Major hip and knee joint replacement or reattachment of lower extremity without MCC | $33,775 |
| 871 | Septicemia or severe sepsis without MV >96 hours with MCC | $34,013.20 |
| 291 | Heart Failure & Shock w MCC | $22,479.30 |
| 193 | Simple pneumonia and pleurisy with MCC | $23,015.10 |

To find out, we can map each of these published rates and billing codes to their CMS relative weight. We can then divide each published rate by the DRG's CMS relative weight:

| MS-DRG | Negotiated Rate | CMS Weight | Implied Base Rate |
| :----- | --------------: | ---------: | ----------------: |
| 470 | $33,775 | 1.9289 | $17,510 |
| 871 | $34,013.20 | 1.9425 | $17,510 |
| 291 | $22,479.30 | 1.2838 | $17,510 |
| 193 | $23,015.10 | 1.3144 | $17,510 |

Looking at those same common four DRGs, each one maps to the same underlying $17,510 base rate. In fact, zoom out to the hospital's full DRG list for this plan: **94%** of all published rates divide back to that same base rate. We can now better identify which portions of our competitors' published rates fall into the base rate structure, and the remaining percentage (6% of rates in this case) are potential additional leverage points that you can use in your strategy. Oftentimes, high-cost procedures like transplants are carved out, and you will see those as different structures or in potentially different areas of the files altogether.

Breaking a competitor's files down like this can help remove a lot of the noise in these large files, so you can focus on the areas that require deeper investigation and probably warrant it. We ran this same analysis for a peer academic institution within the same city and the pattern applied almost identically. **Hospital B's implied base rate was $22,675 compared to Hospital A's $17,510, a leverage point in and of itself.**

## Summary

It goes without saying, but it's worth reiterating: contracts are complex, and they are unique to every payer-provider relationship. Complexity grows over decades alongside ever-changing policies. This concept is one of many that allows you to combine your real-world experience in contracting and managed care with the insights available through price transparency data. Removing noise is step one. This will really uncover a new level of insights versus cherry-picking codes or wading through a lot of noise, which we know exists in these files.

In part two, we'll look at more contract structures and how they show up in the transparency data as well.
