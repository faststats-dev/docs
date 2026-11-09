import { navigate } from "astro:transitions/client";
import { RootProvider } from "fumadocs-ui/provider/astro";
import { lazy, type ReactNode } from "react";

const SearchDialog = lazy(() => import("@/components/search"));

export interface ProviderProps {
	/** `Astro.url.pathname` */
	pathname: string;
	/** `Astro.params` */
	params: Record<string, string | undefined>;
	children?: ReactNode;
}

/** Providers of the layout islands: theme, search and Astro navigation. */
export function Provider({ pathname, params, children }: ProviderProps) {
	return (
		<RootProvider
			pathname={pathname}
			params={params}
			navigate={navigate}
			search={{ SearchDialog }}
		>
			{children}
		</RootProvider>
	);
}

/**
 * Providers of content islands (MDX and API pages). They are React trees of
 * their own, so theme and search stay with the layout island.
 */
export function ContentProvider({ pathname, params, children }: ProviderProps) {
	return (
		<RootProvider
			pathname={pathname}
			params={params}
			navigate={navigate}
			theme={{ enabled: false }}
			search={{ enabled: false }}
		>
			{children}
		</RootProvider>
	);
}
