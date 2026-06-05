import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { transformerNotationDiff } from '@shikijs/transformers';
import adapter from '@sveltejs/adapter-static';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte, type MdsvexOptions } from 'mdsvex';
import readingTime from 'mdsvex-reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import rehypeToc from 'rehype-toc';
import { createHighlighter } from 'shiki';
import { defineConfig } from 'vite';

const theme = 'catppuccin-mocha';
const highlighter = await createHighlighter({
	themes: [theme],
	langs: ['js', 'ts', 'svelte', 'json', 'fish', 'py', 'html', 'shell', 'rust', 'elixir']
});

const mdsvexOptions: MdsvexOptions = {
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const html = escapeSvelte(
				highlighter.codeToHtml(code, { lang, theme, transformers: [transformerNotationDiff()] })
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

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit({
			preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
			compilerOptions: {
				experimental: { async: true }
			},
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
			},
			extensions: ['.svelte', '.svx', '.md', '.html']
		}),
		paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/paraglide' })
	],
	server: {
		fs: { allow: ['..'] }
	}
});
