import type { Root } from "fumadocs-core/page-tree";
import {
	type GetLayoutTabsOptions,
	getLayoutTabs,
	type LayoutTab,
} from "fumadocs-ui/layouts/shared";
import { BookOpen, Coffee, Globe, LayoutDashboard } from "lucide-react";

const transform: NonNullable<GetLayoutTabsOptions["transform"]> = (
	option,
	node,
) => {
	if (node.$id === "platform") {
		return {
			...option,
			url: "/platform",
			title: (
				<span className="inline-flex items-center gap-2">
					<LayoutDashboard className="size-4" />
					Platform
				</span>
			),
		};
	}

	if (node.$id === "java") {
		return {
			...option,
			url: "/java",
			title: (
				<span className="inline-flex items-center gap-2">
					<Coffee className="size-4" />
					Java
				</span>
			),
		};
	}

	if (node.$id === "api") {
		return {
			...option,
			url: "/api",
			title: (
				<span className="inline-flex items-center gap-2">
					<BookOpen className="size-4" />
					Rest API
				</span>
			),
		};
	}

	if (node.$id === "web-analytics") {
		return {
			...option,
			url: "/web-analytics",
			title: (
				<span className="inline-flex items-center gap-2">
					<Globe className="size-4" />
					Web Analytics
					<span className="border-border bg-muted text-muted-foreground rounded-none border px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase">
						Coming Soon
					</span>
				</span>
			),
		};
	}

	return option;
};

export function getDocsTabs(tree: Root): LayoutTab[] {
	return getLayoutTabs(tree, { transform });
}
