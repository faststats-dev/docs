// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import cloudflare from "@astrojs/cloudflare";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import {
	rehypeCode,
	remarkCodeTab,
	remarkHeading,
	remarkNpm,
	remarkStructure,
} from "fumadocs-core/mdx-plugins";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const remarkPlugins =
	/** @type {import('@astrojs/markdown-remark').RemarkPlugins} */ ([
		remarkHeading,
		remarkCodeTab,
		remarkNpm,
		[remarkStructure, { exportAs: "structuredData" }],
	]);
const rehypePlugins = [rehypeCode];

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
	output: "server",
	adapter: cloudflare({
		// Prerender docs and OG images in Node, outside Workers' global-scope restrictions.
		prerenderEnvironment: "node",
	}),
	markdown: {
		processor: unified({
			remarkPlugins,
			rehypePlugins,
		}),
	},
	integrations: [
		react(),
		mdx({
			extendMarkdownConfig: true,
			syntaxHighlight: false,
		}),
	],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": path.join(__dirname, "src"),
			},
			dedupe: [
				"react",
				"react-dom",
				"@base-ui/react",
				"fumadocs-core",
				"fumadocs-ui",
			],
		},
	},
});
