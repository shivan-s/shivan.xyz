<script lang="ts">
	import { m } from '$i18n/messages.js';
	import { getLocale } from '$i18n/runtime';
	import { H1 } from '$lib/components/ui';
	import type { PageProps } from './$types';
	import { Link } from '@lucide/svelte';

	let { data }: PageProps = $props();

	let galleries = $derived(data.galleries);
</script>

<article class="galleries">
	<header>
		<H1>{m.gallery()}</H1>
	</header>
	<section>
		{#each galleries as { slug, default: d, metadata: { title, summary, startDate, endDate } }, idx (idx)}
			<article id={slug}>
				<header>
					<div>
						<h2>{title}</h2>
						<a href="#{slug}"><Link size="1rem" /></a>
					</div>
					<small>
						{#if !endDate}
							<time datetime={startDate.toISOString()}>
								{startDate.toLocaleDateString(undefined, { dateStyle: 'medium' })}
							</time>
						{:else}
							<time datetime={startDate.toISOString()}>
								{new Intl.DateTimeFormat(getLocale(), {
									dateStyle: 'medium'
								}).formatRange(startDate, endDate)}
							</time>
						{/if}
					</small>
					<p>
						{summary}
					</p>
				</header>
				<section>
					{@render d?.()}
				</section>
			</article>
			<hr />
		{/each}
	</section>
</article>

<style>
	article.galleries {
		display: grid;
		gap: var(--gap);
		margin-inline: auto;
		max-width: var(--max-width);
		& > section {
			display: grid;
			gap: var(--gap);
			margin-block: var(--margin-large);
			& > article {
				& > header {
					margin-block: var(--margin-small);
					& div {
						display: flex;
						align-items: center;
						gap: var(--gap);
						& > h2 {
							margin-block: 0;
							line-height: 0;
						}
					}
					& > small {
						color: var(--medium-grey);
					}
					& p {
						padding: 0;
					}
				}
				& section {
					display: grid;
					grid-template-columns: 1fr 1fr 1fr;
					border-radius: var(--border-radius-large);
					transition: border-radius 0.3s ease-in-out;
					align-items: center;
					&:hover {
						border-radius: 0;
					}
				}
			}
		}
	}
</style>
