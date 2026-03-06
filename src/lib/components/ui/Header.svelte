<script>
	import { resolve } from '$app/paths';
	import { config } from '$lib/config';
</script>

<header id="top">
	<nav>
		<a href={resolve('/qr')}>
			<img src="/favicon.ico" alt="Shivan Logo" height="35px" />
		</a>
		<a href={resolve('/')} title={config.title}>
			{config.title}
		</a>
	</nav>
</header>

<style>
	header {
		display: grid;
		place-content: center;
		width: 100%;
		& img {
			border-radius: var(--border-radius);
		}
		& nav {
			display: inline-flex;
			font-size: var(--font-size-large);
			gap: var(--letter-gap);
			& a {
				font-family: 'Optician Sans', sans-serif;
			}
		}
	}
</style>
