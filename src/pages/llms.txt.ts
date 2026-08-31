import type { APIRoute } from "astro";
import { source } from "@/lib/source";

export const GET: APIRoute = () => {
	const lines: string[] = [];
	lines.push("# Documentation");
	lines.push("");
	for (const page of source.getPages()) {
		lines.push(`- [${page.data.title}](${page.url}): ${page.data.description}`);
	}
	return new Response(lines.join("\n"));
};

export const prerender = true;
