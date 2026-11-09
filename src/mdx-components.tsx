import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { DocsBody } from "fumadocs-ui/layouts/notebook/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ContentProvider, type ProviderProps } from "@/components/provider";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		DynamicCodeBlock,
		Tabs,
		Tab,
		...components,
	};
}

/** Gets the props of `<Content />`: the providers and prose styles of the content. */
function ContentWrapper({ children, ...provider }: ProviderProps) {
	return (
		<ContentProvider {...provider}>
			<DocsBody>{children}</DocsBody>
		</ContentProvider>
	);
}

// The content renders as one hydrated React island.
export default getMDXComponents({ wrapper: ContentWrapper });
