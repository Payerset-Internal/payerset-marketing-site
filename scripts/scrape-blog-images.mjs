#!/usr/bin/env node
/**
 * Scrapes hero images from all Wix blog posts and downloads them.
 * Usage: node scripts/scrape-blog-images.mjs
 */

import { readdir, mkdir, writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const BLOG_DIR = 'src/content/blog';
const OUTPUT_DIR = 'public/images/blog';
const BASE_URL = 'https://www.payerset.com/post';
const MANIFEST_PATH = 'scripts/blog-images-manifest.json';

async function getSlugs() {
  const files = await readdir(BLOG_DIR);
  return files
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''));
}

function extractWixImageUrls(html) {
  // Match wixstatic.com image URLs in img tags
  const imgRegex = /<img[^>]*src="(https:\/\/static\.wixstatic\.com\/media\/[^"]+)"[^>]*alt="([^"]*)"[^>]*>/gi;
  const images = [];
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    const url = match[1];
    const alt = match[2] || '';

    // Skip tiny icons (podcast, social, avatars) by checking URL for small fill dimensions
    const fillMatch = url.match(/fill\/w_(\d+),h_(\d+)/);
    if (fillMatch) {
      const w = parseInt(fillMatch[1]);
      const h = parseInt(fillMatch[2]);
      // Skip images smaller than 100px wide (icons, avatars, etc.)
      if (w < 100) continue;
    }

    images.push({ url, alt });
  }

  return images;
}

function getHighResUrl(wixUrl) {
  // Extract the base media path and construct a high-res URL
  // Original: .../fill/w_561,h_381,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/filename.png
  // High-res: .../fill/w_1200,h_auto,al_c,q_90,enc_auto/filename.png

  // Get the base URL up to /v1/
  const v1Index = wixUrl.indexOf('/v1/');
  if (v1Index === -1) return wixUrl;

  const baseUrl = wixUrl.substring(0, v1Index);

  // Get the filename at the end
  const parts = wixUrl.split('/');
  const filename = parts[parts.length - 1];

  // Check if there's a crop directive
  const cropMatch = wixUrl.match(/\/v1\/(crop\/[^/]+)\//);
  const cropPart = cropMatch ? cropMatch[1] + '/' : '';

  // Construct high-res URL
  return `${baseUrl}/v1/${cropPart}fill/w_1200,h_1200,al_c,q_90,enc_auto/${filename}`;
}

function getExtension(url) {
  const filename = url.split('/').pop();
  if (filename.match(/\.png/i)) return 'png';
  if (filename.match(/\.jpg|\.jpeg/i)) return 'jpg';
  if (filename.match(/\.webp/i)) return 'webp';
  if (filename.match(/\.gif/i)) return 'gif';
  // Check the URL path for format hints
  if (url.includes('.png')) return 'png';
  if (url.includes('.jpg') || url.includes('.jpeg')) return 'jpg';
  return 'png'; // default
}

async function scrapePost(slug) {
  const url = `${BASE_URL}/${slug}`;
  console.log(`  Fetching: ${slug}...`);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      console.log(`    WARN: HTTP ${response.status} for ${slug}`);
      return null;
    }

    const html = await response.text();
    const images = extractWixImageUrls(html);

    if (images.length === 0) {
      console.log(`    No content images found`);
      return null;
    }

    // First large image is the hero
    const heroImage = images[0];
    const inlineImages = images.slice(1);

    // Create output directory
    const outDir = join(OUTPUT_DIR, slug);
    if (!existsSync(outDir)) {
      await mkdir(outDir, { recursive: true });
    }

    // Download hero image
    const heroExt = getExtension(heroImage.url);
    const heroHighRes = getHighResUrl(heroImage.url);
    const heroPath = join(outDir, `hero.${heroExt}`);

    try {
      execSync(`curl -sL -o "${heroPath}" "${heroHighRes}"`, { timeout: 15000 });
      const stats = execSync(`wc -c < "${heroPath}"`).toString().trim();
      const bytes = parseInt(stats);
      if (bytes < 100) {
        // Try original URL if high-res failed
        execSync(`curl -sL -o "${heroPath}" "${heroImage.url}"`, { timeout: 15000 });
      }
      console.log(`    Hero: hero.${heroExt} (${heroImage.alt.substring(0, 50)})`);
    } catch (e) {
      console.log(`    ERROR downloading hero: ${e.message}`);
    }

    // Download inline images
    const inlineResults = [];
    for (let i = 0; i < inlineImages.length; i++) {
      const img = inlineImages[i];
      const ext = getExtension(img.url);
      const highRes = getHighResUrl(img.url);
      const path = join(outDir, `inline-${i + 1}.${ext}`);

      try {
        execSync(`curl -sL -o "${path}" "${highRes}"`, { timeout: 15000 });
        const stats = execSync(`wc -c < "${path}"`).toString().trim();
        const bytes = parseInt(stats);
        if (bytes < 100) {
          execSync(`curl -sL -o "${path}" "${img.url}"`, { timeout: 15000 });
        }
        console.log(`    Inline ${i + 1}: inline-${i + 1}.${ext} (${img.alt.substring(0, 50)})`);
        inlineResults.push({
          filename: `inline-${i + 1}.${ext}`,
          alt: img.alt,
          originalUrl: img.url
        });
      } catch (e) {
        console.log(`    ERROR downloading inline ${i + 1}: ${e.message}`);
      }
    }

    return {
      slug,
      hero: {
        filename: `hero.${heroExt}`,
        alt: heroImage.alt,
        originalUrl: heroImage.url,
        path: `/images/blog/${slug}/hero.${heroExt}`
      },
      inline: inlineResults,
      totalImages: 1 + inlineResults.length
    };
  } catch (e) {
    console.log(`    ERROR: ${e.message}`);
    return null;
  }
}

async function main() {
  console.log('Blog Image Scraper');
  console.log('==================\n');

  const slugs = await getSlugs();
  console.log(`Found ${slugs.length} blog posts\n`);

  const manifest = {};
  let successCount = 0;
  let failCount = 0;

  for (const slug of slugs) {
    const result = await scrapePost(slug);
    if (result) {
      manifest[slug] = result;
      successCount++;
    } else {
      failCount++;
    }
  }

  // Save manifest
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  console.log(`\n==================`);
  console.log(`Done! ${successCount} posts with images, ${failCount} without`);
  console.log(`Manifest saved to ${MANIFEST_PATH}`);
}

main().catch(console.error);
