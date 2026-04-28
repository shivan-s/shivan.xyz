<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { updated } from '$app/state';
	import '$lib/assets/css/app.css';
	import { config } from '$lib/config';
	import { DARK, theme } from '$lib/state.svelte';
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
	<meta name="description" content={config.description} />
</svelte:head>

<ViewTransition />

{@render children()}
