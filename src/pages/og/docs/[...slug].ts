import type { APIRoute, GetStaticPaths } from "astro";
import { createElement } from "react";
import { ImageResponse } from "takumi-js/response";
import { OgTemplate } from "@/components/og/og-template";
import { type DocsPage, getPageSlug, source } from "@/lib/source";

/** Branded OG images at `/og/docs/<slug>/image.webp`. */
export const getStaticPaths = (() =>
	source.getPages().map((page) => ({
		params: { slug: getPageSlug(page, "image.webp") },
		props: { page },
	}))) satisfies GetStaticPaths;

export const GET: APIRoute<{ page: DocsPage }> = ({ props: { page } }) =>
	new ImageResponse(
		createElement(OgTemplate, {
			title: page.data.title ?? "API",
			description: page.data.description ?? "",
			label: page.slugs.at(-1),
		}),
		{ width: 1200, height: 630, format: "webp" },
	);
