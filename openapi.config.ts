
import integration from 'starlight-openapi';

export type StarlightOpenAPIUserConfig = Parameters<typeof integration>[0];

export const openAPIConfig: StarlightOpenAPIUserConfig = [
    {
        base: "api",
        sidebar: {
            label: "API Reference",
            operations: {
                badges: true,
                labels: 'summary',
            }
        },
        snippets: {
            operation: {
                clients: {
                    shell: ['curl'],
                    javascript: ['fetch'],
                    go: ['nethttp'],
                    java: ['nethttp'],
                    csharp: ['httpclient']
                },
            }
        },
        schema: "https://api.faststats.dev/openapi.json",
    }
];