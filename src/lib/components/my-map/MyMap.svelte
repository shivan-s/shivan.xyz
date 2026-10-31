<script lang="ts">
	import { m } from '$i18n/messages.js';
	import { places } from './places';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import type { Map } from 'maplibre-gl';

	const containerId = 'map';
	const style = 'https://tiles.openfreemap.org/styles/liberty';
	let map: Map | undefined = $state();
	async function loadMap() {
		const m = await import('maplibre-gl');
		map = new m.Map({
			container: containerId,
			style,
			center: [0, 0],
			zoom: 1
		});
		if (!map) return;
		map.addControl(new m.FullscreenControl());
		const s = window.getComputedStyle(document.body);
		const red = s.getPropertyValue('--red');
		const green = s.getPropertyValue('--green');
		places.forEach((p) => {
			if (!map) return;
			const h2 = `<h2>${p.title}</h2>`;
			const html: string[] = [h2];
			if (p.body) html.push(`<p>${p.body}</p>`);
			const color = p.visited ? green : red;
			const popup = new m.Popup().setHTML(html.join(''));
			const marker = new m.Marker({ color }).setLngLat(p.lngLat).setPopup(popup);
			marker.addTo(map);
		});
	}

	const toVisit = places.filter(({ visited }) => !visited);
	const haveVisited = places.filter(({ visited }) => visited);

	$effect(() => {
		loadMap();
		return () => {
			if (!map) return;
			map.remove();
		};
	});
</script>

<figure>
	<div id={containerId}></div>
	<figcaption>
		<p>
			This map contains locations I want to visit (<strong class="red">red</strong>) as well as
			places I have visited (<strong class="green">green</strong>).
		</p>
	</figcaption>
</figure>
<div>
	<details>
		<summary>{m.locations()}</summary>
		<h3 class="red">To Visit ({new Intl.NumberFormat().format(toVisit.length)})</h3>
		<ul>
			{#each toVisit as p, idx (idx)}
				<li><strong>{p.title}</strong> - {@html p.body}</li>
			{/each}
		</ul>
		<h3 class="green">Visited ({new Intl.NumberFormat().format(haveVisited.length)})</h3>
		<ul>
			{#each haveVisited as p, idx (idx)}
				<li><strong>{p.title}</strong> - {@html p.body}</li>
			{/each}
		</ul>
	</details>
</div>

<style>
	.red {
		color: var(--red);
	}
	.green {
		color: var(--green);
	}
	figure {
		& > figcaption {
			text-align: center;
		}
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
	}
</style>
