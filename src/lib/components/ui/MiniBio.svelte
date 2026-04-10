<script lang="ts">
	import { resolve } from '$app/paths';
	import { m } from '$i18n/messages.js';
	import Shivan from '$lib/assets/img/shivan.png';

	const alt = 'Portrait of a man holding a microphone in a blue suit and tie';
	const middot = '\u0020\u00B7\u0020';
</script>

<section id="mini-bio">
	<article>
		<enhanced:img src={Shivan} {alt} title={alt} />
		<p>🤗 Hi, I'm <strong>Shivan</strong> and welcome to my digital garden 🌱</p>
	</article>
	<footer>
		<a style:--slug="now" href={resolve('/now')}>{m.now().toLowerCase()}</a>{middot}
		<a style:--slug="about" href={resolve('/about')}>{m.about().toLowerCase()}</a>
	</footer>
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

		& > footer {
			width: 100%;
			padding: var(--padding);
			height: fit-content;
			position: absolute;
			text-align: end;
			bottom: 0;
			& > nav {
				& > a {
					view-transition-name: var(--slug);
				}
			}
		}
	}
</style>
