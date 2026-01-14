<script lang="ts">
	import { Markdown } from '$lib/components/ui';
	import { m } from '$i18n/messages.js';
	import type { PageProps } from './$types';
	import { config } from '$lib/config';

	let { data }: PageProps = $props();
	const About = $derived(data.content);
</script>

<svelte:head>
	<title>{m.about()} · {config.title}</title>
</svelte:head>

<article>
	<header>
		<h1>{m.about()}</h1>
	</header>
	<section>
		<Markdown>
			<About />
		</Markdown>
	</section>
</article>

<style>
	article {
		margin-inline: auto;
		max-width: 80ch;
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
		}
		& > section {
			margin-block: var(--margin-large);
		}
	}
	:global(details.toc) {
		display: none;
	}
</style>
