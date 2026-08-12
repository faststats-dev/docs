"use client";

import { cn } from "cnfast";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { useCopyButton } from "fumadocs-ui/utils/use-copy-button";
import { Check, Clipboard } from "lucide-react";
import {
	type ComponentProps,
	createContext,
	use,
	useMemo,
	useRef,
} from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mergeRefs } from "@/lib/merge-refs";

const TabsContext = createContext<{
	containerRef: React.RefObject<HTMLDivElement | null>;
	nested: boolean;
} | null>(null);

function Pre(props: ComponentProps<"pre">) {
	return (
		<pre
			{...props}
			className={cn("min-w-full w-max *:flex *:flex-col", props.className)}
		/>
	);
}

function CodeBlock({
	ref,
	title,
	allowCopy = true,
	keepBackground = false,
	icon,
	viewportProps = {},
	children,
	Actions = (props) => (
		<div {...props} className={cn("empty:hidden", props.className)} />
	),
	...props
}: ComponentProps<"figure"> & {
	ref?: React.Ref<HTMLElement>;
	title?: React.ReactNode;
	allowCopy?: boolean | "true" | "false";
	keepBackground?: boolean;
	icon?: React.ReactNode;
	viewportProps?: ComponentProps<"section">;
	Actions?: (props: ComponentProps<"div">) => React.ReactNode;
	"data-line-numbers"?: boolean;
	"data-line-numbers-start"?: number;
}) {
	const inTab = use(TabsContext) !== null;
	const areaRef = useRef<HTMLElement>(null);
	if (allowCopy === "true") allowCopy = true;
	else if (allowCopy === "false") allowCopy = false;

	return (
		<figure
			ref={ref}
			dir="ltr"
			{...props}
			tabIndex={-1}
			className={cn(
				inTab
					? "bg-fd-secondary -mx-px -mb-px last:rounded-b-xl"
					: "my-4 bg-fd-card rounded-xl border shadow-sm",
				keepBackground && "bg-(--shiki-light-bg) dark:bg-(--shiki-dark-bg)",
				"shiki relative border shadow-sm not-prose overflow-hidden text-sm",
				props.className,
			)}
		>
			{title ? (
				<div className="text-fd-muted-foreground flex h-9.5 items-center gap-2 border-b px-4">
					{typeof icon === "string" ? (
						<div
							className="[&_svg]:size-3.5"
							dangerouslySetInnerHTML={{ __html: icon }}
						/>
					) : (
						icon
					)}
					<figcaption className="flex-1 truncate">{title}</figcaption>
					<Actions className="-me-2">
						{allowCopy ? <CopyButton containerRef={areaRef} /> : null}
					</Actions>
				</div>
			) : (
				<Actions className="text-fd-muted-foreground absolute top-2 right-2 z-2 rounded-lg backdrop-blur-lg">
					{allowCopy ? <CopyButton containerRef={areaRef} /> : null}
				</Actions>
			)}
			<section
				ref={areaRef}
				{...viewportProps}
				className={cn(
					"text-[0.8125rem] py-3.5 overflow-auto max-h-[600px] fd-scroll-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fd-ring",
					viewportProps.className,
				)}
				style={
					{
						"--padding-right": !title ? "calc(var(--spacing) * 8)" : undefined,
						counterSet: props["data-line-numbers"]
							? `line ${Number(props["data-line-numbers-start"] ?? 1) - 1}`
							: undefined,
						...viewportProps.style,
					} as React.CSSProperties
				}
			>
				{children}
			</section>
		</figure>
	);
}

function CopyButton({
	className,
	containerRef,
	...props
}: ComponentProps<"button"> & {
	containerRef: React.RefObject<HTMLElement | null>;
}) {
	const [checked, onClick] = useCopyButton(() => {
		const pre = containerRef.current?.getElementsByTagName("pre").item(0);
		if (!pre) return;
		const clone = pre.cloneNode(true) as HTMLElement;
		clone.querySelectorAll(".nd-copy-ignore").forEach((node) => {
			node.replaceWith("\n");
		});
		navigator.clipboard.writeText(clone.textContent ?? "");
	});

	return (
		<button
			type="button"
			data-checked={checked || undefined}
			className={cn(
				buttonVariants({
					className:
						"hover:text-fd-accent-foreground data-checked:text-fd-accent-foreground",
					size: "icon-xs",
				}),
				className,
			)}
			aria-label={checked ? "Copied" : "Copy"}
			onClick={onClick}
			{...props}
		>
			{checked ? <Check /> : <Clipboard />}
		</button>
	);
}

function CodeBlockTabs({
	ref,
	className,
	...props
}: ComponentProps<typeof Tabs>) {
	const containerRef = useRef<HTMLDivElement>(null);
	const nested = use(TabsContext) !== null;

	return (
		<Tabs
			ref={mergeRefs(containerRef, ref)}
			{...props}
			className={(s) =>
				cn(
					"bg-fd-card rounded-xl border",
					!nested && "my-4",
					typeof className === "function" ? className(s) : className,
				)
			}
		>
			<TabsContext
				value={useMemo(
					() => ({
						containerRef,
						nested,
					}),
					[nested],
				)}
			>
				{props.children}
			</TabsContext>
		</Tabs>
	);
}

function CodeBlockTabsList({
	className,
	...props
}: ComponentProps<typeof TabsList>) {
	return (
		<TabsList
			{...props}
			className={(s) =>
				cn(
					"flex flex-row px-2 overflow-x-auto text-fd-muted-foreground",
					typeof className === "function" ? className(s) : className,
				)
			}
		/>
	);
}

function CodeBlockTabsTrigger({
	children,
	className,
	...props
}: ComponentProps<typeof TabsTrigger>) {
	return (
		<TabsTrigger
			{...props}
			data-value={props.value}
			className={(s) =>
				cn(
					"relative group inline-flex text-sm font-medium text-nowrap items-center transition-colors gap-2 px-2 py-1.5 [&_svg]:size-3.5",
					s.active ? "text-fd-primary" : "hover:text-fd-accent-foreground",
					typeof className === "function" ? className(s) : className,
				)
			}
		>
			<div className="group-data-active:bg-fd-primary absolute inset-x-2 bottom-0 h-px" />
			{children}
		</TabsTrigger>
	);
}

function CodeBlockTab(props: ComponentProps<typeof TabsContent>) {
	return <TabsContent keepMounted {...props} />;
}

export {
	CodeBlock,
	CodeBlockTab,
	CodeBlockTabs,
	CodeBlockTabsList,
	CodeBlockTabsTrigger,
	Pre,
};
