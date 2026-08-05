import { navigate } from "astro:transitions/client";
import type { AstroProviderProps } from "fumadocs-core/framework/astro";
import type { Root } from "fumadocs-core/page-tree";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	type DocsPageProps,
	DocsTitle,
} from "fumadocs-ui/layouts/notebook/page";
import { RootProvider } from "fumadocs-ui/provider/astro";
import { type ReactNode, useMemo } from "react";
import { LLMCopyButton } from "@/components/ai/page-actions";
import {
	DocsSidebarBanner,
	DocsSidebarFooter,
} from "@/components/docs/docs-sidebar";
import SearchDialog from "@/components/search";
import { StaticTabsEnhancer } from "@/components/static-tabs-enhancer";
import { getDocsTabs } from "@/lib/docs-tabs";
import { baseOptions } from "@/lib/layout.shared";
import { resolveLucideIcons } from "@/lib/resolve-lucide-icons";

export function Docs({
	tree,
	children,
	pathname,
	params,
	page,
	title,
	description,
	markdownUrl,
}: {
	tree: Root;
	children: ReactNode;
	pathname: string;
	params: AstroProviderProps["params"];
	page?: DocsPageProps;
	title: string;
	description?: string;
	markdownUrl?: string;
}) {
	const pageTree = useMemo(() => resolveLucideIcons(tree), [tree]);

	return (
		<RootProvider
			pathname={pathname}
			params={params}
			navigate={navigate}
			search={{ SearchDialog }}
		>
			<StaticTabsEnhancer />
			<DocsLayout
				{...baseOptions()}
				tree={pageTree}
				tabMode="navbar"
				tabs={getDocsTabs(pageTree)}
				sidebar={{
					collapsible: true,
					banner: DocsSidebarBanner,
					footer: DocsSidebarFooter,
				}}
			>
				<DocsPage {...page}>
					<DocsTitle>{title}</DocsTitle>
					<DocsDescription className="mb-0">{description}</DocsDescription>
					{markdownUrl ? (
						<div className="flex flex-row items-center gap-2 border-b pb-6">
							<LLMCopyButton markdownUrl={markdownUrl} />
						</div>
					) : null}
					<DocsBody>{children}</DocsBody>
				</DocsPage>
			</DocsLayout>
		</RootProvider>
	);
}
