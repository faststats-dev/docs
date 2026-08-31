"use client";

import { Tabs as Primitive } from "@base-ui/react/tabs";
import {
	type ComponentProps,
	createContext,
	use,
	useEffectEvent,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { mergeRefs } from "@/lib/merge-refs";

type ChangeListener = (v: string) => void;
const listeners = new Map<string, Set<ChangeListener>>();

export interface TabsProps extends ComponentProps<typeof Primitive.Root> {
	groupId?: string;
	persist?: boolean;
	updateAnchor?: boolean;
	onValueChange?: (value: string) => void;
}

const TabsContext = createContext<{
	value?: string;
	valueToIdMap: Map<string, string>;
} | null>(null);

function useTabContext() {
	return use(TabsContext);
}

export function TabsList({
	className,
	...props
}: ComponentProps<typeof Primitive.List>) {
	const ctx = useTabContext();
	if (!ctx) {
		return (
			<div
				role="tablist"
				{...(props as ComponentProps<"div">)}
				className={typeof className === "function" ? undefined : className}
			>
				{props.children}
			</div>
		);
	}

	return <Primitive.List className={className} {...props} />;
}

export function TabsTrigger({
	className,
	value,
	...props
}: ComponentProps<typeof Primitive.Tab>) {
	const ctx = useTabContext();
	if (!ctx) {
		return (
			<button
				type="button"
				role="tab"
				data-value={value}
				{...(props as ComponentProps<"button">)}
				className={typeof className === "function" ? undefined : className}
			>
				{props.children}
			</button>
		);
	}

	return <Primitive.Tab value={value} className={className} {...props} />;
}

export function Tabs({
	ref,
	groupId,
	persist = false,
	updateAnchor = false,
	defaultValue,
	value: _value,
	onValueChange: _onValueChange,
	...props
}: TabsProps) {
	const tabsRef = useRef<HTMLDivElement>(null);
	const valueToIdMap = useMemo(() => new Map<string, string>(), []);
	const [value, setValue] =
		_value === undefined
			? useState(defaultValue)
			: [_value, useEffectEvent((v: string) => _onValueChange?.(v))];

	useLayoutEffect(() => {
		if (!groupId) return;
		let previous = sessionStorage.getItem(groupId);
		if (persist) previous ??= localStorage.getItem(groupId);
		if (previous) setValue(previous);

		const groupListeners = listeners.get(groupId) ?? new Set();
		groupListeners.add(setValue);
		listeners.set(groupId, groupListeners);
		return () => {
			groupListeners.delete(setValue);
		};
	}, [groupId, persist, setValue]);

	useLayoutEffect(() => {
		const hash = window.location.hash.slice(1);
		if (!hash) return;

		for (const [tabValue, id] of valueToIdMap.entries()) {
			if (id === hash) {
				setValue(tabValue);
				tabsRef.current?.scrollIntoView();
				break;
			}
		}
	}, [setValue, valueToIdMap]);

	return (
		<Primitive.Root
			ref={mergeRefs(ref, tabsRef)}
			value={value}
			data-tab-root=""
			data-tab-value={value}
			data-tab-group-id={groupId}
			onValueChange={(v: string) => {
				if (updateAnchor) {
					const id = valueToIdMap.get(v);
					if (id) window.history.replaceState(null, "", `#${id}`);
				}

				if (groupId) {
					const groupListeners = listeners.get(groupId);
					if (groupListeners) {
						for (const listener of groupListeners) listener(v);
					}
					sessionStorage.setItem(groupId, v);
					if (persist) localStorage.setItem(groupId, v);
				}

				setValue(v);
			}}
			{...props}
		>
			<TabsContext
				value={useMemo(() => ({ value, valueToIdMap }), [value, valueToIdMap])}
			>
				{props.children}
			</TabsContext>
		</Primitive.Root>
	);
}

export function TabsContent({
	value,
	className,
	children,
	hidden: hiddenProp,
	id,
	keepMounted: _keepMounted,
	...props
}: ComponentProps<typeof Primitive.Panel>) {
	const ctx = useTabContext();
	const resolvedClassName =
		typeof className === "function" ? undefined : className;
	const hidden =
		hiddenProp ?? (ctx?.value !== undefined && ctx.value !== value);

	if (ctx && id) {
		ctx.valueToIdMap.set(value, id);
	}

	return (
		<div
			data-tab-panel={value}
			hidden={hidden}
			id={id}
			className={resolvedClassName}
			{...(props as ComponentProps<"div">)}
		>
			{children}
		</div>
	);
}
