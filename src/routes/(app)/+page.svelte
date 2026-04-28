<script lang="ts">
	import type { PageProps } from './$types';
	import MiniBio from './MiniBio.svelte';
	import Posts from './Posts.svelte';

	let { data }: PageProps = $props();
</script>

<MiniBio />
<Posts postsGroupByYear={data.posts} />
