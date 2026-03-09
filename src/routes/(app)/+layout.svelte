<script lang="ts">
	import { Footer, Header } from '$lib/components/ui';

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
