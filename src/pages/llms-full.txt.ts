import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { glossaryTerms } from '../data/glossary';

// Prerendered to a static /llms-full.txt at build time (regenerates on every
// Netlify deploy, so it never goes stale). This is the full-text companion to
// the curated /llms.txt — it hands AI/retrieval engines Payerset's reference
// material and complete articles in a single fetch.
export const prerender = true;

const SITE = 'https://www.payerset.com';

const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

// Collapse runs of 3+ blank lines and trim trailing whitespace.
const tidy = (s: string) => s.replace(/\n{3,}/g, '\n\n').replace(/[ \t]+$/gm, '').trim();

interface PostMeta {
  title: string;
  url: string;
  date: Date;
  author?: string;
  context?: string;
  body: string;
}

const renderPost = (p: PostMeta): string => {
  const meta = [
    `- URL: ${p.url}`,
    `- Published: ${fmtDate(p.date)}`,
    p.author ? `- Author: ${p.author}` : null,
    p.context ? `- Section: ${p.context}` : null,
  ].filter(Boolean);
  return `## ${p.title}\n\n${meta.join('\n')}\n\n${p.body}`;
};

export const GET: APIRoute = async () => {
  const tpPosts = (await getCollection('tp-blog')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  const legacyPosts = (await getCollection('blog')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  const header = `# Payerset — Full Content Export

> Payerset is a healthcare price transparency data company. We turn payer
> Transparency in Coverage (TiC) files and Hospital Price Transparency
> machine-readable files (MRFs) into clean, analyzable contracted-rate and claims
> data so health systems, providers, health-tech teams, employers, and researchers
> can benchmark reimbursement, prepare for managed care contract negotiations, and
> understand competitive rates in their market.

This file (llms-full.txt) is a full-text export of Payerset's reference material
and articles, intended for AI and retrieval engines. For a curated index of the
site, see ${SITE}/llms.txt. Content is generated from the live site and updated on
every deploy.`;

  const glossarySection = [
    '# Glossary',
    ...glossaryTerms.map((t) => `## ${t.term}\n\n${t.definition}`),
  ].join('\n\n');

  const tpSection = [
    '# The Price Transparency Project — Articles',
    ...tpPosts.map((p) =>
      renderPost({
        title: p.data.title,
        url: `${SITE}/pricetransparencyproject/blog/${p.id}`,
        date: p.data.date,
        author: p.data.author,
        context: 'The Price Transparency Project',
        body: tidy(p.body ?? '') || p.data.description,
      }),
    ),
  ].join('\n\n---\n\n');

  const legacySection = [
    '# Insights — Articles',
    ...legacyPosts.map((p) =>
      renderPost({
        title: p.data.title,
        url: `${SITE}/post/${p.id.replace(/\.md$/, '')}`,
        date: p.data.date,
        author: p.data.author,
        context: p.data.category,
        body: tidy(p.body ?? '') || p.data.description,
      }),
    ),
  ].join('\n\n---\n\n');

  const body =
    [header, glossarySection, tpSection, legacySection].join('\n\n---\n\n') + '\n';

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
