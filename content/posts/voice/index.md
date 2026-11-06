---
title: Voice To Text Demo
date: 2026-11-06
summary: A Demo of using the SpeechRecognition API
draft: false
cover:
  image: demo.gif
  alt: Screen recording of a interface showing voice being turned into text
  caption: 'Voice to Text'
---

<script>
	import Figure from "Figure"
    import ExampleVoice from "./ExampleVoice.svelte"
    import Demo from "./demo.gif"
</script>

I want demo a cool little API in the browser. At the time of writing, it's only available in Chromium based browsers and a varient of this API in available only on Safari (sorry Firefox lovers).

It's called the [SpeechRecognition API and you can find our more about it here](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition).

## Starting with Types

This isn't covered by my LSP, so I need to declare the types myself. Thankfully, MDN provides an excellent start. This isn't an exhaustive list and I've only declared what I need for this demo.

```ts
interface SpeechRecognition {
	/**
	 * Returns and sets the language. Defaults to the HTML lang attribute value, or the user agent's language setting if not set.
	 */
	lang: string;
	/**
	 * Determine if a result is continous or if set to `false` will return a result after recording.
	 * @default false
	 */
	continuous: boolean;
	/**
	 * Will return result even when recording if `true`.
	 * @default false
	 */
	interimResults: boolean;
	/**
	 * Starts the speech recognition service, may prompt user for permission.
	 */
	start(): void;
	/**
	 * Stops the speech recognition service. If `countinous` is set to `false`, then the result is given.
	 */
	stop(): void;
	/**
	 * Aborts the speech service and terminates audio. No result is returned.
	 */
	abort(): void;
	/**
	 * Event listener providing a result.
	 */
	addEventListener(s: 'result', e: (e: SpeechRecognitionEvent) => void): void;
	/**
	 * Free resource
	 */
	removeEventListener(s: 'result', e: (e: SpeechRecognitionEvent) => void): void;
}
interface SpeechRecognitionConstructor {
	new (): SpeechRecognition;
}

declare const window: {
	SpeechRecognition: SpeechRecognitionConstructor;
	webkitSpeechRecognition: SpeechRecognitionConstructor;
};
```

The above code was an exercise in itself, "monkey-patching" the types. Since, we will be using [Svelte](https://svelte.dev), we wrap this in a `<script module lang="ts"></script>`.

As a caveat, it's partially typed. For example, `SpeechRecognitionResult` is given to me.

## The Svelte Implementation

Here is the code that will house the logic.

```svelte
<script lang="ts">
	import { ExampleWrapper } from '$lib/components/ui';
	import { onMount } from 'svelte';

	let recognition: SpeechRecognition | null = $state(null);
	let recording = $state(false);
	let results: SpeechRecognitionResultList | null = $state(null);

	onMount(() => {
		try {
			recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
		} catch (err) {
			if (err instanceof TypeError) {
				console.info('No SpeechRecogntion available');
			} else {
				throw err;
			}
		}
		if (!recognition) {
			console.log('No Speech recognition');
			return;
		}
		recognition.continuous = true;
		recognition.interimResults = true;
		const handleEventResult = (e: SpeechRecognitionEvent) => {
			results = e.results;
		};
		recognition.addEventListener('result', handleEventResult);
		return () => {
			if (recognition) {
				recognition.removeEventListener('result', handleEventResult);
				recognition.abort();
			}
		};
	});

	const handleClick = () => {
		if (!recognition) {
			return;
		}
		if (recording) {
			recording = false;
			recognition.stop();
		} else {
			recording = true;
			recognition.start();
		}
	};
	const handleClearClick = () => {
		results = null;
	};
</script>

{#if !recognition}
	<p class="error">No Speech Recognition Available</p>
{:else}
	{#if results}
		{#each results as { isFinal, ...result }, i (i)}
			{#each result as { transcript, confidence }, j (j)}
				<p class:loading={!isFinal}>
					<strong>{i}</strong>:&nbsp;{transcript}<br />
					{#if isFinal}
						<small>Confidence: {Math.round(confidence * 100)}%</small>
					{/if}
				</p>
				{#if isFinal && i + 1 === results.length}
					<p>
						<em>Please speak...</em>
					</p>
				{/if}
			{/each}
		{/each}
	{:else}
		<p>
			<em>Nothing to show!</em>
		</p>
	{/if}
	<button onclick={handleClick}>
		{#if recording}
			⏸️Click to Pause
		{:else}
			⏺️ Click to Record
		{/if}
	</button>
	<button onclick={handleClearClick} disabled={recording}> Clear </button>
```

We cover situation where the API is not available (e.g. Firefox). Also, Safari has it's own implemenation as mentioned before; hence the logical OR (`||`) operator.

We can see how it pairs quite nicely with Svelte ablity to manage state.

## Demo

Below is the demo. Have fun!

<ExampleVoice />

An isolated instance of this [demo can be found here](https://voice.shivan.xyz).

<Figure src={Demo} alt="Screen recording showing the live demo of voice to text in browser" caption="Example of voice to text" />

## Future & Reflections

Future improvement can include having commands - for example, fields in a form. However, I haven't seen voice-based forms take off...

There might be traction in this API since it's popular with using Chatbots and Large Language Models. I do think it's a hidden gem that this all built into (most) browsers with no need to pull in external dependencies.
