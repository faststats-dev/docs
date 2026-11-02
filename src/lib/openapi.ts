import { createOpenAPI } from "fumadocs-openapi/server";

const openApiUrl = "https://api.faststats.dev/openapi.json";

const schema = await fetch(openApiUrl).then((response) => {
	if (!response.ok) {
		throw new Error(
			`Failed to fetch OpenAPI schema from ${openApiUrl}: ${response.status}`,
		);
	}

	return response.json();
});

export const openapi = createOpenAPI({
	input: {
		[openApiUrl]: schema,
	},
});
