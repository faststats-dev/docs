import { glob } from 'node:fs/promises';
import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';

/**
 * Astro integration that registers the passed paths so that saving them triggers a dev server
 * restart.
 *
 * It also supports passing glob patterns to watch a set of files matching a specific pattern.
 *
 * @param paths Array of file paths relative to the project root.
 *
 * @example
 * // astro.config.mjs
 * export default {
 *   integrations: [
 *     devServerFileWatcher(["./example.js", "./src/content/demo/*.yml"]),
 *   ],
 * }
 */
export const devServerFileWatcher = (paths: string[]) =>
	({
		name: 'dev-server-file-watcher',
		hooks: {
			async 'astro:config:setup'({ addWatchFile, config }) {
				const cwd = fileURLToPath(config.root);

				for (const path of paths) {
					for await (const file of glob(path, { cwd })) {
						addWatchFile(new URL(file, config.root));
					}
				}
			},
		},
	}) satisfies AstroIntegration;
