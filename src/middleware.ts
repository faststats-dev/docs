import { defineMiddleware } from "astro:middleware";

const exactRedirects: Record<string, string> = {
	"/retention": "/platform/retention",
	"/web-vitals": "/platform/web-vitals",
	"/web": "/web-analytics",
};

const prefixRedirects = [
	{
		pattern: /^\/guide\/(.*)$/,
		target: (match: RegExpMatchArray) => `/platform/guide/${match[1]}`,
	},
	{
		pattern: /^\/chart-editor\/(.*)$/,
		target: (match: RegExpMatchArray) => `/platform/chart-editor/${match[1]}`,
	},
	{
		pattern: /^\/error-tracking\/(.*)$/,
		target: (match: RegExpMatchArray) => `/platform/error-tracking/${match[1]}`,
	},
];

export const onRequest = defineMiddleware((context, next) => {
	const { pathname } = context.url;

	const exactTarget = exactRedirects[pathname];
	if (exactTarget) return context.redirect(exactTarget, 301);

	for (const { pattern, target } of prefixRedirects) {
		const match = pathname.match(pattern);
		if (match) return context.redirect(target(match), 301);
	}

	return next();
});
