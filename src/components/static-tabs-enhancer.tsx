"use client";

import { useLayoutEffect } from "react";

function syncTabPanels(root: HTMLElement, active: string | undefined) {
	for (const panel of root.querySelectorAll<HTMLElement>("[data-tab-panel]")) {
		panel.hidden = panel.dataset.tabPanel !== active;
	}
}

function setActiveTrigger(root: HTMLElement, active: string | undefined) {
	for (const trigger of root.querySelectorAll<HTMLElement>('[role="tab"]')) {
		const selected = trigger.dataset.value === active;
		trigger.setAttribute("aria-selected", String(selected));
		trigger.toggleAttribute("data-active", selected);
	}
}

function enhanceTabRoot(root: HTMLElement) {
	if (root.dataset.tabEnhanced === "true") return;
	root.dataset.tabEnhanced = "true";

	const groupId = root.dataset.tabGroupId;
	if (groupId) {
		const stored = sessionStorage.getItem(groupId);
		if (stored) root.dataset.tabValue = stored;
	}

	setActiveTrigger(root, root.dataset.tabValue);
	syncTabPanels(root, root.dataset.tabValue);

	for (const trigger of root.querySelectorAll<HTMLElement>('[role="tab"]')) {
		trigger.addEventListener("click", () => {
			const value = trigger.dataset.value;
			if (!value) return;

			const apply = (target: HTMLElement) => {
				target.dataset.tabValue = value;
				setActiveTrigger(target, value);
				syncTabPanels(target, value);
			};

			if (groupId) {
				sessionStorage.setItem(groupId, value);
				for (const linked of document.querySelectorAll<HTMLElement>(
					`[data-tab-root][data-tab-group-id="${groupId}"]`,
				)) {
					apply(linked);
				}
				return;
			}

			apply(root);
		});
	}
}

function enhanceStaticTabs() {
	for (const root of document.querySelectorAll<HTMLElement>("[data-tab-root]")) {
		enhanceTabRoot(root);
	}
}

export function StaticTabsEnhancer() {
	useLayoutEffect(() => {
		enhanceStaticTabs();

		document.addEventListener("astro:page-load", enhanceStaticTabs);
		return () => {
			document.removeEventListener("astro:page-load", enhanceStaticTabs);
		};
	}, []);

	return null;
}
