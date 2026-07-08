import { defineEcConfig } from '@astrojs/starlight/expressive-code';
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets';

export default defineEcConfig({
	shiki: {
		transformers: [transformerColorizedBrackets()],
	},
	themes: ['dark-plus', 'light-plus'],
	styleOverrides: {
		borderRadius: '0px',
		borderColor: 'var(--sl-color-hairline)',
		frames: {
			editorActiveTabIndicatorBottomColor: 'var(--sl-color-accent)',
			frameBoxShadowCssValue: 'none',
		},
	},
});
