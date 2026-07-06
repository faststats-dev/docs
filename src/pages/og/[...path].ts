import { pages } from "@/content";
import { OGImageRoute, type OGImageOptions } from 'astro-og-canvas';

export const { getStaticPaths, GET } = await OGImageRoute({
    pages,
    getSlug(_, page: (typeof pages)[string]) {
        return page.id + '.webp';
    },
    getImageOptions: async (_, { data }: (typeof pages)[string]): Promise<OGImageOptions> => {
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
                    size: 64,
                    lineHeight: 1.2,
                    families: [
                        'Geist Mono',
                    ],
                    weight: 'Medium',
                    color: [255, 255, 255],
                },
                description: {
                    size: 28,
                    lineHeight: 1.2,
                    families: [
                        'Geist',
                    ],
                    weight: 'Normal',
                    color: [191, 193, 201],
                },
            },
            fonts: [
                './src/pages/og/_fonts/geist-latin-400-normal.ttf',
                './src/pages/og/_fonts/geist-latin-500-normal.ttf',
                './src/pages/og/_fonts/geist-mono-latin-400-normal.ttf',
                './src/pages/og/_fonts/geist-mono-latin-500-normal.ttf',
            ].filter((val): val is string => typeof val === 'string'),
        };
    },
});