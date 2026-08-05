import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { SiteBrand } from "@/components/site-brand";

export const docsSocialLinks = [
	{
		url: "https://github.com/faststats-dev",
		label: "GitHub",
		icon: "github" as const,
		external: true,
	},
	{
		url: "https://discord.com/invite/SKnDU5VwMS",
		label: "Discord",
		icon: "discord" as const,
		external: true,
	},
];

export function baseOptions(): BaseLayoutProps {
	return {
		nav: {
			title: <SiteBrand />,
			url: "/platform",
		},
	};
}
