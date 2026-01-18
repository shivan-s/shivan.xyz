<script lang="ts">
	interface Props {
		id: string;
	}

	let { id }: Props = $props();
</script>

<div>
	<iframe
		src="https://www.youtube.com/embed/{id}"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		referrerpolicy="strict-origin-when-cross-origin"
		allowfullscreen
	>
	</iframe>
</div>

<style>
	div {
		position: relative;
		padding-block-end: 56.25%;
		margin-block: var(--margin);
		height: 0;
		overflow: hidden;
		box-shadow: var(--box-shadow);
		transition: box-shadow 0.2s ease-in-out;
		&:hover {
			box-shadow: none;
		}
		& > iframe {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border: 0;
		}
	}
</style>
