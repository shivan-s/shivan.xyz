<script lang="ts">
	import '$lib/assets/css/app.css';
	import { config } from '$lib/config';
	import { page } from '$app/state';
	import ViewTransition from '$lib/components/ui/ViewTransition.svelte';

	let { children } = $props();

	let title = $derived(
		page.data['pageTitle'] ? `${page.data['pageTitle']} · ${config.title}` : config.title
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta property="og:title" content={config.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={page.url.toString()} />
	<meta property="og:image" content={config.image} />
</svelte:head>

<ViewTransition />

{@render children()}
