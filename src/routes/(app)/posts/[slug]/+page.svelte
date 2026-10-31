<script lang="ts">
	import { m } from '$i18n/messages';
	import { Figure } from '$lib/components/content';
	import { Markdown } from '$lib/components/ui';
	import { H1 } from '$lib/components/ui';
	import type { PageProps } from './$types';
	import { formatDistanceToNow } from 'date-fns';
	import Toc from '@mdsvex/plugin-toc/Toc.svelte';

	let { data }: PageProps = $props();

	const Content = $derived(data.content);
	const from = $derived(formatDistanceToNow(data.meta.date.toISOString(), { addSuffix: true }));
</script>

<svelte:head>
	<link rel="site.standard.document external" href={data.meta.atUri} />
</svelte:head>

<article>
	<header>
		<H1 viewTransitionName={data.meta.slug}>{data.meta.title}</H1>
		<small>
			<time title={from} datetime={data.meta.date.toISOString()}>
				{data.meta.date.toLocaleDateString(undefined, { dateStyle: 'full' })}
			</time>
			<span title="{data.meta.words.toString()} words">
				{m.n_min_read({ n: data.meta.minutes })}
			</span>
			<a href={data.meta.editUrl} target="_blank">
				{m.post_suggest_changes()}
			</a>
		</small>
		{#if data.meta.cover}
			{@const { image: src, caption, alt } = data.meta.cover}
			<Figure {src} {caption} {alt} />
		{/if}
		{#if data.meta.audio}
			{@const { src, caption } = data.meta.audio}
			<figure>
				<audio controls {src}></audio>
				<figcaption>
					<small>
						{caption}
					</small>
				</figcaption>
			</figure>
		{/if}
	</header>
	<section>
		{#if data.meta.toc}
			<details>
				<summary>{m.table_of_contents()}</summary>
				<Toc headings={data.meta.toc.headings} aria-label={m.table_of_contents()} />
			</details>
		{/if}
		<Markdown>
			<Content />
		</Markdown>
	</section>
</article>

<style>
	article {
		margin-inline: auto;
		max-width: var(--max-width);
		& > header {
			& > small {
				display: flex;
				color: var(--medium-grey);
				flex-wrap: wrap;
				& > *:not(:last-child)::after {
					padding-inline: calc(var(--letter-gap) / 2);
					font-weight: 1000;
					content: '\00B7';
				}
			}
			& > figure {
				& > audio {
					width: 100%;
					margin-inline: auto;
				}
				& > figcaption {
					color: var(--medium-grey);
					text-align: center;
				}
			}
		}
		& > section {
			margin-block-start: var(--margin-large);
		}
	}
</style>
