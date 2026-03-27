---
title: "November 2023: A Landmark Month in Health Plan Price Transparency"
description: "A look at the unprecedented growth in price transparency data during November 2023, including Elevance achieving zero corrupted files and United adding 200 billion rows of data."
date: 2023-11-18
author: "Joseph Tollison"
category: "Parsing Payer MRFs"
tags: []
readTime: "2 min read"
image: "/images/blog/november-2023-a-landmark-month-in-health-plan-price-transparency/hero.png"
---

November brought fascinating developments in the world of health plan price transparency.

## Unprecedented Growth in Data

This month, we witnessed more data than we've ever seen before. This wasn't just a marginal increase; we're talking about huge growth. The surge was due to improved compliance, leading to an increase of codes, plans, and an accumulation of hundreds of billions more rows of data.

## Notable Highlights: Elevance and United

A significant highlight was Elevance, a payer that has historically struggled with hundreds of corrupted Machine-Readable Files (MRFs). Impressively, they have now achieved a record of zero corrupted files. Meanwhile, United reported an increase of 200 billion rows in their data.

## Challenges Beyond the Surface

However, this growth spurt in data brings to light a concerning aspect. The essence of price transparency was envisioned to simplify understanding healthcare costs. Yet, the reality is quite the opposite. Organizations that didn't invest heavily in R&D, teams, and infrastructure a year ago to parse this complex and massive data have now officially fallen behind.

## Elevance and United: A Closer Look

As we mentioned before, every single file from Elevance was parsable without any signs of corruption, encompassing 10,105 distinct MRFs. Some individual Elevance files, even when compressed parquet, reached sizes as large as 150 GBs for a 4-field file. To put this in perspective, one such file can contain up to 30 billion rows from just one provider MRF.

On the other hand, United had only six files that were unparsable. Two were listed but unavailable, and the other four suffered corruption due to JSON errors, which were rectifiable through our processes.

## Our Mission and Commitment

Our proprietary Payer Parse technology easily handles these evolving challenges, including changes in schema and the significant increases in data volume.

At Payerset, our mission is to democratize price transparency data. We are committed to continually enhancing our data parsing and storage processes. This commitment is not just about technological advancement; it's about making this data more accessible and affordable. We aim to lower costs and extend these savings to our customers.

Let's harness the potential of this data for good.

Until our next parsing adventure!
