import { allPages } from "@/content";
import type { CollectionEntry } from "astro:content";
import { OGImageRoute, type OGImageOptions } from 'astro-og-canvas';

/** Paths for all of our Markdown content we want to generate OG images for. */
const paths = process.env.SKIP_OG ? [] : allPages;

/** An object mapping file paths to file metadata. */
const pages = Object.fromEntries(
    paths.map(
        ({ filePath, id, data }) =>
            [filePath, { data, id }] as [string, Pick<CollectionEntry<'docs'>, 'data' | 'id'>]
    )
);

export const { getStaticPaths, GET } = await OGImageRoute({
    pages,
    getSlug(_, page: (typeof pages)[string]) {
        return page.id + '.webp';
    },
    getImageOptions: async (_, { data, id }: (typeof pages)[string]): Promise<OGImageOptions> => {
        return {
            format: 'WEBP',
            quality: 90,
            title: data.title,
            description: data.description,
            dir: 'ltr',
            logo: {
                path: './src/pages/og/_images/docs-logo.png',
                size: [300],
            },
            border: { width: 32, side: 'inline-start' },
            padding: 80,
            bgImage: {
                path: `./src/pages/og/_images/background.png`,
            },
            font: {
                title: {
                    size: 72,
                    lineHeight: 1.2,
                    families: [
                        'Inter',
                    ],
                    weight: 'Medium',
                    color: [255, 255, 255],
                },
                description: {
                    size: 42,
                    lineHeight: 1.2,
                    families: [
                        'Inter',
                    ],
                    weight: 'Normal',
                    color: [191, 193, 201],
                },
            },
            fonts: [
                './src/pages/og/_fonts/inter/inter-400-normal.ttf',
                './src/pages/og/_fonts/inter/inter-500-normal.ttf',
            ].filter((val): val is string => typeof val === 'string'),
        };
    },
});