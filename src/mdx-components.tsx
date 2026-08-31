import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import {
	CodeBlockTab,
	CodeBlockTabs,
	CodeBlockTabsList,
	CodeBlockTabsTrigger,
} from "@/components/codeblock-tabs";
import { Tab, Tabs } from "@/components/tabs";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		CodeBlock,
		CodeBlockTab,
		CodeBlockTabs,
		CodeBlockTabsList,
		CodeBlockTabsTrigger,
		DynamicCodeBlock,
		pre: (props) => (
			<CodeBlock {...props}>
				<Pre>{props.children}</Pre>
			</CodeBlock>
		),
		Tabs,
		Tab,
		...components,
	};
}
