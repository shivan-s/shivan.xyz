<script lang="ts">
	import { resolve } from '$app/paths';
	import { m } from '$i18n/messages.js';
	import Shivan from '$lib/assets/img/shivan.png';

	const alt = 'Portrait of a man holding a microphone in a blue suit and tie';
	const links = [
		Object.freeze({ url: '/now', label: m.now() }),
		Object.freeze({ url: '/about', label: m.about() }),
		Object.freeze({ url: '/posts', label: m.posts() }),
		Object.freeze({ url: '/gallery', label: m.gallery() })
	] as const;
</script>

<div>
	<section>
		<enhanced:img src={Shivan} {alt} title={alt} />
		<div>
			<p>🤗 Hi, I'm <strong>Shivan</strong> and welcome to my digital garden 🌱</p>
			<ul>
				{#each links as { url, label }, idx (idx)}
					<li>
						<a href={resolve(url)}>{label.toLowerCase()}</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>
</div>

<style>
	div {
		display: grid;
		align-content: center;
		height: 100%;
		& > section {
			--height: 6rem;
			position: relative;
			display: grid;
			place-content: center;
			gap: var(--gap);
			padding: var(--padding);
			margin-inline: auto;
			margin-block: calc((var(--height) / 2 + var(--padding)));
			max-width: var(--max-width);
			width: fit-content;
			transform: rotate(-1deg);
			border-radius: var(--border-radius-large);
			backdrop-filter: invert(var(--invert));
			box-shadow: var(--box-shadow);
			transition:
				transform 0.5s ease-in-out,
				box-shadow 0.2s ease-in-out;

			&:hover {
				transform: rotate(0deg);
				box-shadow: none;
			}

			& > enhanced\:img {
				margin-block-start: calc(-1 * (var(--height) / 2 + var(--padding)));
				margin-inline: auto;
				height: var(--height);
				box-shadow: var(--box-shadow);
				border-radius: 50%;
				transition: border-radius 0.2s ease-in-out;
				&:hover {
					border-radius: unset;
				}
			}

			& div {
				& > ul {
					padding: 0;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					list-style-type: none;
					& > li {
						&:not(:last-of-type)::after {
							content: '\00B7';
							padding-inline: var(--gap-small);
						}
					}
				}
			}
		}
	}
</style>
