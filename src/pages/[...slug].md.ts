import type { APIRoute } from "astro";
import { getLLMText, source } from "@/lib/source";

export function getStaticPaths() {
	return source.getPages().map((page) => ({
		params: {
			slug: page.slugs.length > 0 ? page.slugs.join("/") : undefined,
		},
	}));
}

export const GET: APIRoute = async ({ params }) => {
	const slugs = params.slug?.split("/").filter((item) => item.length > 0) ?? [];
	const page = source.getPage(slugs);

	if (!page) return new Response(undefined, { status: 404 });

	return new Response(await getLLMText(page), {
		headers: {
			"Content-Type": "text/markdown",
		},
	});
};

export const prerender = true;
