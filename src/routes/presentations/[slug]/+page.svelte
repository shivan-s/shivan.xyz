<script lang="ts">
	import { Presentation } from '$lib/components/ui';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const Content = $derived(data.content);
</script>

<main>
	<Presentation>
		<Content />
	</Presentation>
</main>

<style>
	main {
		min-height: 100dvh;
	}
</style>
