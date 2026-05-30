<script lang="ts">
	import ExampleWrapper from '$lib/components/ui/ExampleWrapper.svelte';

	interface Props {
		red?: number;
		green?: number;
		blue?: number;
	}

	let { red = 100, green = 0, blue = 0 }: Props = $props();

	const RANGE = Object.freeze({
		min: 0,
		max: 100,
		step: 1
	});
	let redStr = $derived(red.toString() + '%');
	let greenStr = $derived(green.toString() + '%');
	let blueStr = $derived(blue.toString() + '%');
	const formId = 'example-rgb';
	const toHex = (n: number) =>
		Math.round((n / 100) * 255)
			.toString(16)
			.padStart(2, '0');
</script>

<ExampleWrapper>
	<div>
		<form id={formId}>
			<label for="{formId}-red">Red</label>
			<input id="{formId}-red" type="range" bind:value={red} {...RANGE} />
			<span>
				{redStr}
			</span>
			<label for="{formId}-green">Green</label>
			<input id="{formId}-green" type="range" bind:value={green} {...RANGE} />
			<span>
				{greenStr}
			</span>
			<label for="{formId}-blue">Blue</label>
			<input id="{formId}-blue" type="range" bind:value={blue} {...RANGE} />
			<span>
				{blueStr}
			</span>
		</form>
		<output for={formId}>
			<code style:--r={redStr} style:--g={greenStr} style:--b={blueStr}>
				#{toHex(red)}{toHex(blue)}{toHex(green)}
			</code>
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
			--_background-color: rgb(var(--r) var(--g) var(--b) / 1);
			transition: color 0.2s ease-in-out;
			background-color: var(--_background-color);
			color: contrast-color(var(--_background-color));
			border-radius: var(--border-radius-large);
			padding: var(--padding);
		}
	}
</style>
