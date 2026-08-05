import type { Root } from "fumadocs-core/page-tree";
import {
	type GetLayoutTabsOptions,
	getLayoutTabs,
	type LayoutTab,
} from "fumadocs-ui/layouts/shared";

const transform: NonNullable<GetLayoutTabsOptions["transform"]> = (
	option,
	node,
) => {
	if (node.$id === "platform") {
		return { ...option, url: "/platform", title: "Platform" };
	}

	if (node.$id === "java") {
		return { ...option, url: "/java", title: "Java" };
	}

	if (node.$id === "web-analytics") {
		return { ...option, url: "/web-analytics", title: "Web Analytics" };
	}

	return option;
};

export function getDocsTabs(tree: Root): LayoutTab[] {
	return getLayoutTabs(tree, { transform });
}
