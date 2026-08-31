/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_FASTSTATS_SITE_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
