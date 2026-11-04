import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
const schema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  summary: z.string(),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  url: z.string().optional(),
  draft: z.boolean().default(false),
  pin: z.boolean().default(false),
});
const make = (kind: string) =>
  defineCollection({ loader: glob({ pattern: `{zh,en}/${kind}/*.md`, base: './content' }), schema });
export const collections = { projects: make('projects'), writing: make('writing'), links: make('links') };
