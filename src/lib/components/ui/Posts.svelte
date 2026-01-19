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
			<Rss color="var(--primary-color)" />
		</a>
	</header>
	<div>
		<ul>
			{#each Object.entries(postsGroupByYear).sort(([a], [b]) => parseInt(b) - parseInt(a)) as [year, posts] (year)}
				<li>
					<h3>{year}</h3>
					<ul>
						{#each posts as { slug, metadata: { title, date, summary, readingTime: { text } } } (slug)}
							{@const middot = '\u0020\u00B7\u0020'}
							<li>
								<a
									title="{title}{middot}{text}{middot}{summary}"
									href={resolve('/posts/[slug]', { slug })}
								>
									<span>{title}</span>
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
		margin-block: var(--margin-large);
		margin-inline: auto;
		& > header {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: var(--gap);
			text-align: center;
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
								& > small {
									color: var(--grey);
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
