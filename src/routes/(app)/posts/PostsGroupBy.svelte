<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PostsGroupByYear } from '$lib/posts';
	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	interface Props {
		postsGroupByYear: PostsGroupByYear;
	}

	let { postsGroupByYear }: Props = $props();
</script>

{#snippet post(post: NonNullable<PostsGroupByYear[number]>[number])}
	{@const middot = '\u0020\u00B7\u0020'}
	{@const {
		slug,
		metadata: {
			title,
			date,
			summary,
			readingTime: { text },
			draft
		}
	} = post}
	<li>
		<a
			title="{title}{middot}{text}{middot}{summary}"
			href={resolve('/(app)/posts/[slug]', { slug })}
		>
			{#if draft}
				<em style:--slug={slug}>{title}</em>
			{:else}
				<span style:--slug={slug}>{title}</span>
			{/if}
			<small>
				<time datetime={date.toISOString()}>
					{date.toLocaleDateString(undefined, { month: 'short', day: '2-digit' })}
				</time>
			</small>
		</a>
	</li>
{/snippet}

{#snippet group(year: string, posts: PostsGroupByYear[number])}
	<li>
		<h3>{year}</h3>
		<ol>
			{#each posts as p (p.slug)}
				{@render post(p)}
			{/each}
		</ol>
	</li>
{/snippet}

<ol
	in:fade={{ easing: sineInOut, delay: 250 }}
	out:fade={{ easing: sineInOut, duration: 250 }}
	class="wrapper"
>
	{#each Object.entries(postsGroupByYear).sort(([a], [b]) => parseInt(b) - parseInt(a)) as [year, posts] (year)}
		{@render group(year, posts)}
	{/each}
</ol>

<style>
	:root {
		--year-border-width: 2px;
	}
	ol.wrapper {
		list-style-type: none;
		padding: 0;
		& > li {
			& > h3 {
				margin-block: var(--margin-small);
			}
			display: grid;
			grid-template-columns: auto 1fr;
			gap: var(--gap);
			align-content: start;
			border-block-start: var(--year-border-width) dotted var(--color);
			& > ol {
				list-style-type: none;
				display: grid;
				& > li {
					transition: backdrop-filter 0.3s ease-in-out;
					border-radius: var(--border-radius);
					& > a {
						width: 100%;
						display: inline-grid;
						grid-template-columns: 1fr auto;
						align-items: center;
						padding: var(--padding-small);
						& > span {
							view-transition-name: var(--slug);
						}
						& > em {
							color: var(--medium-grey);
						}
						& > small {
							color: var(--medium-grey);
						}
					}
					&:nth-child(2n - 1) {
						backdrop-filter: invert(calc(var(--invert) - 5%));
					}
					&:hover {
						backdrop-filter: invert(var(--invert));
					}
				}
			}
		}
	}
</style>
