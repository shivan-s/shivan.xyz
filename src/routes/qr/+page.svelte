<script>
	import { resolve } from '$app/paths';
	import QRCode from '$lib/components/ui/QRCode.svelte';
	import { config } from '$lib/config';
</script>

<section>
	<QRCode />
	<a href={resolve('/')}>{config.url}</a>
</section>

<style>
	section {
		display: grid;
		width: 100%;
		height: 100%;
		place-content: center;
		text-align: center;
	}
</style>
