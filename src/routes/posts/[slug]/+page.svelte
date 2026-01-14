<script lang="ts">
	import { Figure } from '$lib/components/content';
	import { Markdown } from '$lib/components/ui';
	import { config } from '$lib/config';
	import type { PageProps } from './$types';
	import { m } from '$i18n/messages';

	let { data }: PageProps = $props();

	const Content = $derived(data.content);
</script>

<svelte:head>
	<title>{data.meta.title} · {config.title}</title>
</svelte:head>

<article>
	<header>
		<h1>{data.meta.title}</h1>
		<small>
			<time datetime={data.meta.date.toISOString()}>
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
			& > h1 {
				width: fit-content;
				color: var(--primary-color);
				font-family: 'Optician Sans', sans-serif;
				transform: rotate(-1deg);
				transition: transform 0.4s ease-in-out;

				&:hover {
					transform: rotate(0deg);
				}
			}
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
