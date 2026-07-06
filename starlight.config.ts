import type { StarlightUserConfig } from '@astrojs/starlight/types';

export const baseStarlightOptions: StarlightUserConfig = {
    credits: true, // Display the "Powered by Starlight" credits in the footer of the site

    title: 'FastStats Docs',
    description: 'Error tracking, session replays, web vitals, funnels, and retention in one platform — stop stitching five tools together. Free during closed beta.',
    tagline: 'Product Analytics That Makes Sense',

    favicon: '/icon-dark.svg',
    logo: {
        dark: './src/assets/icon-dark.svg',
        light: './src/assets/icon-light.svg',
    },

    disable404Route: true,

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
}