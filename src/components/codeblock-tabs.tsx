"use client";

import { cn } from "cnfast";
import type { ComponentProps } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function resolveClassName(
	className: ComponentProps<typeof Tabs>["className"],
): string | undefined {
	return typeof className === "string" ? className : undefined;
}

function CodeBlockTabs({ className, ...props }: ComponentProps<typeof Tabs>) {
	return (
		<Tabs
			{...props}
			className={cn(
				"my-4 overflow-hidden border bg-fd-card [&>[data-tab-panel]>figure]:m-0 [&>[data-tab-panel]>figure]:-mx-px [&>[data-tab-panel]>figure]:-mb-px [&>[data-tab-panel]>figure]:border-x [&>[data-tab-panel]>figure]:shadow-none",
				resolveClassName(className),
			)}
		/>
	);
}

function CodeBlockTabsList({
	className,
	...props
}: ComponentProps<typeof TabsList>) {
	return (
		<TabsList
			{...props}
			className={cn(
				"flex flex-row overflow-x-auto px-2 text-fd-muted-foreground",
				typeof className === "string" ? className : undefined,
			)}
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
			className={cn(
				"group relative inline-flex items-center gap-2 px-2 py-1.5 text-sm font-medium whitespace-nowrap text-fd-muted-foreground hover:text-fd-accent-foreground data-active:text-fd-primary [&_svg]:size-3.5",
				typeof className === "string" ? className : undefined,
			)}
		>
			<span className="group-data-active:bg-fd-primary absolute inset-x-2 bottom-0 h-px" />
			{children}
		</TabsTrigger>
	);
}

function CodeBlockTab(props: ComponentProps<typeof TabsContent>) {
	return <TabsContent keepMounted {...props} />;
}

export { CodeBlockTab, CodeBlockTabs, CodeBlockTabsList, CodeBlockTabsTrigger };
