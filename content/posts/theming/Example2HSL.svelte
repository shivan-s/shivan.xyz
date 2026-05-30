<script lang="ts">
	import ExampleWrapper from '$lib/components/ui/ExampleWrapper.svelte';

	const formId = 'example-2-hsl';
	const RANGE = Object.freeze({
		min: 1,
		max: 16,
		step: 1
	});
	let numColours = $state(16);
	let numShades = $state(16);
</script>

<ExampleWrapper>
	<div>
		<form id={formId}>
			<label
				>Colours
				<input type="range" bind:value={numColours} {...RANGE} />
			</label>
			<label
				>Shades
				<input type="range" bind:value={numShades} {...RANGE} />
			</label>
		</form>
		<output style:--n={numColours.toString()} for={formId}>
			{#each Array.from({ length: numShades }, (_, i) => 100 - Math.round(100 * (i / numShades))) as lightness (lightness)}
				{#each Array.from( { length: numColours }, (_, j) => Math.floor(360 * (j / numColours)) ) as hue (hue)}
					<span
						title="hsl({hue}deg 50% {lightness.toString()}%)"
						style:--h="{hue}deg"
						style:--s="50%"
						style:--l="{lightness.toString()}%"
					></span>
				{/each}
			{/each}
		</output>
	</div>
</ExampleWrapper>

<style>
	div {
		display: grid;
		gap: var(--gap);
		place-items: center;
		& > output {
			display: grid;
			gap: var(--gap-small);
			grid-template-columns: repeat(var(--n), 1fr);
			& > span {
				--_background-color: hsl(var(--h) var(--s) var(--l) / 1);
				transition: color 0.2s ease-in-out;
				background-color: var(--_background-color);
				border-radius: 50%;
				padding: var(--padding);
			}
		}
		& > form {
			display: flex;
			flex-wrap: wrap;
			gap: var(--gap);
			& > label {
				display: flex;
				gap: var(--gap-small);
			}
		}
	}
</style>
