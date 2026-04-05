<script lang="ts">
	import { resolve } from '$app/paths';
	import { m } from '$i18n/messages.js';
	import { Rss } from '@lucide/svelte';
	import type { PostsGroupByYear } from '$lib/posts';

	interface Props {
		postsGroupByYear: PostsGroupByYear;
	}

	let { postsGroupByYear }: Props = $props();
</script>

<section id="posts">
	<header>
		<h2>{m.posts()}</h2>
		<a href={resolve('/feed.xml')}>
			<Rss color="currentColor" />
		</a>
	</header>
	<div>
		<ul>
			{#each Object.entries(postsGroupByYear).sort(([a], [b]) => parseInt(b) - parseInt(a)) as [year, posts] (year)}
				<li>
					<h3>{year}</h3>
					<ul>
						{#each posts as { slug, metadata: { title, date, summary, draft, readingTime: { text } } } (slug)}
							{@const middot = '\u0020\u00B7\u0020'}
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
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	:root {
		--year-border-width: 2px;
		--post-border-width: 1px;
	}
	section#posts {
		max-width: var(--max-width);
		margin-block: var(--margin);
		margin-inline: auto;
		& > header {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: var(--gap);
			text-align: center;
			& a {
				transition:
					color 0.3s ease-in-out,
					filter 0.4s ease-in-out;
				&:hover,
				&:active {
					color: var(--alternative-color);
					filter: drop-shadow(0 0 1rem var(--alternative-color));
				}
			}
		}
		& > div {
			margin-block-end: var(--margin-large);
			& ul {
				list-style-type: none;
				padding: 0;
			}
			& > ul {
				& > li {
					& > h3 {
						margin-block: var(--margin-small);
					}
					display: grid;
					grid-template-columns: auto 1fr;
					gap: var(--gap);
					align-content: start;
					border-block-start: var(--year-border-width) dotted var(--color);
					& > ul {
						display: grid;
						& > li {
							& > a {
								width: 100%;
								display: inline-grid;
								grid-template-columns: 1fr auto;
								align-items: center;
								padding-block: var(--padding-small);
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
							&:not(:first-of-type) {
								border-block-start: var(--post-border-width) dotted var(--color);
							}
						}
					}
				}
			}
		}
	}
</style>
