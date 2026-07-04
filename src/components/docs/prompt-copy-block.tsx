"use client";

import { useTrack } from "@faststats/react";
import { Check, ChevronDown, ChevronUp, Copy } from "lucide-react";
import { useMemo, useState } from "react";

const MAX_LINES = 4;

function normalizeForCopy(text: string): string {
	const normalized = text.replace(/\r\n?/g, "\n").trim();
	const lines = normalized.split("\n");
	const nonEmpty = lines.filter((line) => line.trim().length > 0);
	const minIndent =
		nonEmpty.length === 0
			? 0
			: Math.min(
					...nonEmpty.map((line) => line.match(/^\s*/)?.[0].length ?? 0),
				);
	const dedented = lines.map((line) =>
		line.length >= minIndent ? line.slice(minIndent) : line,
	);
	const joined = dedented
		.map((line) => line.trimEnd())
		.join("\n")
		.replace(/\n{3,}/g, "\n\n")
		.trim();
	return joined ? `${joined}\n` : joined;
}

export function PromptCopyBlock({ prompt }: { prompt: string }) {
	const [copied, setCopied] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const track = useTrack();

	const copyText = useMemo(() => normalizeForCopy(prompt), [prompt]);
	const displayContent = useMemo(
		() => (copyText.endsWith("\n") ? copyText.slice(0, -1) : copyText),
		[copyText],
	);
	const lines = useMemo(() => displayContent.split("\n"), [displayContent]);
	const isTruncated = lines.length > MAX_LINES;
	const displayText = expanded
		? displayContent
		: lines.slice(0, MAX_LINES).join("\n") + (isTruncated ? "\n…" : "");

	const handleCopy = async () => {
		await navigator.clipboard.writeText(copyText);
		setCopied(true);
		track("java_copy_prompt");
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="not-prose border-fd-border bg-fd-secondary my-4 flex flex-col overflow-hidden rounded-xl border">
			<div className="text-fd-secondary-foreground flex items-center justify-between gap-3.5 border-b border-transparent px-4 py-2">
				<span className="text-fd-muted-foreground text-sm font-medium">
					AI Setup Prompt
				</span>
				<button
					type="button"
					onClick={handleCopy}
					className="text-fd-muted-foreground hover:text-fd-accent-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors [&_svg]:size-4"
				>
					{copied ? (
						<Check className="size-3.5" />
					) : (
						<Copy className="size-3.5" />
					)}
					{copied ? "Copied" : "Copy"}
				</button>
			</div>
			<div className="bg-fd-background relative rounded-xl">
				<pre className="text-fd-muted-foreground bg-fd-card overflow-x-auto px-4 py-3 font-mono text-[0.9375rem] leading-relaxed wrap-break-word whitespace-pre-wrap">
					{displayText}
				</pre>
				{!expanded && isTruncated && (
					<div className="from-fd-background pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t to-transparent" />
				)}
			</div>
			{isTruncated && (
				<button
					type="button"
					onClick={() => setExpanded(!expanded)}
					className="border-fd-border text-fd-muted-foreground hover:bg-fd-secondary hover:text-fd-accent-foreground flex w-full items-center justify-center gap-2 border-t px-4 py-2 text-sm font-medium transition-colors"
				>
					{expanded ? (
						<>
							<ChevronUp className="size-4" />
							Show less
						</>
					) : (
						<>
							<ChevronDown className="size-4" />
							Show full prompt
						</>
					)}
				</button>
			)}
		</div>
	);
}
