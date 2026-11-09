import type { APIRoute, GetStaticPaths } from "astro";
import { docsLlms, type DocsPage, getPageSlug, source } from "@/lib/source";

/** The Markdown of each page for LLMs, like `/platform/guide.md`. */
export const getStaticPaths = (() =>
	source
		.getPages()
		.filter((page) => page.slugs.length > 0)
		.map((page) => ({
			params: { slug: getPageSlug(page) },
			props: { page },
		}))) satisfies GetStaticPaths;

export const GET: APIRoute<{ page: DocsPage }> = async ({ props }) =>
	new Response(await docsLlms.page(props.page), {
		headers: { "Content-Type": "text/markdown; charset=utf-8" },
	});
