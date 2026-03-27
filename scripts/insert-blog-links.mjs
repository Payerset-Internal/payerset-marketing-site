#!/usr/bin/env node
/**
 * Insert hyperlinks from Wix blog posts into migrated markdown files.
 *
 * Reads the blog-links-manifest.json, matches anchor text in the markdown,
 * and wraps it with the appropriate markdown link syntax.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const BLOG_DIR = join(import.meta.dirname, '..', 'src', 'content', 'blog');
const MANIFEST = JSON.parse(readFileSync(join(import.meta.dirname, 'blog-links-manifest.json'), 'utf-8'));

// Links to skip — footer CTAs, self-referential, or fragmentary artifacts
const SKIP_TEXTS = new Set([
  'Learn More',
  'Request a demo',
  'Request your demo today',
  'See it in action',
  'Explore Rate Explorer',
  'Payerset on Snowflake',
  'https://www.payerset.com/',
]);

const SKIP_HREFS_PATTERNS = [
  /^https?:\/\/(www\.)?payerset\.com\/?$/,  // bare payerset.com
  /^https?:\/\/(www\.)?payerset\.com\/get-started/,  // get-started CTA
];

// Internal URL remapping: rewrite payerset.com/post/... to /post/...
function remapHref(href) {
  // Internal blog cross-links
  if (href.startsWith('https://www.payerset.com/post/')) {
    return href.replace('https://www.payerset.com/post/', '/post/');
  }
  if (href.startsWith('https://www.payerset.com/')) {
    return href.replace('https://www.payerset.com/', '/');
  }
  // Strip tracking params from docs links
  if (href.includes('docs.payerset.com') && href.includes('?')) {
    return href.split('?')[0];
  }
  // Strip utm params from payerset links
  if (href.includes('payerset.com') && href.includes('utm_')) {
    const url = new URL(href);
    url.searchParams.delete('utm_source');
    url.searchParams.delete('utm_medium');
    url.searchParams.delete('utm_campaign');
    url.searchParams.delete('_gl');
    const cleaned = url.toString();
    // If it's now just payerset.com/, skip it
    if (/^https?:\/\/(www\.)?payerset\.com\/?$/.test(cleaned)) return null;
    return cleaned;
  }
  return href;
}

function shouldSkipLink(link) {
  if (SKIP_TEXTS.has(link.text.trim())) return true;
  if (link.text.trim().length <= 1) return true; // Single char artifacts like "y" or ","
  for (const pattern of SKIP_HREFS_PATTERNS) {
    if (pattern.test(link.href)) return true;
  }
  // Skip footer links (context contains "footer")
  if (link.contextAfter && link.contextAfter.includes('<footer')) return true;
  return false;
}

// Escape special regex characters in a string
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

let totalInserted = 0;
let totalSkipped = 0;
let totalNotFound = 0;
const report = [];

for (const [slug, data] of Object.entries(MANIFEST)) {
  if (!data.links || data.links.length === 0) continue;

  const mdPath = join(BLOG_DIR, `${slug}.md`);
  let content;
  try {
    content = readFileSync(mdPath, 'utf-8');
  } catch {
    console.error(`  ✗ File not found: ${slug}.md`);
    continue;
  }

  const postReport = { slug, inserted: [], skipped: [], notFound: [] };

  // Deduplicate links with same text and href
  const seen = new Set();
  const uniqueLinks = data.links.filter(link => {
    const key = `${link.text}|||${link.href}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Process links longest-text-first to avoid partial matches
  const sortedLinks = uniqueLinks.sort((a, b) => b.text.length - a.text.length);

  for (const link of sortedLinks) {
    if (shouldSkipLink(link)) {
      postReport.skipped.push(`"${link.text}" -> ${link.href}`);
      totalSkipped++;
      continue;
    }

    const href = remapHref(link.href);
    if (!href) {
      postReport.skipped.push(`"${link.text}" -> ${link.href} (remapped to null)`);
      totalSkipped++;
      continue;
    }

    const text = link.text.trim();

    // Check if this text is already linked in the markdown
    const alreadyLinkedRegex = new RegExp(`\\[${escapeRegex(text)}\\]\\(`);
    if (alreadyLinkedRegex.test(content)) {
      postReport.skipped.push(`"${text}" (already linked)`);
      totalSkipped++;
      continue;
    }

    // Try to find the exact anchor text in the markdown
    // Must not already be inside a markdown link
    const textRegex = new RegExp(`(?<!\\[)${escapeRegex(text)}(?!\\]\\()`, 'g');

    let matchCount = 0;
    let matchIndex = -1;
    let match;
    while ((match = textRegex.exec(content)) !== null) {
      // Make sure we're not inside a markdown link already
      const before = content.substring(Math.max(0, match.index - 5), match.index);
      if (!before.includes('[')) {
        matchCount++;
        matchIndex = match.index;
      }
    }

    if (matchCount === 0) {
      // Try a more flexible match — the text might have slightly different formatting
      // Try with HTML entities decoded
      const decodedText = text.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
      if (decodedText !== text) {
        const decodedRegex = new RegExp(`(?<!\\[)${escapeRegex(decodedText)}(?!\\]\\()`, 'g');
        while ((match = decodedRegex.exec(content)) !== null) {
          matchCount++;
          matchIndex = match.index;
        }
        if (matchCount === 1) {
          content = content.substring(0, matchIndex) + `[${decodedText}](${href})` + content.substring(matchIndex + decodedText.length);
          postReport.inserted.push(`"${decodedText}" -> ${href}`);
          totalInserted++;
          continue;
        }
      }
      postReport.notFound.push(`"${text}" -> ${href}`);
      totalNotFound++;
      continue;
    }

    if (matchCount === 1) {
      // Unique match — safe to replace
      content = content.substring(0, matchIndex) + `[${text}](${href})` + content.substring(matchIndex + text.length);
      postReport.inserted.push(`"${text}" -> ${href}`);
      totalInserted++;
    } else {
      // Multiple matches — use context to disambiguate
      const contextBefore = link.contextBefore ? link.contextBefore.replace(/^\.\.\./, '').trim() : '';
      const contextAfter = link.contextAfter ? link.contextAfter.replace(/^\.\.\./, '').replace(/<footer.*$/, '').trim() : '';

      // Extract a short unique phrase from context
      const contextSnippet = contextBefore.slice(-40);

      let found = false;
      const regex2 = new RegExp(escapeRegex(text), 'g');
      while ((match = regex2.exec(content)) !== null) {
        const surroundingBefore = content.substring(Math.max(0, match.index - 100), match.index);
        // Check if the context matches
        if (contextSnippet && surroundingBefore.includes(contextSnippet.slice(-20))) {
          content = content.substring(0, match.index) + `[${text}](${href})` + content.substring(match.index + text.length);
          postReport.inserted.push(`"${text}" -> ${href} (context-matched)`);
          totalInserted++;
          found = true;
          break;
        }
      }
      if (!found) {
        // Fall back to first occurrence
        const firstMatch = content.indexOf(text);
        if (firstMatch >= 0) {
          // Check it's not already linked
          const before5 = content.substring(Math.max(0, firstMatch - 2), firstMatch);
          if (!before5.includes('[')) {
            content = content.substring(0, firstMatch) + `[${text}](${href})` + content.substring(firstMatch + text.length);
            postReport.inserted.push(`"${text}" -> ${href} (first-occurrence fallback)`);
            totalInserted++;
          } else {
            postReport.notFound.push(`"${text}" -> ${href} (all occurrences already linked)`);
            totalNotFound++;
          }
        } else {
          postReport.notFound.push(`"${text}" -> ${href} (multi-match, no context match)`);
          totalNotFound++;
        }
      }
    }
  }

  writeFileSync(mdPath, content, 'utf-8');
  report.push(postReport);
}

// Print report
console.log('\n========================================');
console.log('Blog Links Insertion Report');
console.log('========================================\n');
console.log(`Total inserted: ${totalInserted}`);
console.log(`Total skipped:  ${totalSkipped}`);
console.log(`Total not found: ${totalNotFound}`);
console.log('');

for (const r of report) {
  if (r.inserted.length === 0 && r.notFound.length === 0) continue;
  console.log(`\n--- ${r.slug} ---`);
  if (r.inserted.length > 0) {
    console.log(`  ✓ Inserted (${r.inserted.length}):`);
    r.inserted.forEach(l => console.log(`    ${l}`));
  }
  if (r.skipped.length > 0) {
    console.log(`  ⊘ Skipped (${r.skipped.length}):`);
    r.skipped.forEach(l => console.log(`    ${l}`));
  }
  if (r.notFound.length > 0) {
    console.log(`  ✗ Not found (${r.notFound.length}):`);
    r.notFound.forEach(l => console.log(`    ${l}`));
  }
}
