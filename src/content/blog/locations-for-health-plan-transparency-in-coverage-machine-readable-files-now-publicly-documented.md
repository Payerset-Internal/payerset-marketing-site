---
title: "Locations for Health Plan Transparency in Coverage Machine Readable Files Now Publicly Documented"
description: "Payerset is now publicly documenting the location of all health plan Machine Readable Files (MRFs) to enhance transparency compliance and serve as a valuable public resource."
date: 2024-01-28
author: "Joseph Tollison"
category: "Parsing Payer MRFs"
tags: ["compliance"]
readTime: "1 min read"
image: "/images/blog/locations-for-health-plan-transparency-in-coverage-machine-readable-files-now-publicly-documented/hero.jpg"
---

Due to the Transparency in Coverage rules for health plans that began in July 2022, health insurance companies have been required to post their In-Network Rates for all covered items and services between the health plan and in-network providers. This includes both individual providers and organizations.

Payerset has addressed numerous challenges in parsing these files. We've removed duplications, filtered out irrelevant services (since payers list rates for a service and provider even if the provider would never perform that service), and selected relevant health plans, thereby reducing noise and size, and making the data more accessible and insightful. An example of such an irrelevant service could be orthopedic surgery rates listed for a drama therapist.

Another significant challenge, and the focus of this post, is the difficulty in locating the Machine Readable Files (MRFs) themselves. Often, they were not easily found or necessarily linked on the insurance companies' websites. To address this, we are now documenting the location of all MRFs in our public documentation at [docs.payerset.com](http://docs.payerset.com).

Our goal is to enhance transparency compliance, as some health insurance companies have been remiss in posting their MRFs. Additionally, we hope this will serve as a valuable public resource for anyone interested in health plan price transparency.

For regular updates and to access this vital information, check out our documentation with MRF locations.
