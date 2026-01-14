<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		cite?: Snippet;
	}

	let { children, cite }: Props = $props();
</script>

<div>
	<blockquote>
		<p>
			{@render children()}
		</p>
	</blockquote>
	{#if cite !== undefined}
		<cite><p>&mdash;{@render cite()}</p></cite>
	{/if}
</div>

<style>
	blockquote {
		all: unset;
	}

	div {
		backdrop-filter: invert(--invert);
		border-end-end-radius: var(--border-radius);
		border-inline-start: 2px solid var(--primary-color);
		border-start-end-radius: var(--border-radius);
		margin-block: var(--margin);
		margin-inline: var(--offset-width);
		padding-block: var(--padding);
		padding-inline-end: var(--padding-small);
		padding-inline-start: var(--padding);
	}
</style>
