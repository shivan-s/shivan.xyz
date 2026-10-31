<script lang="ts">
	import { DARK, LIGHT, theme } from '$lib/state.svelte';

	$effect(() => {
		if (theme.current === DARK) document.documentElement.setAttribute('data-theme', 'dark');
		if (theme.current === LIGHT) document.documentElement.setAttribute('data-theme', 'light');
	});
</script>
