<script lang="ts">
	import { m } from '$i18n/messages.js';
	import { Markdown } from '$lib/components/ui';
	import { H1 } from '$lib/components/ui';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const About = $derived(data.content);
</script>

<article>
	<header>
		<H1>{m.about()}</H1>
	</header>
	<section>
		<Markdown>
			<About />
		</Markdown>
	</section>
</article>

<style>
	article {
		margin-inline: auto;
		max-width: var(--max-width);
		& > section {
			margin-block: var(--margin-large);
		}
	}
</style>
