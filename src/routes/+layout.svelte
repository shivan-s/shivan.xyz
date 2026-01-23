<script lang="ts">
	import '$lib/assets/css/app.css';
	import { config } from '$lib/config';
	import { Footer, Header } from '$lib/components/ui';

	let { children } = $props();

	let title = $derived(config.title);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Header />
<main>
	{@render children()}
</main>
<Footer />

<style>
	main {
		max-width: 100dvw;
		min-width: 360px;
		padding-inline: var(--variable-gap);
	}
</style>
