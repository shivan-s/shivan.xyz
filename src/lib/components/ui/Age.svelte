<script lang="ts">
	import { onMount } from 'svelte';
	import { sineInOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';

	const DOB = new Date(1993, 1, 13).getTime();
	const INTERVAL = 1000;
	let diff = new Tween(0, { easing: sineInOut, duration: INTERVAL / 2 });
	onMount(() => {
		const interval = setInterval(() => {
			diff.target = Date.now() - DOB;
		}, INTERVAL);

		return () => clearInterval(interval);
	});
</script>

<code>{new Intl.NumberFormat().format(Math.round(diff.current))} ms</code> ago
