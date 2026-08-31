import * as path from "node:path";
import { type CollectionEntry, getCollection } from "astro:content";
import { structure, type StructuredData } from "fumadocs-core/mdx-plugins";
import type { StaticSource } from "fumadocs-core/source";
import { type InferPageType, loader } from "fumadocs-core/source";
import { openapiSource } from "fumadocs-openapi/server";
import { openapi } from "@/lib/openapi";

async function createMySource() {
	const out: StaticSource<{
		metaData: CollectionEntry<"meta">["data"];
		pageData: CollectionEntry<"docs">["data"] & {
			_raw: CollectionEntry<"docs">;
		};
	}> = {
		files: [],
	};

	for (const page of await getCollection("docs")) {
		const virtualPath = path.relative("content/docs", page.filePath!);

		out.files.push({
			type: "page",
			path: virtualPath,
			data: {
				...page.data,
				_raw: page,
			},
		});
	}

	for (const meta of await getCollection("meta")) {
		const virtualPath = path.relative("content/docs", meta.filePath!);

		out.files.push({
			type: "meta",
			path: virtualPath,
			data: meta.data,
		});
	}

	return out;
}

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
		docs: await createMySource(),
		openapi: openapiDocs,
	},
	{
		baseUrl: "/",
	},
);

export function getStructuredData(
	entry: CollectionEntry<"docs">,
): StructuredData {
	return structure(entry.body ?? "");
}

export function getPageImageUrl(page: InferPageType<typeof source>) {
	const segments = [...page.slugs, "image.webp"];

	return `/og/docs/${segments.join("/")}`;
}

export async function getLLMText(page: InferPageType<typeof source>) {
	if (page.type === "openapi") {
		return JSON.stringify(page.data.getSchema().bundled, null, 2);
	}

	const raw = page.data._raw.body ?? "";

	return `# ${page.data.title}

${raw}`;
}
