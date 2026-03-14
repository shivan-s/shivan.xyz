<script>
	import { resolve } from '$app/paths';
	import { config } from '$lib/config';
	import Avatar from '$lib/assets/img/avatar.png';
</script>

<header id="top">
	<nav>
		<a href={resolve('/')} title={config.title}>
			<enhanced:img src={Avatar} alt="Logo with 'Shivan' in it as as form of a letter chart" />
			<span>{config.title}</span>
		</a>
	</nav>
</header>

<style>
	header {
		display: grid;
		place-content: center;
		padding: var(--padding);
		width: 100%;
		& > nav {
			& > a {
				font-family: 'Optician Sans', sans-serif;
				display: inline-flex;
				align-items: center;
				gap: var(--gap-small);
				& > span {
					display: inline-block;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				&:hover > enhanced\:img {
					box-shadow: var(--box-shadow);
					transform: rotate(1turn);
				}
				& > enhanced\:img {
					border-radius: 50%;
					height: var(--font-size-large);
					animation: 2s ease-in-out spin;
					transition:
						transform 1s 0.2s ease-in-out,
						box-shadow 0.3s ease-in-out;
				}
			}
		}
	}

	@keyframes spin {
		to {
			transform: rotate(1turn);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		@keyframes spin {
			to {
				transform: rotate(0);
			}
		}
	}
</style>
