<script>
	import { resolve } from '$app/paths';
	import { config } from '$lib/config';
</script>

<header id="top">
	<nav>
		<a href={resolve('/')} title={config.title}>
			<img src="/favicon.ico" alt="Shivan Logo" height="35px" />
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
			& a {
				font-family: 'Optician Sans', sans-serif;
				display: inline-flex;
				font-size: var(--font-size-large);
				gap: var(--letter-gap);
			}
		}
	}
</style>
