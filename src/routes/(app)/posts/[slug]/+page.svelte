<script lang="ts">
	import { m } from '$i18n/messages';
	import { Figure } from '$lib/components/content';
	import { Markdown } from '$lib/components/ui';
	import { H1 } from '$lib/components/ui';
	import { config } from '$lib/config';
	import type { PageProps } from './$types';
	import { formatDistanceToNow } from 'date-fns';

	let { data }: PageProps = $props();

	const Content = $derived(data.content);
	const from = $derived(formatDistanceToNow(data.meta.date.toISOString(), { addSuffix: true }));
</script>

<svelte:head>
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.summary} />
	<meta property="og:image" content={data.meta.cover ? data.meta.cover.image : config.image} />
	<meta name="description" content={data.meta.summary} />
</svelte:head>

<article>
	<header>
		<H1 viewTransitionName={data.meta.slug}>{data.meta.title}</H1>
		<small>
			<time title={from} datetime={data.meta.date.toISOString()}>
				{data.meta.date.toLocaleDateString(undefined, { dateStyle: 'full' })}
			</time>
			<span title="{data.meta.readingTime.words.toString()} words">
				{data.meta.readingTime.text}
			</span>
			<a
				href="https://{config.src}/edit/main/content/posts/{data.meta.slug}/index.md"
				target="_blank"
			>
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
			margin-block: var(--margin-large);
		}
	}
</style>
