// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
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
	adapter: node({ mode: "standalone" }),
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
