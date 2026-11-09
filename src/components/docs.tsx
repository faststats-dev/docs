import {
	type SerializedPageTree,
	useFumadocsLoader,
} from "fumadocs-core/source/client";
import type { TOCItemType } from "fumadocs-core/toc";
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
import { Provider, type ProviderProps } from "@/components/provider";
import { getDocsTabs } from "@/lib/docs-tabs";
import { baseOptions } from "@/lib/layout.shared";

export interface DocsProps extends ProviderProps {
	tree: SerializedPageTree;
	title: string;
	description?: string;
	toc: TOCItemType[];
	full?: boolean;
	markdownUrl: string;
}

/** The layout island of docs pages; the page content arrives as `children`. */
export function Docs({
	tree: serializedTree,
	title,
	description,
	toc,
	full,
	markdownUrl,
	children,
	...provider
}: DocsProps) {
	const { tree } = useFumadocsLoader({ tree: serializedTree });
	const tabs = useMemo(() => getDocsTabs(tree), [tree]);

	return (
		<Provider {...provider}>
			<DocsLayout
				{...baseOptions()}
				tree={tree}
				tabMode="navbar"
				tabs={tabs}
				sidebar={{
					collapsible: true,
					banner: DocsSidebarBanner,
					footer: DocsSidebarFooter,
				}}
			>
				<DocsPage toc={toc} full={full}>
					<DocsTitle>{title}</DocsTitle>
					<DocsDescription className="mb-0">{description}</DocsDescription>
					<div className="flex flex-row items-center gap-2 border-b pb-6">
						<MarkdownCopyButton markdownUrl={markdownUrl} />
					</div>
					{children}
				</DocsPage>
			</DocsLayout>
		</Provider>
	);
}
