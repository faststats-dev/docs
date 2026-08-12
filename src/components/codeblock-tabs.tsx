"use client";

import { cn } from "cnfast";
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

export { CodeBlockTab, CodeBlockTabs, CodeBlockTabsList, CodeBlockTabsTrigger };
