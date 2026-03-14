<script lang="ts">
	import type { PageProps } from './$types';
	import { Posts, MiniBio } from '$lib/components/ui';

	let { data }: PageProps = $props();
</script>

<MiniBio />
<Posts postsGroupByYear={data.posts} />
