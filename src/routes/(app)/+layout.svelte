<script lang="ts">
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';

	let { children } = $props();
</script>

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
