<script lang="ts">
	import ExampleWrapper from '$lib/components/ui/ExampleWrapper.svelte';
	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	const formId = 'example-bw';

	const SYSTEM = 'system';
	const DARK = 'dark';
	const LIGHT = 'light';
	const MODE = Object.freeze({
		system: SYSTEM,
		dark: DARK,
		light: LIGHT
	});
	type Mode = (typeof MODE)[keyof typeof MODE];

	let mode: Mode = $state(MODE.system);
</script>

<ExampleWrapper>
	<div>
		<form id={formId}>
			<label>
				Mode
				<select bind:value={mode}>
					{#each Object.entries(MODE).map(([, m]) => m) as m (m)}
						<option value={m}>{m}</option>
					{/each}
				</select>
			</label>
		</form>
		<output in:fade={{ easing: sineInOut }} data-inner-theme={mode} for={formId}>
			CSS is awesome!
		</output>
	</div>
</ExampleWrapper>

<style>
	div {
		display: grid;
		gap: var(--gap);
		place-items: center;
		& > output {
			--base-c: #196680;
			--dark-c: oklch(from var(--base-c) l c h / 100%);
			--light-c: oklch(from var(--base-c) calc(l + 0.3725) c h / 100%);
			--c: light-dark(var(--dark-c), var(--light-c));

			--bg: light-dark(white, black);
			--bc: light-dark(black, white);

			color-scheme: light dark;

			&[data-inner-theme='light'] {
				color-scheme: light;
			}
			&[data-inner-theme='dark'] {
				color-scheme: dark;
			}
			display: block;
			transition:
				color 0.3s ease-in-out,
				background-color 0.4s ease-in-out,
				border-color 0.5s ease-in-out;
			color: var(--c);
			background-color: var(--bg);
			padding: var(--padding);
			border-radius: var(--border-radius-large);
			border: 4px var(--bc) solid;
		}
		& > form {
		}
	}
</style>
