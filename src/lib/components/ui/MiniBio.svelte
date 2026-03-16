<script lang="ts">
	import { resolve } from '$app/paths';
	import { m } from '$i18n/messages.js';
	import Shivan from '$lib/assets/img/shivan.png';
</script>

<section id="mini-bio">
	<article>
		<enhanced:img
			src={Shivan}
			alt="Portrait of a man holding a microphone in a blue suit and tie"
		/>
		<p>🤗 Hi, I'm <strong>Shivan</strong> and welcome to my digital garden 🌱</p>
	</article>
	<footer><a href={resolve('/about')}>{m.more_about_me()}</a></footer>
</section>

<style>
	section#mini-bio {
		position: relative;
		margin-inline: auto;
		margin-block: var(--margin);
		max-width: var(--max-width);
		transform: rotate(-1deg);
		border-radius: var(--border-radius);
		backdrop-filter: invert(var(--invert));
		box-shadow: var(--box-shadow);
		transition:
			transform 0.5s ease-in-out,
			box-shadow 0.2s ease-in-out;

		&:hover {
			transform: rotate(0deg);
			box-shadow: none;
		}

		& > article {
			display: flex;
			align-items: center;
			gap: var(--gap);
			padding: var(--padding);

			& > enhanced\:img {
				height: 6rem;
				box-shadow: var(--box-shadow);
				border-radius: 50%;
				transition: border-radius 0.2s ease-in-out;
				&:hover {
					border-radius: unset;
				}
			}
		}

		& > header {
			text-align: center;
			& > h2 {
				view-transition-name: var(--slug);
			}
		}

		& > footer {
			width: 100%;
			padding: var(--padding);
			height: fit-content;
			position: absolute;
			text-align: end;
			bottom: 0;
		}
	}
</style>
