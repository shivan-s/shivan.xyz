<script lang="ts">
	import { CircleAlert, Info } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		directive: 'info' | 'warn' | 'danger';
		children: Snippet;
	}

	let { directive, children }: Props = $props();
</script>

<section
	class:info={directive === 'info'}
	class:warn={directive === 'warn'}
	class:danger={directive === 'danger'}
	role="alert"
>
	<header>
		{#if directive === 'danger'}
			<CircleAlert /><strong>Danger</strong>
		{:else if directive === 'warn'}
			<CircleAlert /> Warning
		{:else if directive === 'info'}
			<Info /> Info
		{/if}
	</header>
	{#if children}
		<div>
			{@render children()}
		</div>
	{/if}
</section>

<style>
	section {
		display: grid;
		gap: var(--gap-small);
		padding: var(--padding);
		& > header {
			display: grid;
			gap: var(--gap-small);
			grid-template-columns: auto auto;
			justify-content: start;
			align-items: start;
		}
		border: 2px solid;
		border-radius: var(--border-radius-large);
		&.danger {
			color: var(--red);
			backdrop-filter: invert(var(--invert));
			border-color: var(--red);
			background-color: color-mix(in oklch, var(--background-color) 90%, var(--red));
		}
	}
</style>
