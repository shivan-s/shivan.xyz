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
		inline-size: 100%;
		padding-inline: var(--variable-gap);
	}
</style>
