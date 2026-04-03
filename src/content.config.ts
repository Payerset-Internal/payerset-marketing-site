import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    category: z.enum([
      'Industry Insights',
      'Parsing Payer MRFs',
      'Payercast',
      'News',
    ]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    readTime: z.string().optional(),
  }),
});

// Price Transparency Project collections
const tpTopicEnum = z.enum(['analysis', 'policy', 'playbook', 'equity', 'employer']);

const tpBlog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tp-blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.coerce.date(),
    readTime: z.string(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    topics: z.array(tpTopicEnum).default([]),
  }),
});

const tpPodcast = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tp-podcast' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    episode: z.number(),
    date: z.coerce.date(),
    duration: z.string(),
    featured: z.boolean().default(false),
    audioUrl: z.string().optional(),
    guests: z.array(z.string()).default([]),
    topics: z.array(tpTopicEnum).default([]),
  }),
});

const tpNewsletter = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tp-newsletter' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    readTime: z.string(),
    featured: z.boolean().default(false),
    topics: z.array(tpTopicEnum).default([]),
  }),
});

const tpResearch = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tp-research' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.coerce.date(),
    readTime: z.string(),
    featured: z.boolean().default(false),
    statNumber: z.string().optional(),
    statLabel: z.string().optional(),
    topics: z.array(tpTopicEnum).default([]),
  }),
});

export const collections = {
  blog,
  'tp-blog': tpBlog,
  'tp-podcast': tpPodcast,
  'tp-newsletter': tpNewsletter,
  'tp-research': tpResearch,
};
