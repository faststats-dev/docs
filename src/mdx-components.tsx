import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { DocsBody } from "fumadocs-ui/layouts/notebook/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		DynamicCodeBlock,
		Tabs,
		Tab,
		...components,
	};
}

// The content renders as one hydrated React island; `wrapper` gives it the prose styles.
export default getMDXComponents({ wrapper: DocsBody });
