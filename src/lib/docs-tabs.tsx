import type { Root } from "fumadocs-core/page-tree";
import { getLayoutTabs, type LayoutTab } from "fumadocs-ui/layouts/shared";

export function getDocsTabs(tree: Root): LayoutTab[] {
	return getLayoutTabs(tree, {
		transform(option) {
			if (!option.icon) return option;

			return {
				...option,
				title: (
					<span className="inline-flex items-center gap-2">
						<span className="shrink-0 [&_svg]:size-4" aria-hidden="true">
							{option.icon}
						</span>
						{option.title}
					</span>
				),
			};
		},
	});
}
