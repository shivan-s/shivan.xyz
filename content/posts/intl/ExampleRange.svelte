<script lang="ts">
	import { ExampleWrapper } from '$lib/components/ui';
	import { sineIn, sineOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	let locale = $state('en-NZ');
	let dateStyle: Intl.DateTimeFormatOptions['dateStyle'] = $state('medium');
	let start = $state(new Date());
	let end = $state(new Date());
	let result = $derived(
		new Intl.DateTimeFormat(locale, { dateStyle }).formatRange(new Date(start), new Date(end))
	);
	const formId = 'example-range';
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
				Date Style
				<select bind:value={dateStyle}>
					{#each ['medium', 'full', 'long', 'short'] satisfies Intl.DateTimeFormatOptions['dateStyle'][] as o (o)}
						<option value={o}>{o}</option>
					{/each}
				</select>
			</label>
			<label>
				Date 1
				<input type="date" bind:value={start} />
			</label>
			<label>
				Date 2
				<input type="date" bind:value={end} />
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
