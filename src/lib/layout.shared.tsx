import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { SiteBrand } from "@/components/site-brand";

export function baseOptions(): BaseLayoutProps {
	return {
		nav: {
			title: <SiteBrand />,
			url: "/platform",
		},
	};
}
