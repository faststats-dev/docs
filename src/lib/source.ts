import { type InferPageType, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { docs } from "fumadocs-mdx:collections/server";
import { openapiPlugin, openapiSource } from "fumadocs-openapi/server";
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
		docs: docs.toFumadocsSource(),
		openapi: openapiDocs,
	},
	{
		baseUrl: "/",
		plugins: [lucideIconsPlugin(), openapiPlugin()],
	},
);

export function getPageImage(page: InferPageType<typeof source>) {
	const segments = [...page.slugs, "image.webp"];

	return {
		segments,
		url: `/og/docs/${segments.join("/")}`,
	};
}

export async function getLLMText(page: InferPageType<typeof source>) {
	if (page.type === "openapi") {
		return JSON.stringify(page.data.getSchema().bundled, null, 2);
	}

	const processed = await page.data.getText("processed");

	return `# ${page.data.title}

${processed}`;
}
