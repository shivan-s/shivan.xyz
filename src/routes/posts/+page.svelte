<script lang="ts">
	import Posts from '$lib/components/ui/Posts.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Posts postsGroupByYear={data.posts} />
