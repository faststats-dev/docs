import { ArrowLeft, Home } from "lucide-react";

export function DocsNotFound() {
	return (
		<main className="flex flex-col min-h-dvh items-center px-6 py-12 text-center">
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
					<a
						href="/platform"
						className="inline-flex h-11 min-w-[160px] items-center justify-center gap-2 border border-[#343a46] bg-[#23272f] px-6 text-sm font-medium text-white transition-colors hover:bg-[#2a2f38]"
					>
						<ArrowLeft className="size-4" />
						Back to docs
					</a>
					<a
						href="https://faststats.dev"
						className="inline-flex h-11 min-w-[160px] items-center justify-center gap-2 border border-[#ff7a00] bg-[#ff7a00] px-6 text-sm font-medium text-white transition-colors hover:bg-[#e66f00]"
					>
						<Home className="size-4" />
						Go to FastStats
					</a>
				</div>
			</div>
		</main>
	);
}
