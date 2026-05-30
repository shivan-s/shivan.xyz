<script lang="ts">
	import ExampleWrapper from '$lib/components/ui/ExampleWrapper.svelte';

	interface Props {
		L?: number;
		chroma?: number;
		hue?: number;
	}

	let { L = 0, chroma = 100, hue = 50 }: Props = $props();
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
	let L_Str = $derived(L.toString() + '%');
	let chromaStr = $derived(chroma.toString() + '%');
	let hueStr = $derived(hue.toString());
	const formId = 'example-hsl';
</script>

<ExampleWrapper>
	<div>
		<form id={formId}>
			<label for="{formId}-L"> L </label>
			<input id="{formId}-L" type="range" bind:value={L} {...RANGE} />
			<span>
				{L_Str}
			</span>
			<label for="{formId}-chroma"> Chroma </label>
			<input id="{formId}-chroma" type="range" bind:value={chroma} {...RANGE} />
			<span>
				{chromaStr}
			</span>
			<label for="{formId}-hue"> Hue </label>
			<input id="{formId}-hue" type="range" bind:value={hue} {...HUE_RANGE} />
			<span>
				{hueStr}
			</span>
		</form>
		<output for={formId}>
			<code style:--l={L_Str} style:--c={chromaStr} style:--h="{hueStr}deg"
				>oklch({L_Str} {chromaStr} {hueStr}deg)</code
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
			--_background-color: oklch(var(--l) var(--c) var(--h) / 1);
			transition: color 0.2s ease-in-out;
			background-color: var(--_background-color);
			color: contrast-color(var(--_background-color));
			border-radius: var(--border-radius-large);
			padding: var(--padding);
		}
	}
</style>
