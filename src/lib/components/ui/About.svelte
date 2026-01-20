<script lang="ts">
	import { Markdown } from '$lib/components/ui';
	import { resolve } from '$app/paths';
	import { m } from '$i18n/messages.js';

	let { children } = $props();
</script>

<section id="about">
	<header>
		<h2><a href={resolve('/about')}>{m.about()}</a></h2>
	</header>
	<article>
		<Markdown>
			{@render children()}
		</Markdown>
	</article>
	<footer><a href={resolve('/about')}>{m.read_more()}</a></footer>
</section>

<style>
	:root {
		--max-height: 18rem;
	}
	section#about {
		position: relative;
		margin-inline: auto;
		max-width: var(--max-width);
		transform: rotate(-1deg);
		border: 2px solid var(--color);
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow);
		transition:
			transform 0.5s ease-in-out,
			box-shadow 0.2s ease-in-out;

		&:hover {
			transform: rotate(0deg);
			box-shadow: none;
		}

		& > article {
			max-height: var(--max-height);
			padding-inline: var(--padding);
			padding-block-end: var(--padding);
			overflow: hidden;
			mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
		}

		& > header {
			text-align: center;
		}

		& > footer {
			width: 100%;
			padding: var(--padding);
			height: fit-content;
			position: absolute;
			text-align: center;
			bottom: 0;
			& > a {
				padding: var(--padding);
				border-radius: var(--border-radius-large);
				transition:
					backdrop-filter 0.2s ease-in-out,
					box-shadow 0.1s ease-in-out;

				&:hover {
					backdrop-filter: invert(var(--invert));
					box-shadow: var(--box-shadow);
				}
			}
		}
	}
</style>
