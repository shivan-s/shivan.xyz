<script lang="ts">
	import { m } from '$i18n/messages.js';
	import { Markdown } from '$lib/components/ui';
	import { H1 } from '$lib/components/ui';
	import { config } from '$lib/config';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const Now = $derived(data.content);
</script>

<article>
	<header>
		<H1>{m.now()}</H1>
		<small>
			<a href="https://{config.src}/edit/main/content/now/index.md" target="_blank">
				{m.post_suggest_changes()}
			</a>
		</small>
	</header>
	<section>
		<Markdown>
			<Now />
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
