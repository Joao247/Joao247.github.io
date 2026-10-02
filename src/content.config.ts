import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    /** One-paragraph summary shown under the case-study title. */
    dek: z.string(),
    /** Shorter summary for the homepage card. */
    summary: z.string(),
    /** Meta description for search and social previews. */
    description: z.string(),
    context: z.string(),
    area: z.string(),
    role: z.string(),
    stack: z.string(),
    status: z.enum(['production', 'pre-launch']),
    statusLabel: z.string(),
    /** Optional longer status shown on the case-study page only. */
    statusDetail: z.string().optional(),
    /** Architecture in one line. Wrap key components in **double asterisks**. */
    flow: z.string(),
    order: z.number(),
  }),
});

export const collections = { work };
