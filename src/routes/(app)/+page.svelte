<script lang="ts">
	import type { PageProps } from './$types';
	import { Posts, About } from '$lib/components/ui';

	let { data }: PageProps = $props();
	const AboutContent = $derived(data.content);
</script>

<About>
	<AboutContent />
</About>
<Posts postsGroupByYear={data.posts} />
