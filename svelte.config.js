import { transformerNotationDiff } from '@shikijs/transformers';
import { transformerTwoslash, rendererRich } from '@shikijs/twoslash';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import readingTime from 'mdsvex-reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import rehypeToc from 'rehype-toc';
import { createHighlighter } from 'shiki';

const theme = 'catppuccin-mocha';
const highlighter = await createHighlighter({
	themes: [theme],
	langs: ['js', 'ts', 'svelte', 'json', 'fish', 'py', 'html', 'shell', 'rust', 'elixir']
});

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang,
					theme,
					transformers: [
						transformerNotationDiff(),
						transformerTwoslash({ explicitTrigger: true, renderer: rendererRich() })
					]
				})
			);
			return `{@html \`${html}\`}`;
		}
	},
	remarkPlugins: [readingTime],
	rehypePlugins: [
		rehypeSlug,
		() =>
			rehypeToc({
				customizeTOC: (toc) => ({
					type: 'element',
					tagName: 'details',
					properties: { className: 'toc' },
					children: [
						{
							type: 'element',
							tagName: 'summary',
							properties: { className: 'toc' },
							children: [{ type: 'text', value: 'Table of Contents' }]
						},
						toc
					]
				})
			}),
		() => rehypeExternalLinks({ target: '_blank' }),
		() =>
			rehypeAutolinkHeadings({
				behavior: 'append',
				properties: { className: 'link-headings', title: 'link-heading' }
			})
	],
	extensions: ['.md', '.svx']
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		experimental: {
			remoteFunctions: true
		},
		adapter: adapter(),
		alias: {
			$i18n: './src/lib/paraglide',
			YouTube: './src/lib/components/content/YouTube.svelte',
			Figure: './src/lib/components/content/Figure.svelte',
			BlockQuote: './src/lib/components/content/BlockQuote.svelte'
		},
		version: {
			pollInterval: 1000 * 60 * 60 * 2
		}
	},
	compilerOptions: {
		experimental: { async: true }
	},
	extensions: ['.svelte', '.svx', '.md', '.html']
};

export default config;
