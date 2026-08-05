"use client";

import { cn } from "cnfast";
import { type ComponentProps, type ReactNode, useId } from "react";
import * as Unstyled from "@/components/ui/tabs";

const tabPanelClassName =
	"bg-fd-card p-0 text-[0.9375rem] outline-none prose-no-margin";

export interface TabsProps extends Omit<
	ComponentProps<typeof Unstyled.Tabs>,
	"value" | "onValueChange"
> {
	items?: string[];
	defaultIndex?: number;
	label?: ReactNode;
}

export function TabsList({
	className,
	...props
}: ComponentProps<typeof Unstyled.TabsList>) {
	return (
		<Unstyled.TabsList
			{...props}
			className={(s) =>
				cn(
					"not-prose flex gap-3.5 overflow-x-auto px-4 text-fd-secondary-foreground",
					typeof className === "function" ? className(s) : className,
				)
			}
		/>
	);
}

export function TabsTrigger({
	className,
	value,
	...props
}: ComponentProps<typeof Unstyled.TabsTrigger>) {
	return (
		<Unstyled.TabsTrigger
			value={value}
			data-value={value}
			{...props}
			className={(s) =>
				cn(
					"inline-flex items-center gap-2 border-b border-transparent py-2 text-sm font-medium whitespace-nowrap text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active]:border-fd-primary data-[active]:text-fd-primary [&_svg]:size-4",
					typeof className === "function" ? className(s) : className,
				)
			}
		/>
	);
}

export function Tabs({
	ref,
	className,
	items,
	label,
	defaultIndex = 0,
	groupId,
	persist,
	updateAnchor,
	...props
}: TabsProps) {
	const tabId = useId();
	const panelValues = items?.map(escapeValue) ?? [];
	const defaultValue = items
		? escapeValue(items[Number(defaultIndex)] ?? items[0])
		: undefined;

	return (
		<>
			{panelValues.length > 0 ? (
				<style
					dangerouslySetInnerHTML={{
						__html: `[data-tab-id="${tabId}"] > [data-tab-panel]{display:none}${panelValues
							.map(
								(value) =>
									`[data-tab-id="${tabId}"][data-tab-value="${value}"] > [data-tab-panel="${value}"]{display:block}`,
							)
							.join("")}`,
					}}
				/>
			) : null}
			<Unstyled.Tabs
				ref={ref}
				data-tab-id={tabId}
				className={(s) =>
					cn(
						"my-4 flex flex-col overflow-hidden rounded-xl border bg-fd-secondary",
						typeof className === "function" ? className(s) : className,
					)
				}
				groupId={groupId}
				persist={persist}
				updateAnchor={updateAnchor}
				defaultValue={defaultValue}
				{...props}
			>
				{items ? (
					<TabsList>
						{label ? (
							<span className="my-auto me-auto text-sm font-medium">
								{label}
							</span>
						) : null}
						{items.map((item) => (
							<TabsTrigger key={item} value={escapeValue(item)}>
								{item}
							</TabsTrigger>
						))}
					</TabsList>
				) : null}
				{props.children}
			</Unstyled.Tabs>
		</>
	);
}

export interface TabProps extends Omit<
	ComponentProps<typeof Unstyled.TabsContent>,
	"value"
> {
	value?: string;
}

export function Tab({ value, className, ...props }: TabProps) {
	if (!value) return null;

	return (
		<Unstyled.TabsContent
			value={escapeValue(value)}
			className={cn(tabPanelClassName, className)}
			{...props}
		/>
	);
}

function escapeValue(v: string): string {
	return v.toLowerCase().replace(/\s/g, "-");
}
