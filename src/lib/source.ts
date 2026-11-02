import { toFumadocsSource } from "@fumadocs/astro/source";
import { getCollection } from "astro:content";
import { loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/plugins/lucide-icons";
import { openapiSource } from "fumadocs-openapi/server";
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
