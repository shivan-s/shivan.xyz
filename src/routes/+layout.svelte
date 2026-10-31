<script lang="ts">
	import { page } from '$app/state';
	import '$lib/assets/css/app.css';
	import { config } from '$lib/config';
	import Theme from './Theme.svelte';
	import UpdateCheck from './UpdateCheck.svelte';
	import ViewTransition from './ViewTransition.svelte';

	let { children } = $props();

	let title = $derived(
		page.data['pageTitle'] ? `${page.data['pageTitle']} · ${config.title}` : config.title
	);
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
	<link
		rel="site.standard.publication external"
		href="at://did:plc:hwoz3olcp7bjyvzxn6uxiuei/site.standard.publication/3mv7khqdshe2n"
	/>
</svelte:head>

<Theme />
<UpdateCheck />
<ViewTransition />

{@render children()}
