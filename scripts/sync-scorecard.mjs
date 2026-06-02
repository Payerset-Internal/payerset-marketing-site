// Payer Compliance Scorecard sync
// Pulls every payer page from the Payerset Documentation GitBook and writes
// structured records to src/data/payers.json for the /transparencyproject/scorecard page.
//
// Run with: npm run sync:scorecard   (= node --env-file=.env scripts/sync-scorecard.mjs)
// Requires GITBOOK_TOKEN in .env (a GitBook personal access token).
//
// Quarterly workflow: update the payer pages in GitBook, run this, commit src/data/payers.json.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const TOKEN = process.env.GITBOOK_TOKEN;
const SPACE = 'nHb9ExJ17VBEWyiaRHha'; // Payerset Documentation
const API = 'https://api.gitbook.com/v1';
const PUBLIC_BASE = 'https://docs.payerset.com';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'src/data/payers.json');

if (!TOKEN || TOKEN === 'paste_your_token_here') {
  console.error('Missing GITBOOK_TOKEN. Add it to .env in the project root.');
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(path) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(API + path, { headers: { Authorization: `Bearer ${TOKEN}` } });
    if (res.status === 429) {
      const wait = (attempt + 1) * 2000;
      console.warn(`  rate-limited, waiting ${wait}ms...`);
      await sleep(wait);
      continue;
    }
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${path}`);
    return res.json();
  }
  throw new Error('Too many retries for ' + path);
}

// ---------- text helpers ----------

function decode(s) {
  return s
    .replace(/&#x20;/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;|&#x26;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"');
}

function stripTags(s) {
  return decode(String(s).replace(/<[^>]+>/g, ''))
    .replace(/\\([_*#&])/g, '$1')
    // strip markdown emphasis markers but keep the inner text:
    //   **bold** / *italic* / _italic_  →  text
    // the word-boundary guards on _ leave identifiers like UNITED_HEALTHCARE intact.
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(?<![A-Za-z0-9])_([^_\n]+)_(?![A-Za-z0-9])/g, '$1')
    .replace(/(?<![A-Za-z0-9*])\*([^*\n]+)\*(?![A-Za-z0-9*])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function statusFromText(s) {
  if (/✔️|✅|✔/.test(s)) return 'yes';
  if (/❌|✗|🚫/.test(s)) return 'no';
  if (/🟡|🟠|:yellow_circle:|:orange_circle:/.test(s)) return 'partial';
  return 'unknown';
}

// ---------- section parsing ----------

function getSection(md, heading) {
  const re = new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([\\s\\S]*?)(?=\\n#{2,3} |$)');
  const m = md.match(re);
  return m ? m[1] : '';
}

function parseAlerts(md) {
  const alerts = [];
  const re = /\{%\s*hint style="(\w+)"\s*%\}([\s\S]*?)\{%\s*endhint\s*%\}/g;
  let m;
  while ((m = re.exec(md))) alerts.push({ severity: m[1], text: stripTags(m[2]) });
  return alerts;
}

function parseOverall(md) {
  const region = getSection(md, '### Compliance Scorecard').split('<table')[0];
  // Parse only the "Overall Rating:" line so a dated heading (e.g. "Scorecard - September 2024")
  // or other surrounding text can't leak into the label.
  const lineMatch = region.match(/Overall Rating:[^\n]*/);
  const line = lineMatch ? lineMatch[0] : region;
  const color = (line.match(/color:(\w+)/) || [])[1] || null;
  // strip markdown bold (**) too — some scores render as "1**/5**" which would block the X/5 match
  const text = stripTags(line).replace(/Overall Rating:/i, '').replace(/\*/g, '').trim();
  const score = text.match(/(\d+)\s*\/\s*(\d+)/);
  let label = null;
  if (score) {
    const after = text.slice(score.index + score[0].length);
    const m = after.match(/-\s*(.+?)\s*$/);
    label = m ? m[1] : null;
  } else if (text) {
    label = text; // status labels like "WIP" / "Under Review"
  }
  if (label) label = label.replace(/\*/g, '').trim() || null;
  return {
    score: score ? Number(score[1]) : null,
    max: score ? Number(score[2]) : 5,
    label,
    color,
  };
}

function parseCriteria(td) {
  let html = td.replace(/<ul>\s*<li>\s*\d+\s*Stars[\s\S]*?<\/ul>/gi, '');
  const items = [];
  let m;
  const re = /<li>([\s\S]*?)<\/li>/g;
  while ((m = re.exec(html))) {
    const chunk = m[1];
    let status = 'neutral';
    if (/color:red/.test(chunk)) status = 'fail';
    else if (/color:green/.test(chunk)) status = 'pass';
    const text = stripTags(chunk);
    if (text) items.push({ text, status });
  }
  return items;
}

function parseCategories(md) {
  const table = (md.match(/<table data-view="cards">([\s\S]*?)<\/table>/) || [])[1];
  if (!table) return [];
  const tbody = (table.match(/<tbody>([\s\S]*?)<\/tbody>/) || [])[1] || table;
  const rows = [...tbody.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((r) => r[1]);
  const cats = [];
  for (const row of rows) {
    const tds = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((t) => t[1]);
    if (tds.length < 3) continue;
    const name = stripTags(tds[0]);
    if (!name) continue;
    const stars = (tds[1].match(/★/g) || []).length;
    const scoreM = stripTags(tds[2]).match(/(\d+)\s*\/\s*(\d+)/);
    const color = (tds[2].match(/color:(\w+)/) || [])[1] || null;
    cats.push({
      name,
      stars,
      score: scoreM ? Number(scoreM[1]) : null,
      max: scoreM ? Number(scoreM[2]) : 5,
      color,
      criteria: tds[3] ? parseCriteria(tds[3]) : [],
    });
  }
  return cats;
}

function parseNumber(md, label) {
  const re = new RegExp('\\|\\s*' + label + '\\s*\\|\\s*([\\d,]+)\\s*\\|', 'i');
  const m = md.match(re);
  return m ? Number(m[1].replace(/,/g, '')) : null;
}

function parseValidation(md) {
  return {
    providers: parseNumber(md, 'Providers'),
    rates: parseNumber(md, 'Rates'),
    bundledCodes: parseNumber(md, 'Bundled Codes'),
    coveredServicesCapitation: parseNumber(md, 'Covered Services \\(Capitation\\)'),
  };
}

function parseObservations(md) {
  const section = getSection(md, '### Additional Observations');
  const observations = [];
  const lines = section.split('\n');
  for (const raw of lines) {
    const line = raw.trim();
    const bullet = line.match(/^[*-]\s+\*\*(.+?)\*\*\s*(.*)$/);
    if (bullet) {
      const boldText = bullet[1];
      const rest = bullet[2] || '';
      const colonIdx = boldText.indexOf(':');
      const label = stripTags(colonIdx >= 0 ? boldText.slice(0, colonIdx) : boldText);
      const inline = colonIdx >= 0 ? boldText.slice(colonIdx + 1) : '';
      const fullLine = decode(boldText + ' ' + rest);
      observations.push({ label, status: statusFromText(fullLine), text: stripTags(inline + ' ' + rest) });
    }
  }
  let assessment = null;
  const am = section.match(/\*\*Overall Assessment:\*\*\s*([\s\S]*?)$/);
  if (am) assessment = stripTags(am[1].replace(/\\$/gm, ''));
  // an observation labelled exactly "Overall Assessment" is the assessment, not a flag
  const filtered = observations.filter((o) => !/^overall assessment$/i.test(o.label));
  return { observations: filtered, assessment };
}

function parseLinks(md) {
  const notes = getSection(md, '### Payerset Notes');
  const tocUrl = (notes.match(/https:\/\/mrf\.payerset\.com\/[^\s)\]]+/) || [])[0] || null;
  const subPlanLinks = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(notes))) {
    const url = m[2].replace(/\\/g, '');
    if (url.includes('mrf.payerset.com')) continue;
    subPlanLinks.push({ label: stripTags(m[1]), url });
  }
  return { tocUrl, subPlanLinks };
}

function parsePayer(page) {
  const md = page.markdown || '';
  const schemaM = md.match(/###\s*Schema:\s*([^\n]+)/);
  const overall = parseOverall(md);
  const categories = parseCategories(md);
  const validation = parseValidation(md);
  const { observations, assessment } = parseObservations(md);
  const { tocUrl, subPlanLinks } = parseLinks(md);
  const hasScorecard = /###\s*Compliance Scorecard/.test(md);

  const missing = [];
  if (hasScorecard) {
    if (overall.score == null && !overall.label) missing.push('overall');
    if (categories.length !== 3) missing.push(`categories(${categories.length})`);
    if (validation.providers == null && /Data Validation/.test(md)) missing.push('validation.providers');
  }

  return {
    record: {
      id: page.id,
      name: page.title,
      path: page.path,
      url: `${PUBLIC_BASE}/${page.path}`,
      schema: schemaM ? stripTags(schemaM[1]) : null,
      description: page.description || null,
      updatedAt: page.updatedAt || null,
      hasScorecard,
      alerts: parseAlerts(md),
      tocUrl,
      subPlanLinks,
      overall,
      categories,
      validation,
      observations,
      overallAssessment: assessment,
    },
    missing,
  };
}

function findPayerPages(pages) {
  for (const p of pages) {
    if (p.path === 'payers' && p.pages) return p.pages;
    if (p.pages) {
      const r = findPayerPages(p.pages);
      if (r) return r;
    }
  }
  return null;
}

async function main() {
  console.log('Fetching content tree...');
  const content = await api(`/spaces/${SPACE}/content`);
  const payerPages = findPayerPages(content.pages || []);
  if (!payerPages) throw new Error('Could not find the "payers" parent page.');
  console.log(`Found ${payerPages.length} payer pages. Fetching each...`);

  const payers = [];
  const problems = [];
  for (let i = 0; i < payerPages.length; i++) {
    const pp = payerPages[i];
    process.stdout.write(`  [${i + 1}/${payerPages.length}] ${pp.title}\n`);
    try {
      const page = await api(`/spaces/${SPACE}/content/page/${pp.id}?format=markdown`);
      const { record, missing } = parsePayer(page);
      if (missing.length) problems.push({ name: record.name, missing });
      payers.push(record);
    } catch (err) {
      problems.push({ name: pp.title, error: String(err.message || err) });
    }
  }

  payers.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

  const output = {
    generatedAt: new Date().toISOString(),
    source: PUBLIC_BASE,
    payerCount: payers.length,
    scoredCount: payers.filter((p) => p.overall.score != null).length,
    payers,
  };

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(output, null, 2));

  console.log(`\nWrote ${payers.length} payers to ${OUT}`);
  if (problems.length) {
    console.log(`\n${problems.length} page(s) need a look:`);
    for (const p of problems) {
      console.log(`  - ${p.name}: ${p.error ? 'ERROR ' + p.error : 'missing ' + p.missing.join(', ')}`);
    }
  } else {
    console.log('All pages parsed cleanly.');
  }
}

main().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});
