<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLHeadingElement> {
		viewTransitionName?: string;
	}

	let { children, viewTransitionName, ...restProps }: Props = $props();
</script>

<h1 {...restProps} style:--vtn={viewTransitionName}>{@render children?.()}</h1>

<style>
	h1 {
		width: fit-content;
		color: var(--primary-color);
		font-family: 'Optician Sans', sans-serif;
		transform: rotate(-1deg);
		transition: transform 0.4s ease-in-out;
		view-transition-name: var(--vtn);

		&:hover {
			transform: rotate(0deg);
		}
	}
</style>
