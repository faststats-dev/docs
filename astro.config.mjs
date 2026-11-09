// @ts-check
import fumadocs from "@fumadocs/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	integrations: [
		fumadocs({
			components: "./src/mdx-components.tsx",
		}),
	],
	vite: {
		plugins: [tailwindcss()],
		// @fumadocs/astro opts out of prebundling; prebundling these too would load
		// a second copy of fumadocs-core in dev and break its React context.
		optimizeDeps: {
			exclude: ["fumadocs-core", "fumadocs-ui"],
			include: ["fumadocs-openapi/ui"],
		},
	},
});
