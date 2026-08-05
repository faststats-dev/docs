import { cn } from "cnfast";
import { highlight } from "fumadocs-core/highlight";
import type { ComponentProps } from "react";
import { CodeBlock, Pre } from "@/components/codeblock";

export async function HighlightedCode({
	lang,
	code,
	codeblock,
}: {
	lang: string;
	code: string;
	codeblock?: ComponentProps<typeof CodeBlock>;
}) {
	return highlight(code, {
		lang,
		defaultColor: false,
		components: {
			pre: (props) => (
				<CodeBlock
					{...props}
					{...codeblock}
					className={cn("my-0", props.className, codeblock?.className)}
				>
					<Pre>{props.children}</Pre>
				</CodeBlock>
			),
		},
	});
}
