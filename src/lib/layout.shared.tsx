import { useStaticSearch } from "fumadocs-core/search/client";
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

/** Show results before the user types. */
export function useSearch({ locale }: { locale?: string }) {
	return useStaticSearch({ locale, allowEmpty: true });
}
