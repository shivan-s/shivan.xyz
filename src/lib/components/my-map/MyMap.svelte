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
		places.forEach((p) => {
			const h2 = `<h2>${p.title}</h2>`;
			const html: string[] = [h2];
			if (p.body) html.push(`<p>${p.body}</p>`);
			const color = p.visited ? 'hsl(120 50% 50% / 1)' : 'hsl(1 50% 50% / 1)';
			const popup = new m.Popup().setHTML(html.join(''));
			const marker = new m.Marker({ color }).setLngLat(p.lngLat).setPopup(popup);
			marker.addTo(map);
		});
	}

	onMount(() => {
		loadMap();
	});
</script>

<figure>
	<div id={containerId}></div>
	<figcaption>
		<p>
			This map contains locations I want to visit (<strong style="color: hsl(1 50% 50% / 1)"
				>red</strong
			>) as well as places I have visited (<strong style="color: hsl(120 50% 50% / 1)">green</strong
			>).
		</p>
	</figcaption>
</figure>

<style>
	figure {
		& > div {
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
			& > :global(button.maplibregl-popup-close-button) {
				background-color: var(--background-color);
			}
			& > :global(div.maplibregl-popup-content) {
				background-color: var(--background-color);
			}
			& > :global(div.maplibregl-popup-tip) {
				border-top-color: var(--background-color);
			}
		}
		& > figcaption {
			text-align: center;
		}
	}
</style>
