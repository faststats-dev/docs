// @ts-check
import fumadocs from "@fumadocs/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	integrations: [
		fumadocs({
			components: "./src/mdx-components.tsx",
			layout: "./src/lib/layout.shared.tsx",
			page: "./src/components/docs.tsx",
		}),
	],
	vite: {
		plugins: [tailwindcss()],
		// @fumadocs/astro opts out of prebundling; prebundling these too would load
		// a second copy of fumadocs-core in dev and break its React context.
		optimizeDeps: {
			exclude: ["fumadocs-core", "fumadocs-ui"],
			// Reached only through @fumadocs/astro, which Vite does not scan.
			include: ["fumadocs-openapi/ui"],
		},
	},
});
