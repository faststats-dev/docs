import path from "node:path";
import { fileURLToPath } from "node:url";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
	output: "standalone",
	serverExternalPackages: ["@takumi-rs/core"],
	reactStrictMode: true,
	webpack(config) {
		config.resolve.alias = {
			...config.resolve.alias,
			"@": path.join(__dirname, "src"),
		};
		return config;
	},
	async rewrites() {
		return [
			{
				source: "/:path*.md",
				destination: "/llms.mdx/docs/:path*",
			},
		];
	},
	async redirects() {
		return [
			{
				source: "/",
				destination: "/platform",
				permanent: false,
			},
			{
				source: "/guide/:path*",
				destination: "/platform/guide/:path*",
				permanent: true,
			},
			{
				source: "/chart-editor/:path*",
				destination: "/platform/chart-editor/:path*",
				permanent: true,
			},
			{
				source: "/error-tracking/:path*",
				destination: "/platform/error-tracking/:path*",
				permanent: true,
			},
			{
				source: "/retention",
				destination: "/platform/retention",
				permanent: true,
			},
			{
				source: "/web-vitals",
				destination: "/platform/web-vitals",
				permanent: true,
			},
			{
				source: "/web",
				destination: "/web-analytics",
				permanent: true,
			},
			{
				source: "/api/search",
				destination: "/docs-search",
				permanent: true,
			},
			{
				source: "/openapi",
				destination: "/api",
				permanent: true,
			},
			{
				source: "/openapi/:path*",
				destination: "/api/:path*",
				permanent: true,
			},
		];
	},
};

export default withMDX(config);
