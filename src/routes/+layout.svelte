<script lang="ts">
	import '$lib/assets/css/app.css';
	import { config } from '$lib/config';
	import { page } from '$app/state';
	import ViewTransition from '$lib/components/ui/ViewTransition.svelte';
	import { DARK, theme } from '$lib/state.svelte';

	let { children } = $props();

	let title = $derived(
		page.data['pageTitle'] ? `${page.data['pageTitle']} · ${config.title}` : config.title
	);

	$effect(() => {
		document.documentElement.classList.toggle('dark', theme.current === DARK);
	});
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
