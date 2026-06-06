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

	const paddings = ['padding-right', 'padding-inline-end'] as const;
	let padding: (typeof paddings)[number] = $state('padding-right');

	const formId = 'example-padding';
</script>

<ExampleWrapper style="overflow: unset">
	<div>
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
			<label>
				<code>padding</code>
				<select bind:value={padding}>
					{#each paddings as p (p)}
						<option value={p}>{p}</option>
					{/each}
				</select>
			</label>
		</form>
		{#key [writingMode, dir, padding]}
			<output in:fade={{ easing: sineInOut }} for={formId} {dir} style:--wm={writingMode}>
				<cite
					class:padding-right={padding === 'padding-right'}
					class:padding-inline-end={padding === 'padding-inline-end'}
					title="Iago in 'Othello' by William Shapespeare (Act I, Scene I)">Iago</cite
				>
				<blockquote>
					But I will wear my heart upon my sleeve<br />
					For daws to peck at: I am not what I am.
				</blockquote>
			</output>
		{/key}
	</div>
</ExampleWrapper>

<style>
	div {
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
		& > output {
			border: 1px solid var(--color);
			padding: var(--padding-small);
			border-radius: var(--border-radius);
			writing-mode: var(--wm);
			display: flex;
			align-items: start;
			& > cite {
				all: unset;
				transition:
					background-image 0.3s ease-in-out,
					background-clip 0.3s ease-in-out;
				&::first-letter {
					color: var(--primary-color);
					font-size: 2rem;
				}
				&.padding-right {
					padding-right: 1rem;
				}
				&.padding-inline-end {
					padding-inline-end: 1rem;
				}
			}
			& > blockquote {
				all: unset;
			}
			& > blockquote {
				all: unset;
			}
		}
		&:hover > output > cite {
			background-image:
				linear-gradient(to right, var(--background-color), var(--background-color)),
				linear-gradient(to right, var(--alternative-color), var(--alternative-color));
			background-clip: content-box, padding-box;
		}
	}
</style>
