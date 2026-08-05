import type { Root } from "fumadocs-core/page-tree";
import { visit } from "fumadocs-core/page-tree";
import { icons } from "lucide-react";
import { createElement } from "react";

export function resolveLucideIcons(tree: Root): Root {
	const cloned = structuredClone(tree);

	visit(cloned, (node) => {
		if ("icon" in node && typeof node.icon === "string") {
			const Icon = icons[node.icon as keyof typeof icons];
			if (Icon) node.icon = createElement(Icon);
		}
	});

	return cloned;
}
