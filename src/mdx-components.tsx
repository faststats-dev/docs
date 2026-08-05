import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import {
	CodeBlock,
	CodeBlockTab,
	CodeBlockTabs,
	CodeBlockTabsList,
	CodeBlockTabsTrigger,
	Pre,
} from "@/components/codeblock";
import { HighlightedCode } from "@/components/highlighted-code";
import { Tab, Tabs } from "@/components/tabs";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		CodeBlock,
		CodeBlockTab,
		CodeBlockTabs,
		CodeBlockTabsList,
		CodeBlockTabsTrigger,
		DynamicCodeBlock: HighlightedCode,
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
