<script lang="ts">
	import { ExampleWrapper } from '$lib/components/ui';
	import { sineIn, sineOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	let n = $state(10e100);
	let locale = $state('en-NZ');
	let notation: Intl.NumberFormatOptions['notation'] = $state('standard');
	let result = $derived(new Intl.NumberFormat(locale, { notation }).format(n));
	const formId = 'example-number';
</script>

<ExampleWrapper>
	<div>
		<form id={formId}>
			<label>
				Locale
				<select bind:value={locale}>
					<option value="en-NZ">🇳🇿 en-NZ</option>
					<option value="en-US">🇺🇸 en-US</option>
					<option value="ko-KR">🇰🇷 ko-KR</option>
					<option value="ta-LK">🇱🇰 ta-LK</option>
					<option value="es-ES">🇪🇸 es-ES</option>
					<option value="ru-RU">🇷🇺 ru-RU</option>
					<option value="hi-IN">🇮🇳 hi-IN</option>
					<option value="zh-CN">🇨🇳 zh-CN</option>
				</select>
			</label>
			<label>
				Number
				<input type="number" bind:value={n} />
			</label>
			<label>
				Notation
				<select bind:value={notation}>
					{#each ['standard', 'scientific', 'engineering', 'compact'] satisfies Intl.NumberFormatOptions['notation'][] as o (o)}
						<option value={o}>{o}</option>
					{/each}
				</select>
			</label>
		</form>
		<output form={formId}>
			{#key result}
				<span
					title={result}
					in:fade={{ easing: sineIn, delay: 250 }}
					out:fade={{ easing: sineOut, duration: 200 }}
				>
					{result}
				</span>
			{/key}
		</output>
	</div>
</ExampleWrapper>

<style>
	div {
		display: grid;
		gap: var(--gap);
		justify-content: center;
		justify-items: center;
		& form {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			gap: var(--gap);
		}
	}

	output {
		display: grid;
		width: 100%;
		justify-content: center;
		grid-template-areas: 'stack';
		& > span {
			grid-area: stack;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			padding: var(--padding-small);
		}
	}
</style>
