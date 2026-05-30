<script lang="ts">
	import ExampleWrapper from '$lib/components/ui/ExampleWrapper.svelte';

	interface Props {
		hue?: number;
		saturation?: number;
		lightness?: number;
	}

	let { hue = 0, saturation = 100, lightness = 50 }: Props = $props();
	const HUE_RANGE = Object.freeze({
		min: 0,
		max: 360,
		step: 1
	});
	const RANGE = Object.freeze({
		min: 0,
		max: 100,
		step: 1
	});
	let hueStr = $derived(hue.toString());
	let saturationStr = $derived(saturation.toString() + '%');
	let lightnessStr = $derived(lightness.toString() + '%');
	const formId = 'example-hsl';
</script>

<ExampleWrapper>
	<div>
		<form id={formId}>
			<label for="{formId}-hue"> Hue </label>
			<input id="{formId}-hue" type="range" bind:value={hue} {...HUE_RANGE} />
			<span>
				{hueStr}
			</span>
			<label for="{formId}-saturation"> Saturation </label>
			<input id="{formId}-saturation" type="range" bind:value={saturation} {...RANGE} />
			<span>
				{saturationStr}
			</span>
			<label for="{formId}-lightness"> Lightness </label>
			<input id="{formId}-lightness" type="range" bind:value={lightness} {...RANGE} />
			<span>
				{lightnessStr}
			</span>
		</form>
		<output for={formId}>
			<code style:--h="{hueStr}deg" style:--s={saturationStr} style:--l={lightnessStr}
				>hsl({hueStr}deg {saturationStr} {lightnessStr})</code
			>
		</output>
	</div>
</ExampleWrapper>

<style>
	div {
		display: flex;
		flex-wrap: wrap;
		gap: var(--gap);
		align-items: center;
		justify-content: center;
		& > form {
			display: grid;
			grid-template-columns: auto 1fr 3ch;
			gap: var(--gap);
		}
		& > output > code {
			display: inline-block;
			--_background-color: hsl(var(--h) var(--s) var(--l) / 1);
			transition: color 0.2s ease-in-out;
			background-color: var(--_background-color);
			color: contrast-color(var(--_background-color));
			border-radius: var(--border-radius-large);
			padding: var(--padding);
		}
	}
</style>
