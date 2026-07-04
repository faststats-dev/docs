import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { SiteBrand } from "@/components/site-brand";

export function DocsNotFound() {
	return (
		<div className="grid min-h-dvh grid-rows-[auto_1fr]">
			<header className="border-border border-b px-6 py-4">
				<Link href="/platform" className="w-fit">
					<SiteBrand />
				</Link>
			</header>
			<main className="flex flex-col items-center justify-center px-6 py-12 text-center">
				<div className="flex max-w-lg flex-col items-center gap-8">
					<div className="space-y-4">
						<p className="text-muted-foreground text-xs">Error 404</p>
						<h1 className="text-4xl font-medium tracking-tight md:text-5xl">
							Page not found
						</h1>
						<p className="text-muted-foreground text-lg leading-relaxed">
							The page you&apos;re looking for doesn&apos;t exist or has been
							moved to a different URL.
						</p>
					</div>
					<div className="flex flex-col gap-3 sm:flex-row">
						<Link
							href="/platform"
							className="border-border bg-secondary text-secondary-foreground hover:bg-accent inline-flex h-11 items-center justify-center gap-2 border px-6 text-sm font-medium transition-colors"
						>
							<ArrowLeft className="size-4" />
							Back to docs
						</Link>
						<Link
							href="https://faststats.dev"
							className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center gap-2 px-6 text-sm font-medium transition-colors"
						>
							<Home className="size-4" />
							Go to FastStats
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
}
