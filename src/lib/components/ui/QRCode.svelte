<script lang="ts">
	import { config } from '$lib/config';
	import { QRCodeJs, type Options } from '@qr-platform/qr-code.js';
	import { onMount } from 'svelte';

	interface Props {
		data?: string;
	}

	let { data = config.url }: Props = $props();

	let ticker = $state(0);
	let style = $state<CSSStyleDeclaration | null>(null);
	const DELAY_MS = 50;
	onMount(() => {
		style = window.getComputedStyle(document.body);
		let interval = setInterval(() => (ticker = (ticker + 1) % 100), DELAY_MS);
		return () => clearInterval(interval);
	});

	let backgroundColor = $derived(style ? style.getPropertyValue('--background-color') : undefined);
	let color = $derived(style ? style.getPropertyValue('--color') : undefined);
	let primaryColor = $derived(style ? style.getPropertyValue('--primary-color') : undefined);
	let alternateColor = $derived(style ? style.getPropertyValue('--alternative-color') : undefined);

	let container: HTMLDivElement | undefined = $state();
	$effect(() => {
		const options: Options = {
			height: '50%',
			width: '50%',
			data,
			cornersSquareOptions: {
				type: 'rounded',
				gradient: {
					type: 'linear',
					rotation: -Math.PI * (ticker / 50),
					colorStops: [
						{ offset: 0, color: primaryColor },
						{ offset: 0.5, color: color },
						{ offset: 1, color: alternateColor }
					]
				}
			},
			cornersDotOptions: {
				type: 'rounded',
				gradient: {
					type: 'linear',
					rotation: -Math.PI * (ticker / 50),
					colorStops: [
						{ offset: 0, color: primaryColor },
						{ offset: 0.5, color: color },
						{ offset: 1, color: alternateColor }
					]
				}
			},
			dotsOptions: {
				type: 'dot',
				gradient: {
					type: 'linear',
					rotation: Math.PI * (ticker / 50),
					colorStops: [
						{ offset: 0, color: primaryColor },
						{ offset: 0.5, color: color },
						{ offset: 1, color: alternateColor }
					]
				}
			},
			backgroundOptions: {
				color: backgroundColor
			}
		};
		const qrCode = new QRCodeJs(options);
		qrCode.append(container, { clearContainer: true });
	});
</script>

<div bind:this={container}></div>

<style>
	div {
		display: grid;
		width: 100%;
		height: 100%;
		& > :global(svg) {
			margin: auto;
		}
	}
</style>
