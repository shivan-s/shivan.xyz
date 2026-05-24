<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { updated } from '$app/state';
	import '$lib/assets/css/app.css';
	import { config } from '$lib/config';
	import { DARK, LIGHT, theme } from '$lib/state.svelte';
	import ViewTransition from './ViewTransition.svelte';

	let { children } = $props();

	let title = $derived(
		page.data['pageTitle'] ? `${page.data['pageTitle']} · ${config.title}` : config.title
	);

	beforeNavigate(({ willUnload, to }) => {
		if (updated.current && !willUnload && to?.url) {
			location.href = to.url.href;
		}
	});

	$effect(() => {
		if (theme.current === DARK) document.documentElement.setAttribute('data-theme', 'dark');
		if (theme.current === LIGHT) document.documentElement.setAttribute('data-theme', 'light');
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={page.data['meta']?.['title'] ?? config.title} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={config.url} />
	<meta property="og:image" content={page.data['meta']?.['cover']?.['image'] ?? config.image} />
	<meta property="og:description" content={page.data['meta']?.['summary'] ?? config.description} />
	<meta property="og:locale" content="en_NZ" />
	<meta property="og:logo" content={config.logo} />
</svelte:head>

<ViewTransition />

{@render children()}
