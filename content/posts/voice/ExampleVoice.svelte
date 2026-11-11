<script module lang="ts">
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
</script>

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

<ExampleWrapper>
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
</ExampleWrapper>

<style>
	p.error {
		color: var(--red);
	}
	p.loading {
		opacity: 0.8;
	}
	em {
		color: var(--grey);
	}
</style>
