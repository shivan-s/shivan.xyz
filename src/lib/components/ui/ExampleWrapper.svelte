<script lang="ts">
	import { browser } from '$app/environment';
	import Highlight from './Highlight.svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLElement> {
		scrollable?: boolean;
	}

	let { children, scrollable = true, ...restProps }: Props = $props();
</script>

<svelte:boundary>
	<section class:scrollable {...restProps}>
		{#if !browser}
			<Highlight directive="danger">
				The following interactive example may not work without Javascript. If you have enabled
				Javascript, try refreshing this page.
			</Highlight>
		{/if}
		<div>
			{@render children?.()}
		</div>
	</section>
	{#snippet failed()}
		<Highlight directive="danger">Something went wrong. Please refresh the page.</Highlight>
	{/snippet}
</svelte:boundary>

<style>
	section {
		margin-block: var(--margin);
		padding: var(--padding-small);
		display: grid;
		gap: var(--gap);
		backdrop-filter: invert(var(--invert));
		border-radius: var(--border-radius-large);
		container-type: inline-size;

		&.scrollable {
			overflow: scroll;
		}
	}
</style>
