import { Analytics } from "@faststats/react";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	icons: {
		icon: [
			{ url: "/icon-light.svg", media: "(prefers-color-scheme: light)" },
			{ url: "/icon-dark.svg", media: "(prefers-color-scheme: dark)" },
		],
	},
};

export default function Layout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="bg-background text-foreground flex min-h-screen flex-col font-sans antialiased">
				<Analytics
					siteKey="b68a45b56dfa5b93cba758c07d64a707"
					webVitals={{ enabled: true }}
					sessionReplays={{ enabled: true }}
					errorTracking={{ enabled: true }}
				/>
				<RootProvider search={{ options: { api: "/docs-search" } }}>
					{children}
				</RootProvider>
			</body>
		</html>
	);
}
