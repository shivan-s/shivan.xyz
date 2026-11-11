---
title: Voice To Text Demo
date: 2026-11-11
summary: A Demo of using the SpeechRecognition API
draft: false
cover:
  image: side-by-side.gif
  alt: Screen recording of a interface showing voice being turned into text
  caption: 'Voice to Text'
---

<script>
	import Figure from "Figure"
    import ExampleVoice from "./ExampleVoice.svelte"
    import SideBySide from "./side-by-side.gif"
</script>

I want demo a cool little API in the browser. At the time of writing, it's only available in Chromium based browsers and a varient of this API in available only on Safari (sorry Firefox lovers).

It's called the [SpeechRecognition API and you can find our more about it here](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition).

## Starting with Types

The typing libraries that link to my LSP don't offer all the types, so I get errors. I will need to "monkey patch" the types that aren't included. I've done do below (thanks to the help of MDN, of course).

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

Since, we will be using [Svelte](https://svelte.dev), we wrap this in a `<script module lang="ts"></script>`.

There are other types which do come with the typing libraries such as `SpeechRecognitionResult`, `SpeechRecogntion ResultList`, and `SpeechRecognitionEvent`.

## The Svelte Implementation

Below we have implemented our logic all in one file account.

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
{/if}
```

We cover situation where the API is not available (e.g. Firefox). Also, Safari has it's own implemenation as mentioned before; hence the logical OR (`||`) operator.

We set `continuous` and `interimResults` to `true`. This means we get a results streaming continously, while also results that may not be complete.

We can see how it pairs quite nicely with Svelte's ablity to manage state.

We update a reactive variable, `results` with the event listener we set (also, don't forget to remove them when the component is destroyed!).

A `SpeechRecognitionEvent` contains an iterable of one element on `results`; typed as `SpeechRegcognitionList`. This array grows as more is said. Usually, one element is a constant utterance, and a new element is created when there is a pause and a new utterance is made.

## Demo

Below is the demo. Have fun!

<ExampleVoice />

An isolated instance of this [demo can be found here](https://voice.shivan.xyz).

<Figure src={SideBySide} alt="Screen recording showing the live demo of voice to text in with Chrome on the left and Safari on the right" caption="Example of voice to text. Chrome on the left and Safari on the right - their functionality isn't consistent!" />

## Future & Reflections

Future improvement can include having commands - for example, fields in a form. However, I haven't seen voice-based forms take off...

There might be traction in this API since it's popular for use with Chatbots and Large Language Models. I do think it's a hidden gem that this is built into (most) browsers with no need to pull in external dependencies.
