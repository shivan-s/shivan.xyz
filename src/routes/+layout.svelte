<script lang="ts">
	import '$lib/assets/css/app.css';
	import { config } from '$lib/config';
	import { Footer, Header } from '$lib/components/ui';
	import { page } from '$app/state';
	import Shivan from '$lib/assets/img/shivan.png';

	let { children } = $props();

	let title = $derived(page.data['pageTitle'] ?? config.title);
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta property="og:title" content={config.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={page.url.toString()} />
	<meta property="og:image" content={config.image} />
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
