
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import type { APIContext } from 'astro';
import { getOgImageUrl } from './util/getOgImageUrl';

export const onRequest = defineRouteMiddleware((context) => {
    updateHead(context);
});

function updateHead(context: APIContext) {
    const { head, isFallback } = context.locals.starlightRoute;

    const ogImageUrl = getOgImageUrl(context.url.pathname, !!isFallback);
    const imageSrc = ogImageUrl ?? '/platform.webp';
    const canonicalImageSrc = new URL(imageSrc, context.site);

    head.push({ tag: 'meta', attrs: { property: 'og:image', content: canonicalImageSrc.href } });
    head.push({ tag: 'meta', attrs: { name: 'twitter:image', content: canonicalImageSrc.href } });
}