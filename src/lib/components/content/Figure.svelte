<script lang="ts">
	import { m } from '$i18n/messages';
	import { X } from '@lucide/svelte';

	interface Props {
		src: string;
		alt: string;
		caption: string;
		title?: string;
	}
	let { src, alt, caption, title = caption }: Props = $props();
	const popoverId = crypto.randomUUID();
</script>

<!--
@component

This is for images

TODO: rename this to Image
-->
<div>
	<button popovertarget={popoverId} aria-label={alt} popovertargetaction="show">
		<enhanced:img {src} {alt} {title} loading="lazy" />
		<small>{caption}</small>
	</button>
</div>
<dialog id={popoverId} popover>
	<button
		aria-label={m.close()}
		title={m.close()}
		popovertargetaction="hide"
		popovertarget={popoverId}
	>
		<X />
	</button>
	<figure>
		<enhanced:img {src} {alt} {title} loading="lazy" />
		<figcaption>
			<small>
				{caption}
			</small>
		</figcaption>
	</figure>
</dialog>

<style>
	div {
		container-type: inline-size;
		container-name: gallery-container;
		& > button[popovertargetaction='show'] {
			position: relative;
			display: block;
			background: none;
			border: none;
			border-radius: var(--border-radius);
			overflow: hidden;
			box-shadow: var(--box-shadow);
			transition:
				border-radius 0.3s ease-in-out,
				box-shadow 0.2s ease-in-out,
				transform 0.4s ease-in-out;
			padding: 0;
			margin-block: 0;
			margin-inline: auto;

			&:hover {
				border-radius: 0;
				cursor: pointer;
				box-shadow: none;
				transform: scale(1.05);
				z-index: 1;
				& > small {
					opacity: 0;
				}
			}

			& > enhanced\:img {
				max-width: 100%;
				object-fit: contain;
			}
			& small {
				position: absolute;
				padding-inline: var(--padding-small);
				padding-block-end: var(--padding-small);
				padding-block-start: var(--padding);
				z-index: 1;
				inset-block-end: 0;
				inset-inline-start: 0;
				inset-inline-end: 0;
				background-color: var(--background-color);
				mask-image: linear-gradient(to top, oklch(0 0 0 / 0.9) 75%, transparent);
				color: var(--medium-grey);
				opacity: 1;
				transition: opacity 0.5s ease-in-out;
				max-height: 33%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			@container gallery-container (width < 24rem) {
				& > small {
					opacity: 0;
				}
			}
		}
	}
	dialog[popover] {
		border: none;
		padding: 0;
		background-color: transparent;
		box-shadow: var(--box-shadow);
		border-radius: var(--border-radius-large);
		transition-behavior: allow-discrete;
		transition:
			opacity 0.3s ease-in-out,
			display 0.3s ease-in-out,
			filter 0.3s ease-in-out,
			backdrop-filter 0.3s ease-in-out,
			transform 0.5s ease-in-out,
			border-radius 0.6s ease-in-out;
		opacity: 0;
		transform: scale(0.8) translateY(2rem);
		&:hover {
			border-radius: 0;
		}
		&::backdrop {
			backdrop-filter: blur(0.3rem);
			filter: brightness(0.6);
		}
		&:popover-open {
			opacity: 1;
			transform: scale(1) translateY(0rem);
			@starting-style {
				& {
					opacity: 0;
					transform: scale(0.8) translateY(2rem);
				}
			}
		}
		& > figure {
			& > enhanced\:img {
				position: relative;
				object-fit: contain;
			}

			& > figcaption {
				padding-block: var(--padding-small);
				color: var(--medium-grey);
				background-color: var(--background-color);
				opacity: 0.8;
				text-align: center;
			}
		}
		& > button {
			position: absolute;
			inset-block-start: 0;
			inset-inline-end: 0;
			z-index: 1;
			background: none;
			border: none;
			margin-inline-start: auto;
			padding: var(--padding-small);
			color: var(--color);
			mix-blend-mode: difference;
			&:hover {
				cursor: pointer;
			}
		}
	}
</style>
