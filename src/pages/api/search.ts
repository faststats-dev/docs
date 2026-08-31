import type { APIRoute } from "astro";
import { createFromSource } from "fumadocs-core/search/server";
import { getStructuredData, source } from "@/lib/source";

const server = createFromSource(source, {
	buildIndex(page) {
		if (page.type === "openapi") {
			return {
				id: page.url,
				title: page.data.title ?? "API",
				description: page.data.description,
				structuredData: page.data.structuredData,
				url: page.url,
			};
		}

		return {
			id: page.data._raw.id,
			title: page.data.title,
			description: page.data.description,
			structuredData: getStructuredData(page.data._raw),
			url: page.url,
		};
	},
});

export const GET: APIRoute = () => {
	return server.staticGET();
};

export const prerender = true;
