import { defineConfig, type Plugin } from "@fumadocs/astro/config";
import { openapiPlugin } from "@fumadocs/astro/plugins/openapi";
import { oramaSearchPlugin } from "@fumadocs/astro/plugins/orama-search";
import { createElement } from "react";
import { ImageResponse } from "takumi-js/response";
import Head from "@/components/head.astro";
import { OgTemplate } from "@/components/og/og-template";
import { openapi } from "@/lib/openapi";
import { source } from "@/lib/source";

/** Branded OG images at `/og/docs/<slug>/image.webp`. */
function ogImagePlugin(): Plugin {
	const imageUrl = (slugs: string[]) =>
		`/og/docs/${[...slugs, "image.webp"].join("/")}`;

	return {
		name: "og-image",
		routes() {
			return this.getPages().map((page) => ({
				type: "file" as const,
				url: imageUrl(page.slugs),
				GET: () =>
					new ImageResponse(
						createElement(OgTemplate, {
							title: page.data.title ?? "API",
							description: page.data.description ?? "",
							label: page.slugs.at(-1),
						}),
						{ width: 1200, height: 630, format: "webp" },
					),
			}));
		},
		transformPage(page, data) {
			return { ...data, image: imageUrl(page.slugs) };
		},
	};
}

export default defineConfig({
	source,
	head: Head,
	plugins: [
		openapiPlugin({ server: openapi }),
		// Needed because the layout module exports its own `useSearch`.
		oramaSearchPlugin(),
		ogImagePlugin(),
	],
});
