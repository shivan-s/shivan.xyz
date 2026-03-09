<script lang="ts">
	import { config } from '$lib/config';
	import { QRCodeJs, type Options } from '@qr-platform/qr-code.js';
	import { onMount } from 'svelte';

	interface Props {
		data?: string;
		opts?: Options;
	}

	let { data = config.url, opts = {} }: Props = $props();

	let style = $state<CSSStyleDeclaration | null>(null);
	let start: number | null = $state(null);
	let ticker = $state(0);
	onMount(() => {
		ticker = window.requestAnimationFrame((timestamp) => {
			if (start === null) {
				start = timestamp;
			}
			const elasped = timestamp - start;
		});
		style = window.getComputedStyle(document.body);
	});

	let backgroundColor = $derived(style ? style.getPropertyValue('--background-color') : undefined);
	let color = $derived(style ? style.getPropertyValue('--color') : undefined);
	let primaryColor = $derived(style ? style.getPropertyValue('--primary-color') : undefined);
	let alternateColor = $derived(style ? style.getPropertyValue('--alternative-color') : undefined);
	let container: HTMLDivElement | undefined = $state();
	$effect(() => {
		const options: Options = {
			...opts,
			data,
			cornersSquareOptions: {
				type: 'rounded',
				gradient: {
					type: 'linear',
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
		& > :global(svg) {
			margin: auto;
		}
		& > :global(svg defs linearGradient) {
			animation: rotate-grad 5s linear infinite;
			transform-origin: 50% 50%;
		}
	}

	@keyframes rotate-grad {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
