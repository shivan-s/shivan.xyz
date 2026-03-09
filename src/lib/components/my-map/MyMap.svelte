<script lang="ts">
	import { places } from './places';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onMount } from 'svelte';

	const containerId = 'map';
	const style = 'https://tiles.openfreemap.org/styles/liberty';
	async function loadMap() {
		const m = await import('maplibre-gl');
		const map = new m.Map({
			container: containerId,
			style,
			center: [0, 0],
			zoom: 1
		});
		const s = window.getComputedStyle(document.body);
		const red = s.getPropertyValue('--red');
		const green = s.getPropertyValue('--green');
		places.forEach((p) => {
			const h2 = `<h2>${p.title}</h2>`;
			const html: string[] = [h2];
			if (p.body) html.push(`<p>${p.body}</p>`);
			const color = p.visited ? green : red;
			const popup = new m.Popup().setHTML(html.join(''));
			const marker = new m.Marker({ color }).setLngLat(p.lngLat).setPopup(popup);
			marker.addTo(map);
		});
	}

	interface Props {
		fullScreen?: boolean;
	}

	let { fullScreen = false }: Props = $props();

	onMount(() => {
		loadMap();
	});
</script>

<div id={containerId} style={fullScreen ? 'width: 100dvw; height: 100dvh' : ''}></div>

<style>
	:root {
		--red: hsl(1 50% 50% / 1);
		--green: hsl(120 50% 50% / 1);
	}
	.red {
		color: var(--red);
	}
	.green {
		color: var(--green);
	}
	div {
		width: 100%;
		height: 32rem;
		transition:
			border-radius 0.3s ease-in-out,
			box-shadow 0.3s ease-in-out;
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow);
		&:hover {
			border-radius: 0;
			box-shadow: none;
		}
		& :global(button.maplibregl-popup-close-button) {
			color: var(--color);
		}
		& :global(div.maplibregl-popup-content) {
			background-color: var(--background-color);
		}
		& :global(div.maplibregl-popup-tip) {
			border-top-color: var(--background-color);
		}
	}
</style>
