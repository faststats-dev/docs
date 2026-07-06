// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSidebarTopicsPlugin from 'starlight-sidebar-topics';
import { devServerFileWatcher } from './src/integrations/dev-file-watcher';
import starlightCopyButton from 'starlight-copy-button';
import starlightOpenAPI from 'starlight-openapi';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { sidebarConfig, sidebarTopicsExtras } from './starlight.sidebar';
import { baseStarlightOptions } from './starlight.config';
import { openAPIConfig } from './openapi.config';

// https://astro.build/config
export default defineConfig({
    site: "https://docs.faststats.dev",

    vite: {
        plugins: [tailwindcss()],
    },

    integrations: [
        react(),
        devServerFileWatcher([
            './src/integrations/*.ts',
            './openapi.config.ts',
            './starlight.config.ts',
            './starlight.sidebar.ts',
        ]),
        starlight({
            ...baseStarlightOptions,
            plugins: [
                starlightCopyButton({
                    label: "Copy Markdown",
                }),
                starlightOpenAPI(openAPIConfig),
                starlightSidebarTopicsPlugin(sidebarConfig, sidebarTopicsExtras)
            ]
        })
    ],
});