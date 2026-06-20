<script lang="ts">
	import ExampleWrapper from '$lib/components/ui/ExampleWrapper.svelte';
</script>

<ExampleWrapper>
	<!-- ... -->
	<div>
		<button type="button">A button! (but not really)</button>
	</div>
</ExampleWrapper>

<style>
	@property --angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: true;
	}
	@keyframes spinning {
		0% {
			--angle: 0deg;
		}
		100% {
			--angle: 360deg;
		}
	}
	:root {
		animation: spinning 5s infinite;
	}
	div {
		display: grid;
		& > button {
			transition:
				color 0.2s ease-in-out,
				background-color 0.2s ease-in-out;
			border: solid 2px;
			border-radius: 1rem;
			padding-inline: 0.5rem;
			padding-block: 1rem;
			&:hover {
				cursor: pointer;
				color: contrast-color(oklch(80% 0.4 var(--angle)));
				background-color: oklch(80% 0.4 var(--angle));
			}
		}
	}
</style>
