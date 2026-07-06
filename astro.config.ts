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
import starlightLlmsTxt from 'starlight-llms-txt'

const site = process.env.NODE_ENV === 'production' ? 'https://docs.faststats.dev' : 'http://localhost:4321';

// https://astro.build/config
export default defineConfig({
    site,
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [
        react(),
        devServerFileWatcher([
            './src/integrations/*.ts',
            './ec.config.mjs',
            './openapi.config.ts',
            './starlight.config.ts',
            './starlight.sidebar.ts',
        ]),
        starlight({
            ...baseStarlightOptions,
            plugins: [
                starlightLlmsTxt({
                    projectName: "FastStats",
                }),
                starlightCopyButton({
                    label: "Copy Markdown",
                }),
                starlightOpenAPI(openAPIConfig),
                starlightSidebarTopicsPlugin(sidebarConfig, sidebarTopicsExtras)
            ]
        })
    ],
});