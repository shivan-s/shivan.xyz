<script lang="ts">
	import { places } from './places';
	import { resolve } from '$app/paths';
	import { m } from '$i18n/messages.js';
	import MyMap from './MyMap.svelte';
</script>

<a href={resolve('/my-map')} target="_blank">Expand Map</a>
<figure>
	<MyMap />
	<figcaption>
		<p>
			This map contains locations I want to visit (<strong style="color: hsl(1 50% 50% / 1)"
				>red</strong
			>) as well as places I have visited (<strong style="color: hsl(120 50% 50% / 1)">green</strong
			>).
		</p>
	</figcaption>
</figure>
<div>
	<details>
		<summary>{m.locations()}</summary>
		<h3 class="red">To Visit</h3>
		<ul>
			{#each places.filter(({ visited }) => !visited) as p, idx (idx)}
				<li><strong>{p.title}</strong> - {@html p.body}</li>
			{/each}
		</ul>
		<h3 class="green">Visited</h3>
		<ul>
			{#each places.filter(({ visited }) => visited) as p, idx (idx)}
				<li><strong>{p.title}</strong> - {@html p.body}</li>
			{/each}
		</ul>
	</details>
</div>

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
	figure > figcaption {
		text-align: center;
	}
	details {
		overflow: hidden;
		border-radius: var(--border-radius);
		transition: backdrop-filter 0.3s ease-in-out;
		padding-inline: var(--padding-small);
		backdrop-filter: invert(var(--invert));

		&:hover {
			backdrop-filter: invert(var(--invert-highlight));
		}

		&::details-content {
			transition:
				block-size 0.3s ease-in-out,
				opacity 0.4s ease-in-out,
				padding-block-end 0.4s ease-in-out;
			transition-behavior: allow-discrete;
			opacity: 0;
			block-size: 0;
		}

		&[open]::details-content {
			block-size: auto;
			block-size: calc(auto);
			padding-block-end: var(--padding);
			opacity: 1;
		}
		& > summary {
			font-weight: 900;
			padding: var(--padding);
			cursor: pointer;
		}
	}
</style>
