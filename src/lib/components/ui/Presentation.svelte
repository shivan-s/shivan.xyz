<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import Reveal from 'reveal.js';
	import Markdown from 'reveal.js/plugin/markdown/markdown';
	import 'reveal.js/dist/reveal.css';
	import { browser } from '$app/environment';
	import { QRCode } from '$lib/components/ui';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { config } from '$lib/config';

	onMount(() => {
		const slides = new Reveal({
			plugins: [Markdown]
		});
		slides.initialize({ hash: true });
	});

	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();
</script>

{#snippet content()}
	{@render children?.()}
{/snippet}

{#if browser}
	<div class="reveal">
		<div class="slides">
			<section>
				<h2>Access the Slides</h2>
				<QRCode data={page.url.toString()} /><br />
				{page.url.toString()}
			</section>
			{@render content()}
			<section>
				<h2>Who am I?</h2>
				<QRCode data={config.url} /><br />
				<a href={resolve('/')}>{config.url}</a>
			</section>
		</div>
	</div>
{:else}
	{@render content()}
{/if}

<style>
	:root {
		--font-size: 2rem;
	}
	div.reveal {
		background-color: var(--background-color);
		color: var(--color);

		& :global(h1) {
			color: var(--primary-color);
			font-size: calc(var(--font-size) * 2);
			text-shadow: 0rem 0rem 1.25rem var(--primary-color);
		}
		& :global(h2) {
			color: var(--primary-color);
			font-size: calc(var(--font-size) * 2 - 0.25rem);
		}
		& :global(ul) {
			& :global(> *) {
				text-align: start;
			}
		}
		& :global(figure) {
			display: grid;
			place-items: center;
			gap: var(--gap-small);
		}

		& :global(div.controls-arrow) {
			color: var(--primary-color);
		}
	}
</style>
