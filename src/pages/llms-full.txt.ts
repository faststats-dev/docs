import type { APIRoute } from "astro";
import { getLLMText, source } from "@/lib/source";

export const GET: APIRoute = async () => {
	const scan = source.getPages().map(getLLMText);
	const scanned = await Promise.all(scan);

	return new Response(scanned.join("\n\n"));
};

export const prerender = true;
