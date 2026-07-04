import type { Metadata } from "next";
import { DocsNotFound } from "@/components/docs/docs-not-found";

export const metadata: Metadata = {
	title: "Page not found",
};

export default function NotFound() {
	return <DocsNotFound />;
}
