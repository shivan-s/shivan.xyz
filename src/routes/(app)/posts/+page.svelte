<script lang="ts">
	import Fuse from 'fuse.js';
	import { Search } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { resolve } from '$app/paths';
	import { formatDistanceToNow } from 'date-fns';
	import { Tween } from 'svelte/motion';
	import { sineIn, sineOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import { onDestroy } from 'svelte';
	import { page } from '$app/state';
	import { building } from '$app/environment';
	import { replaceState } from '$app/navigation';
	import { ParaglideMessage } from '@inlang/paraglide-js-svelte';
	import { m } from '$i18n/messages';

	let { data }: PageProps = $props();

	const Q = 'q';
	const list = 'datalist-search';

	const posts = $derived(
		Object.entries(data.posts)
			.flatMap(([, p]) => p)
			.filter((p) => p !== undefined)
			.map(({ slug, metadata: { title, summary, date, readingTime, draft } }) => ({
				slug,
				title,
				summary,
				date,
				readingTime,
				draft
			}))
			.sort((a, b) => b.date.getTime() - a.date.getTime())
	);

	const THRESHOLD = 0.5;

	const fuse = $derived(
		new Fuse(posts, {
			threshold: THRESHOLD,
			keys: ['title', 'summary']
		})
	);

	let value = $derived.by(() => {
		let value = $state(!building ? (page.url.searchParams.get(Q) ?? '') : '');
		return value;
	});
	let filteredPosts = $derived(value ? fuse.search(value).map(({ item }) => item) : posts);

	let filteredPostsCount = $state(new Tween(0, { duration: 300 }));
	$effect(() => {
		filteredPostsCount.set(filteredPosts.length);
	});

	const DELAY_MS = 300;
	let timeout: ReturnType<typeof setTimeout> | null = null;
	function handleOnInput(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (timeout) clearTimeout(timeout);
		const currentValue = e.currentTarget?.value ?? '';
		const url = new URL(page.url);
		timeout = setTimeout(() => {
			value = currentValue;
			url.searchParams.set(Q, value);
			void replaceState(url, page.state);
		}, DELAY_MS);
	}

	onDestroy(() => {
		if (timeout) clearTimeout(timeout);
	});
</script>

<section>
	<search>
		<form method="GET" data-sveltekit-replacestate>
			<label>
				<Search title="Search" color="currentColor" />
				<input
					name={Q}
					autocomplete="off"
					{list}
					type="text"
					placeholder="e.g. '{posts[Math.round(Math.random() * posts.length) - 1].title}'"
					{value}
					oninput={handleOnInput}
				/>
				<datalist id={list}>
					{#each posts as { title } (title)}
						<option value={title}>{title}</option>
					{/each}
				</datalist>
			</label>
			<button>Search</button>
		</form>
	</search>
	<p>
		<ParaglideMessage
			message={m.showing_posts}
			inputs={{
				a: Intl.NumberFormat().format(Math.round(filteredPostsCount.current)),
				b: Intl.NumberFormat().format(posts.length)
			}}
		>
			{#snippet strong({ children })}
				<strong>{@render children?.()}</strong>
			{/snippet}
		</ParaglideMessage>
	</p>
	<ol>
		{#each filteredPosts as { slug, summary, title, date, readingTime, draft } (slug)}
			{@const middot = '\u0020\u00B7\u0020'}
			<li in:fade={{ easing: sineIn, delay: 250 }} out:fade={{ easing: sineOut, duration: 200 }}>
				<a
					title="{title}{middot}{date.toLocaleDateString(undefined, {
						dateStyle: 'full'
					})}{middot}{summary}"
					href={resolve('/(app)/posts/[slug]', { slug })}
				>
					{#if draft}
						<em style:--slug={slug}>{title}</em>
					{:else}
						<span style:--slug={slug}>{title}</span>
					{/if}
					<small>
						<time datetime={date.toISOString()}>
							{formatDistanceToNow(date, { addSuffix: true })}
						</time>
						{middot}{readingTime.text}
						{middot}{summary}
					</small>
				</a>
			</li>
		{/each}
	</ol>
</section>

<style>
	:root {
		--border-width: 2px;
	}
	section {
		display: grid;
		gap: var(--gap);
		margin-inline: auto;
		max-width: var(--max-width);
		margin-block-end: var(--margin);
		& > search {
			padding: var(--padding);
			border-block-end: var(--border-width) dotted var(--color);
			& > form {
				display: grid;
				grid-template-columns: 1fr auto;
				gap: var(--gap);
				& > label {
					display: flex;
					align-items: center;
					gap: var(--gap);
					& > input {
						width: 100%;
						background: inherit;
						border: none;
						color: inherit;
						outline: none;
						padding: var(--padding-small);
						border-radius: var(--border-radius);
						&:focus-visible,
						&:focus {
							outline-offset: 2px;
							outline: solid 2px var(--color);
						}
					}
				}
				& button {
					color: var(--color);
					background-color: var(--background-color);
					padding: var(--padding-small);
					border: 2px solid var(--color);
					border-radius: var(--border-radius);
					transition:
						color 0.3s ease-in-out,
						text-decoration 0.3s ease-in-out,
						box-shadow 0.2s ease-in-out;
					&:hover {
						cursor: pointer;
						color: var(--alternative-color);
						border-color: var(--alternative-color);
						color: var(--alternative-color);
						box-shadow: 0 0 1rem var(--alternative-color);
					}
					&:active {
						box-shadow: none;
					}
				}
			}
		}
		& > p {
			margin: 0;
			padding: 0;
			text-align: center;
		}
		& ol {
			display: grid;
			margin: 0;
			padding: 0;
			list-style-position: inside;
			& > li {
				display: grid;
				padding: var(--padding-small);
				border-radius: var(--border-radius);
				width: 100%;
				transition: backdrop-filter 0.3s ease-in-out;
				&:nth-child(2n - 1) {
					backdrop-filter: invert(calc(var(--invert) - 5%));
				}
				&:hover {
					backdrop-filter: invert(var(--invert));
				}
				& > a {
					display: inline-grid;
					text-decoration: none;
					width: 100%;
					& > span {
						view-transition-name: var(--slug);
					}
					& > small {
						color: var(--medium-gray);
						padding-inline-start: 1rem;
						text-shadow: none;
						:hover {
							text-decoration: none;
						}
					}
				}
			}
		}
	}
</style>
