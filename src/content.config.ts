import { defineCollection, z } from 'astro:content';

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

export const collections = { blog };
