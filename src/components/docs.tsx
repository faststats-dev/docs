import type { DocsPageProps } from "@fumadocs/astro/config";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import {
	DocsDescription,
	DocsPage,
	DocsTitle,
	MarkdownCopyButton,
} from "fumadocs-ui/layouts/notebook/page";
import { useMemo } from "react";
import {
	DocsSidebarBanner,
	DocsSidebarFooter,
} from "@/components/docs/docs-sidebar";
import { getDocsTabs } from "@/lib/docs-tabs";

/** The docs page; the MDX content arrives as `children`. */
export default function Docs({ tree, page, layout, children }: DocsPageProps) {
	const tabs = useMemo(() => getDocsTabs(tree), [tree]);

	return (
		<DocsLayout
			{...layout}
			tree={tree}
			tabMode="navbar"
			tabs={tabs}
			sidebar={{
				collapsible: true,
				banner: DocsSidebarBanner,
				footer: DocsSidebarFooter,
			}}
		>
			<DocsPage toc={page.toc} full={page.full}>
				<DocsTitle>{page.title}</DocsTitle>
				<DocsDescription className="mb-0">{page.description}</DocsDescription>
				{page.markdownUrl ? (
					<div className="flex flex-row items-center gap-2 border-b pb-6">
						<MarkdownCopyButton markdownUrl={page.markdownUrl} />
					</div>
				) : null}
				{children}
			</DocsPage>
		</DocsLayout>
	);
}
