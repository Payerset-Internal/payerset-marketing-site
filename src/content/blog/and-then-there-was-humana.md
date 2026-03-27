---
title: "And Then There Was Humana..."
description: "An exploration of the unique challenges Humana presents for healthcare price transparency data access, from nearly 12 million individual files to API rate limiting and processing hurdles."
date: 2023-05-27
updatedDate: 2023-10-22
author: "Joseph Tollison"
category: "Parsing Payer MRFs"
tags: []
readTime: "3 min read"
image: "/images/blog/and-then-there-was-humana/hero.jpg"
---

As the quest for price transparency in the healthcare industry continues, as we've discussed before on the blog, there are some insurance companies that fall short in providing open access to their price transparency data. A notable case is Humana, a giant in the health insurance sector. Humana presents its own unique set of challenges when it comes to accessing its price transparency files, hindering efforts for data extraction and analysis. In this blog post, we will delve into the intricate hurdles Humana sets up, thwarting web scraping technologies, and consequently, obstructing data accessibility for consumers and other stakeholders.

## 12... Million... Files

Yep, that's right. Humana has provided its price transparency data in the form of nearly 12 million files that can be downloaded from its website. At first glance, this may not seem like that big of a deal, after all, can't computers process millions of files really quickly?

Well, in some cases yes, but in most cases, especially when dealing with even relatively small JSON files, the challenges to parsing that data file up fast. Consider each file taking 2 minutes to process and store. That's 12,000,000 minutes = 400,000 hours -- that's over 44 years. Not super convenient or helpful, in my opinion.

Now of course, computers can process more than one file at a time, but there are conditions that have to be met for that to happen. Without getting too much into the weeds of RAM and compute requirements, each compressed file is ~5 megabytes, uncompressed they range between 30 and 50MB. Most modern PCs have at least 8GB of RAM, so that would equate to processing ~200 files at a time if you were doing nothing else with the computer. Great, we're down to 2,000 hours, or 83 days. **But the files are updated monthly, so by the time you finish, you're already 2 months behind!**

This is where we start getting into needing large amounts of RAM and compute to process these files in a reasonable amount of time. Cloud to the rescue! Amazon, Microsoft, and Google (among others like Vultr and Liquid Web) rent high-powered computers by the hour, so we can effectively use these computers to process our code. This gets expensive quickly - the servers that Payerset uses to process the Humana data cost over $7/hour and it still takes a few days running continuously, so it's not cheap.

But processing power isn't the only complication...

## Yet Another Web Scraping Challenge

### API Rate Limiting

Humana utilizes rate limiting on their developer API, a technique that has many valid reasons for existing, not the least of which is to prevent attacks on systems, but one that also slows down web scraping ventures. This means restricting the number of requests a user can send within a defined period, thereby slowing the pace of data extraction or even bringing it to a standstill. With nearly 12 million files to parse through, rate limiting significantly inflates the time needed to obtain this vast amount of data, presenting a pretty big challenge.

## The Impact on Data Accessibility

Humana's use of these mechanisms to foil web scraping and data processing efforts has severe implications on data accessibility for consumers and other stakeholders. By creating hurdles to download their price transparency files, **Humana effectively renders this information inaccessible for virtually all users.**

While it may be unintentional, this lack of data accessibility goes against the spirit of data transparency laws which are designed to empower consumers to make informed healthcare decisions and stimulate competition in the industry. Without the ease of access to price transparency data, consumers are left navigating in obscurity, unable to compare costs and make knowledgeable choices regarding their healthcare.

This is why we started Payerset - to make this data easier to access for everyone with the hope of reducing the cost of healthcare in the US.
