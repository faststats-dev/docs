
import { openAPISidebarGroups } from 'starlight-openapi';
import type { StarlightSidebarTopicsUserConfig, StarlightSidebarTopicsUserOptions } from 'starlight-sidebar-topics';

export const sidebarTopicsExtras: StarlightSidebarTopicsUserOptions = {
    topics: {
        api: ['/api/**/*']
    }
}

export const sidebarConfig: StarlightSidebarTopicsUserConfig = [
    {
        label: 'Platform',
        id: 'platform',
        link: '/platform/',
        icon: 'puzzle',
        items: [
            {
                label: 'Overview',
                items: [
                    'platform',
                    'platform/hotkeys',
                    'platform/error-tracking',
                    'platform/retention'
                ]
            },
            {
                label: 'Guides',
                items: [{ autogenerate: { directory: 'platform/guide' } }],
            },
            {
                label: 'Chart Editor',
                items: [{ autogenerate: { directory: 'platform/chart-editor' } }],
            }
        ],
    },
    {
        label: 'Java',
        id: 'java',
        link: '/java/',
        icon: 'seti:java',
        items: [
            {
                label: 'Configuration',
                items: [
                    'java',
                    'java/migration',
                    'java/configuration',
                    'java/custom-metrics',
                    'java/error-tracking',
                    'java/feature-flags',
                ]
            },
            {
                label: 'Platforms',
                items: [{ autogenerate: { directory: 'java/platform' } }],
            },
            {
                label: 'Advanced',
                items: [
                    'java/obfuscation-mappings',
                    'java/system-properties',
                ]
            }
        ],
    },
    {
        label: 'Rest API',
        id: 'api',
        link: '/api/',
        icon: 'open-book',
        items: openAPISidebarGroups,
    },
    {
        label: 'Web Analytics',
        id: 'web-analytics',
        link: '/web-analytics/',
        icon: 'analytics',
        badge: {
            text: "Coming Soon",
            variant: 'tip'
        },
        items: [
            {
                label: 'Getting Started',
                items: [
                    'web-analytics',
                    'web-analytics/react',
                    'web-analytics/nuxt',
                    'web-analytics/javascript',
                ]
            },
            {
                label: 'Usage',
                items: [
                    'web-analytics/configuration',
                    'web-analytics/events',
                    'web-analytics/identify',
                    'web-analytics/consent',
                ]
            },
            {
                label: 'Features',
                items: [
                    'web-analytics/error-tracking',
                    'web-analytics/sourcemaps',
                    'web-analytics/web-vitals',
                    'web-analytics/session-replay',
                    'web-analytics/feature-flags',
                ]
            }
        ]
    }
];