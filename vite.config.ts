import { paraglideVitePlugin } from '@inlang/paraglide-js';
import adapter from '@sveltejs/adapter-static';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { page_data as pageData } from '@mdsvex/plugin-page-data';
import { anchors } from '@mdsvex/plugin-anchors';
import { toc } from '@mdsvex/plugin-toc';
import { link_check as linkCheck } from '@mdsvex/plugin-link-check';
import { code_blocks as codeBlocks } from '@mdsvex/plugin-code-blocks';
import { external_links as externalLinks } from '@mdsvex/plugin-external-links';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		mdsvex({
			plugins: [
				anchors(),
				toc(),
				linkCheck(),
				codeBlocks(),
				externalLinks(),
				pageData({
					excerpt: false,
					edit_url:
						'https://github.com/shivan-s/shivan.xyz/edit/main/content/posts/{data.meta.slug}/index.md',
					last_modified: 'git'
				})
			],
			heading_ids: true,
			smart_punctuation: true,
			import_images: { enhanced: true },
			extensions: ['.svx', '.md']
		}),
		enhancedImages(),
		sveltekit({
			preprocess: [vitePreprocess()],
			experimental: {
				remoteFunctions: true
			},
			adapter: adapter(),
			alias: {
				YouTube: './src/lib/components/content/YouTube.svelte',
				Figure: './src/lib/components/content/Figure.svelte',
				BlockQuote: './src/lib/components/content/BlockQuote.svelte',
				Highlight: './src/lib/components/ui/Highlight.svelte'
			},
			version: {
				pollInterval: 1000 * 60 * 60 * 2
			},
			compilerOptions: {
				runes: true,
				experimental: { async: true }
			},
			extensions: ['.svelte', '.html']
		}),
		paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/paraglide' })
	],
	server: {
		fs: { allow: ['..'] }
	}
});
