<script>
	import { config } from '$lib/config';
</script>

<footer>
	<p>
		Made with <span title="Love">💗</span> by
		<a title={config.author.name} href="mailto:{config.author.email}">{config.author.name}</a>
	</p>
</footer>

<style>
	footer {
		width: 100%;
		display: grid;
		place-content: center;
		border-top: 1px solid var(--color);
		font-family: 'Optician Sans', sans-serif;
	}
</style>
