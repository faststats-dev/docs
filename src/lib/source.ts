import { toFumadocsSource } from "@fumadocs/astro/source";
import { getCollection } from "astro:content";
import { llms, loader, type InferPageType } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/plugins/lucide-icons";
import { openapiSource, type OpenAPIPageData } from "fumadocs-openapi/server";
import { openapi } from "@/lib/openapi";

const openapiDocs = await openapiSource(openapi, {
	baseDir: "api",
	meta: true,
	groupBy: "tag",
});

const openapiRootMeta = openapiDocs.files.find(
	(file) => file.path === "api/meta.json",
);
if (openapiRootMeta?.type === "meta") {
	openapiRootMeta.data = {
		...openapiRootMeta.data,
		root: true,
		title: "Rest API",
		icon: "BookOpen",
		pages: ["index", ...(openapiRootMeta.data.pages ?? [])],
	};
}

export const source = loader(
	{
		docs: toFumadocsSource(
			await getCollection("docs"),
			await getCollection("meta"),
		),
		openapi: openapiDocs,
	},
	{
		baseUrl: "/",
		plugins: [lucideIconsPlugin()],
	},
);

export type DocsPage = InferPageType<typeof source>;

/** Pages generated from the OpenAPI schema, rendered by `<APIPage />`. */
export function isOpenAPIPage(
	page: DocsPage,
): page is DocsPage & { data: OpenAPIPageData } {
	return "getOpenAPIPageProps" in page.data;
}

/** The `[...slug]` route param of a page, `undefined` for the root page. */
export function getPageSlug(page: DocsPage, ...suffix: string[]) {
	return decodeURI([...page.slugs, ...suffix].join("/")) || undefined;
}

export function getPageTitle(page: DocsPage): string {
	return page.data.title ?? page.slugs.at(-1) ?? "";
}

/** `/platform/guide.md` for `/platform/guide`. */
export function getPageMarkdownUrl(page: DocsPage): string {
	return page.slugs.length > 0 ? `/${page.slugs.join("/")}.md` : "/index.md";
}

/** Branded OG image at `/og/docs/<slug>/image.webp`. */
export function getPageImageUrl(page: DocsPage): string {
	return `/og/docs/${[...page.slugs, "image.webp"].join("/")}`;
}

/** The page content for LLMs: the MDX source, or the description of API pages. */
function getPageText(page: DocsPage): Promise<string> | string {
	if (isOpenAPIPage(page)) return page.data.description ?? "";
	return page.data.getText("raw");
}

export const docsLlms = llms(source, {
	renderPage: async (page) =>
		`# ${getPageTitle(page)} (${page.url})\n\n${await getPageText(page)}`,
});
