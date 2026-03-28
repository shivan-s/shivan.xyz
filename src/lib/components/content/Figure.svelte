<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		caption: string;
		title?: string;
	}
	let { src, alt, caption, title = alt }: Props = $props();
</script>

<!--
@component

This is for images

TODO: rename this to Image
-->

<figure>
	<enhanced:img {src} {alt} {title} />
	<figcaption>
		<small>
			{caption}
		</small>
	</figcaption>
</figure>

<style>
	figure {
		display: grid;
		place-content: center;
		gap: var(--gap-small);
		margin-block: var(--margin);

		& > enhanced\:img {
			max-width: 100%;
			object-fit: contain;
			border-radius: var(--border-radius);
			box-shadow: var(--box-shadow);
			transition:
				border-radius 0.3s ease-in-out,
				box-shadow 0.2s ease-in-out;
			margin: 0;

			&:hover {
				border-radius: 0;
				box-shadow: none;
			}
		}

		& > figcaption {
			margin-inline: auto;
			color: var(--medium-grey);
			text-align: center;
		}
	}
</style>
