import { readdirSync, writeFileSync } from "fs";
import https from "https";
import http from "http";

const BLOG_DIR =
  "/Users/mattphillips/projects/payerset-site/src/content/blog/";
const OUTPUT_PATH =
  "/Users/mattphillips/projects/payerset-site/scripts/blog-links-manifest.json";
const BASE_URL = "https://www.payerset.com/post/";
const CONCURRENCY = 5;
const DELAY_MS = 500; // polite delay between batches

// ── helpers ──────────────────────────────────────────────────────────────────

function fetchUrl(url, redirects = 0) {
  if (redirects > 5) return Promise.reject(new Error("Too many redirects"));
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    mod
      .get(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; PayersetLinkScraper/1.0)" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchUrl(res.headers.location, redirects + 1).then(resolve).catch(reject);
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

function stripHtmlTags(html) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Domains / patterns to filter out
function shouldExcludeLink(href, text) {
  if (!href || href === "#") return true;
  if (href.startsWith("#")) return true;
  if (/wix\.com|wixsite/i.test(href)) return true;
  // Social share links
  if (/facebook\.com\/sharer|twitter\.com\/intent|linkedin\.com\/shareArticle/i.test(href)) return true;
  return false;
}

// ── main ─────────────────────────────────────────────────────────────────────

async function scrapePost(slug) {
  const url = BASE_URL + slug;
  const html = await fetchUrl(url);

  // Find the post-description section (article body)
  const descStart = html.indexOf('data-hook="post-description"');
  const footerStart = html.indexOf('data-hook="post-footer"');

  if (descStart < 0 || footerStart < 0 || footerStart <= descStart) {
    return { slug, links: [], error: "Could not locate post body section" };
  }

  const bodyHtml = html.substring(descStart, footerStart);

  // Extract plain text for context (strip all tags)
  const bodyText = stripHtmlTags(bodyHtml);

  // Find all <a> tags with href in the body section
  const linkRegex = /<a\s[^>]*?href="([^"]*?)"[^>]*?>([\s\S]*?)<\/a>/gi;
  const links = [];
  let match;

  while ((match = linkRegex.exec(bodyHtml)) !== null) {
    const href = match[1];
    const anchorHtml = match[2];
    const text = stripHtmlTags(anchorHtml);

    if (shouldExcludeLink(href, text)) continue;

    // Find context: locate the anchor text in the plain body text
    const CONTEXT_LEN = 100;
    const textIdx = bodyText.indexOf(text);
    let contextBefore = "";
    let contextAfter = "";

    if (textIdx >= 0) {
      const beforeStart = Math.max(0, textIdx - CONTEXT_LEN);
      contextBefore = bodyText.substring(beforeStart, textIdx).trim();
      if (beforeStart > 0) contextBefore = "..." + contextBefore;

      const afterEnd = Math.min(bodyText.length, textIdx + text.length + CONTEXT_LEN);
      contextAfter = bodyText.substring(textIdx + text.length, afterEnd).trim();
      if (afterEnd < bodyText.length) contextAfter = contextAfter + "...";
    }

    links.push({
      href: href.replace(/&amp;/g, "&"),
      text,
      contextBefore,
      contextAfter,
    });
  }

  return { slug, links };
}

async function main() {
  const slugs = readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .sort();

  console.log(`Found ${slugs.length} blog slugs to scrape.\n`);

  const manifest = {};
  let totalLinks = 0;
  let postsWithLinks = 0;
  let errors = 0;

  // Process in batches for politeness
  for (let i = 0; i < slugs.length; i += CONCURRENCY) {
    const batch = slugs.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      batch.map(async (slug) => {
        try {
          return await scrapePost(slug);
        } catch (err) {
          console.error(`  ERROR: ${slug}: ${err.message}`);
          return { slug, links: [], error: err.message };
        }
      })
    );

    for (const result of results) {
      manifest[result.slug] = { links: result.links };
      if (result.error) {
        manifest[result.slug].error = result.error;
        errors++;
      }
      if (result.links.length > 0) {
        postsWithLinks++;
        totalLinks += result.links.length;
      }
      const status = result.error
        ? `ERROR`
        : result.links.length > 0
          ? `${result.links.length} links`
          : `0 links`;
      console.log(`  [${i + results.indexOf(result) + 1}/${slugs.length}] ${result.slug}: ${status}`);
    }

    if (i + CONCURRENCY < slugs.length) {
      await sleep(DELAY_MS);
    }
  }

  // Write manifest
  writeFileSync(OUTPUT_PATH, JSON.stringify(manifest, null, 2), "utf8");

  console.log(`\n${"=".repeat(60)}`);
  console.log(`SUMMARY`);
  console.log(`${"=".repeat(60)}`);
  console.log(`Total posts scraped:    ${slugs.length}`);
  console.log(`Posts with links:       ${postsWithLinks}`);
  console.log(`Posts without links:    ${slugs.length - postsWithLinks - errors}`);
  console.log(`Total links found:      ${totalLinks}`);
  console.log(`Errors:                 ${errors}`);
  console.log(`\nManifest written to: ${OUTPUT_PATH}`);

  // Print sample data for posts with most links
  const sorted = Object.entries(manifest)
    .filter(([, v]) => v.links.length > 0)
    .sort((a, b) => b[1].links.length - a[1].links.length);

  console.log(`\n${"─".repeat(60)}`);
  console.log(`SAMPLE: Top posts by link count`);
  console.log(`${"─".repeat(60)}`);
  for (const [slug, data] of sorted.slice(0, 3)) {
    console.log(`\n>> ${slug} (${data.links.length} links):`);
    for (const link of data.links) {
      console.log(`   href: ${link.href}`);
      console.log(`   text: "${link.text}"`);
      console.log(`   context: ...${link.contextBefore.slice(-50)} [LINK] ${link.contextAfter.slice(0, 50)}...`);
      console.log();
    }
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
