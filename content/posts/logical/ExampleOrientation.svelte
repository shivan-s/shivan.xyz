<script lang="ts">
	import ExampleWrapper from '$lib/components/ui/ExampleWrapper.svelte';
	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	const writingModes = [
		'horizontal-tb',
		'vertical-rl',
		'vertical-lr',
		'sideways-rl',
		'sideways-lr'
	] as const;
	let writingMode: (typeof writingModes)[number] | '' = $state('');

	const directions = ['rtl', 'ltr'] as const;
	let direction: (typeof directions)[number] | '' = $state('');
	let dir: (typeof directions)[number] | 'auto' = $derived(direction === '' ? 'auto' : direction);

	const formId = 'example-padding';
</script>

<ExampleWrapper style="overflow: unset">
	<div class="wrapper">
		<form id={formId}>
			<label>
				<code>dir</code>
				<select bind:value={direction}>
					<option disabled value="" selected>Pick</option>
					{#each directions as d (d)}
						<option value={d}>{d}</option>
					{/each}
				</select>
			</label>
			<label>
				<code>writing-mode</code>
				<select bind:value={writingMode}>
					<option disabled value="" selected>Pick</option>
					{#each writingModes as w (w)}
						<option value={w}>{w}</option>
					{/each}
				</select>
			</label>
		</form>
		<div class="key">
			<div class="top"></div>
			<code>top</code>
			<code>block-start</code>
			<div class="top"></div>
			<div class="bottom"></div>
			<code>bottom</code>
			<code>block-end</code>
			<div class="bottom"></div>
			<div class="right"></div>
			<code>right</code>
			<code>inline-end</code>
			<div class="right"></div>
			<div class="left"></div>
			<code>left</code>
			<code>inline-start</code>
			<div class="left"></div>
		</div>
		{#key [writingMode, dir]}
			<output in:fade={{ easing: sineInOut }} for={formId}>
				<div>
					<div {dir} style:--wm={writingMode} class="classical">Classical</div>
					<div {dir} style:--wm={writingMode} class="logical">Logical</div>
				</div>
			</output>
		{/key}
	</div>
</ExampleWrapper>

<style>
	div.wrapper {
		display: grid;
		gap: var(--gap);
		place-items: center;
		& > form {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			gap: var(--gap);
			& > label {
				width: min-content;
			}
		}
		& div.key {
			display: grid;
			grid-template-columns: repeat(4, auto);
			place-items: center;
			& div {
				width: 1rem;
				height: 1rem;
			}
			& > div.top {
				background-color: var(--primary-color);
			}
			& > div.bottom {
				background-color: var(--alternative-color);
			}
			& > div.right {
				background-color: var(--red);
			}
			& > div.left {
				background-color: var(--green);
			}
		}
		& > output > div {
			display: grid;
			gap: var(--gap-large);
			justify-content: space-between;
			align-items: center;
			& div {
				padding: var(--padding-small);
				border-width: 1rem;
				border-style: solid;
				writing-mode: var(--wm);
				text-align: center;
			}
			& div.classical {
				border-top-color: var(--primary-color);
				border-bottom-color: var(--alternative-color);
				border-left-color: var(--green);
				border-right-color: var(--red);
			}
			& div.logical {
				border-block-start-color: var(--primary-color);
				border-block-end-color: var(--alternative-color);
				border-inline-start-color: var(--green);
				border-inline-end-color: var(--red);
			}
		}
	}
</style>
