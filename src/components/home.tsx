import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Provider, type ProviderProps } from "@/components/provider";
import { baseOptions } from "@/lib/layout.shared";

/** The layout island of pages outside the docs; the content arrives as `children`. */
export function Home({ children, ...provider }: ProviderProps) {
	return (
		<Provider {...provider}>
			<HomeLayout {...baseOptions()}>{children}</HomeLayout>
		</Provider>
	);
}
