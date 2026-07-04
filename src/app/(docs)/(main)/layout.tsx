import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import {
	DocsSidebarBanner,
	DocsSidebarFooter,
} from "@/components/docs/docs-sidebar";
import { getDocsTabs } from "@/lib/docs-tabs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/">) {
	return (
		<DocsLayout
			{...baseOptions()}
			tree={source.getPageTree()}
			tabMode="navbar"
			tabs={getDocsTabs(source.getPageTree())}
			themeSwitch={{ enabled: false }}
			sidebar={{
				collapsible: true,
				banner: DocsSidebarBanner,
				footer: DocsSidebarFooter,
			}}
		>
			{children}
		</DocsLayout>
	);
}
