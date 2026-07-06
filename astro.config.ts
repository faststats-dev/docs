// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSidebarTopicsPlugin from 'starlight-sidebar-topics';
import { devServerFileWatcher } from './src/integrations/dev-file-watcher';
import starlightCopyButton from 'starlight-copy-button';
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: "https://docs.faststats.dev",

    integrations: [
        react(),
        devServerFileWatcher([
            './src/integrations/*.ts',
        ]),
        starlight({
            title: 'FastStats Docs',
            description: 'Error tracking, session replays, web vitals, funnels, and retention in one platform — stop stitching five tools together. Free during closed beta.',
            tagline: 'Product Analytics That Makes Sense',

            favicon: '/icon-dark.svg',
            logo: {
                dark: './src/assets/icon-dark.svg',
                light: './src/assets/icon-light.svg',
            },

            head: [
                {
                    tag: 'link',
                    attrs: {
                        rel: 'icon',
                        href: '/icon-light.svg',
                        media: '(prefers-color-scheme: light)',
                    },
                },
                {
                    tag: 'link',
                    attrs: {
                        rel: 'icon',
                        href: '/icon-dark.svg',
                        media: '(prefers-color-scheme: dark)',
                    },
                }
            ],

            social: [
                { icon: 'github', label: 'GitHub', href: 'https://github.com/faststats-dev' },
                { icon: 'discord', label: 'Discord', href: 'https://discord.com/invite/SKnDU5VwMS' },
            ],

            components: {
                Sidebar: './src/components/starlight/Sidebar.astro',
                ContentPanel: './src/components/starlight/ContentPanel.astro',
            },

            routeMiddleware: './src/routeData.ts',

            customCss: [
                './src/styles/global.css',
            ],

            editLink: {
                baseUrl: 'https://github.com/faststats-dev/docs/tree/main',
            },

            plugins: [
                starlightCopyButton({
                    label: "Copy Markdown",
                }),
                starlightOpenAPI([
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
                ]),
                starlightSidebarTopicsPlugin([
                    {
                        label: 'Platform',
                        id: 'platform',
                        link: '/platform/',
                        icon: 'puzzle',
                        items: [
                            'platform',
                            'platform/hotkeys',
                            'platform/guide/embed',
                            'platform/guide/badges',
                            {
                                label: 'Chart Editor',
                                items: [{ autogenerate: { directory: 'platform/chart-editor' } }],
                            },
                            'platform/error-tracking',
                            'platform/retention'
                        ],
                    },
                    {
                        label: 'Java',
                        id: 'java',
                        link: '/java/',
                        icon: 'seti:java',
                        items: [{ autogenerate: { directory: 'java' } }],
                    },
                    {
                        label: 'Rest API',
                        id: 'api',
                        link: '/api/',
                        icon: 'open-book',
                        items: [{ autogenerate: { directory: 'api' } }, ...openAPISidebarGroups],
                    },
                    {
                        label: 'Web Analytics',
                        id: 'web-analytics',
                        link: '/web-analytics/',
                        icon: 'analytics',
                        items: [{ autogenerate: { directory: 'web-analytics' } }],
                        badge: {
                            text: "Coming Soon",
                            variant: 'tip'
                        }
                    }
                ], {
                    topics: {
                        api: ['/api/**/*']
                    }
                })
            ]
        })
    ],

    vite: {
        plugins: [tailwindcss()],
    },
});