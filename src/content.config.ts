import { defineCollection, type CollectionEntry } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { topicSchema } from 'starlight-sidebar-topics/schema';
import { z } from 'astro/zod';

const baseSchema = topicSchema.extend({
	type: z.literal('base').optional().default('base'),
});

const apiDocSchema = baseSchema.extend({
	type: z.literal('api-doc'),
});

export const docsCollectionSchema = z.union([baseSchema, apiDocSchema]);

export type DocsEntryData = z.infer<typeof docsCollectionSchema>;

export type DocsEntryType = DocsEntryData['type'];

export type DocsEntry<T extends DocsEntryType> = CollectionEntry<'docs'> & {
	data: Extract<DocsEntryData, { type: T }>;
};

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({ extend: docsCollectionSchema })
	}),
};
