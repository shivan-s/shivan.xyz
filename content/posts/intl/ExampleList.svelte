<script lang="ts">
	import { ExampleWrapper } from '$lib/components/ui';
	import { sineIn, sineOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	const list = ['apples', 'bannanas', 'cherries'] as const;
	let type: Intl.ListFormatType = $state('disjunction');
	let style: Intl.ListFormatStyle = $state('short');
	let locale = $state('en-NZ');
	let result = $derived(new Intl.ListFormat(locale, { style, type }).format(list));
	const formId = 'example-list';
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
				Type
				<select bind:value={type}>
					{#each ['disjunction', 'conjunction'] satisfies Intl.ListFormatType[] as o (o)}
						<option value={o}>{o}</option>
					{/each}
				</select>
			</label>
			<label>
				Style
				<select bind:value={style}>
					{#each ['short', 'narrow', 'long'] satisfies Intl.ListFormatStyle[] as o (o)}
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
