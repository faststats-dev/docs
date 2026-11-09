import { createOpenAPIPage, type OpenAPIPageProps } from "fumadocs-openapi/ui";
import { ContentProvider, type ProviderProps } from "@/components/provider";

const OpenAPIPage = createOpenAPIPage();

export interface APIPageProps extends Omit<ProviderProps, "children"> {
	page: OpenAPIPageProps;
}

/** The content island of pages generated from the OpenAPI schema. */
export function APIPage({ page, ...provider }: APIPageProps) {
	return (
		<ContentProvider {...provider}>
			<OpenAPIPage {...page} />
		</ContentProvider>
	);
}
