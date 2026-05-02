<script lang="ts">
	import type { PageProps } from './$types';
	import MiniBio from './MiniBio.svelte';

	let { data }: PageProps = $props();
</script>

<MiniBio />
