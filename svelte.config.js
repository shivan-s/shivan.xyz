import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeToc from 'rehype-toc';
import rehypeExternalLinks from 'rehype-external-links';
import readingTime from 'mdsvex-reading-time';
import adapter from '@sveltejs/adapter-static';

const theme = 'catppuccin-mocha';
const highlighter = await createHighlighter({
	themes: [theme],
	langs: ['js', 'ts', 'svelte', 'json', 'fish', 'py', 'html', 'shell', 'rust']
});

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }));
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
		() => rehypeAutolinkHeadings({ behavior: 'append', properties: { className: 'link-headings' } })
	],
	extensions: ['.md']
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
		}
	},
	compilerOptions: {
		experimental: { async: true }
	},
	extensions: ['.svelte', '.md']
};

export default config;
