<script lang="ts">
	let { children } = $props();
</script>

{@render children()}

<style>
	:global(h1, h2, h3, h4, h5, h6) {
		margin-block: var(--margin);
		color: var(--primary-color);
		font-family: 'Optician Sans', sans-serif;
	}

	:global(p) {
		padding-block: var(--padding-small);
	}

	:global(code) {
		font-family: 'Monaspace Radon', monospace;
		padding: var(--padding-very-small);
		border-radius: var(--border-radius);
		backdrop-filter: invert(var(--invert));
	}

	:global(pre:has(code)) {
		padding: var(--padding-small);
		margin-block: var(--margin);
		margin-inline: var(--offset-width);
		overflow-x: auto;
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow);
		transition: box-shadow 0.2s ease-in-out;
		&:hover {
			box-shadow: none;
		}
		& > code {
			backdrop-filter: unset;
		}
	}

	:global(blockquote) {
		backdrop-filter: invert(10%);
		padding-block: var(--padding);
		border-end-end-radius: var(--border-radius);
		border-inline-start: 2px solid var(--primary-color);
		border-start-end-radius: var(--border-radius);
		margin-block: var(--margin);
		margin-inline: var(--offset-width);
		padding-inline-start: var(--padding);
	}

	:global(details.toc) {
		overflow: hidden;
		border-radius: var(--border-radius);
		transition: backdrop-filter 0.3s ease-in-out;
		backdrop-filter: invert(var(--invert));

		&:hover {
			backdrop-filter: invert(var(--invert-highlight));
		}

		&:has(:global(ol:empty)) {
			display: none;
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

	:global(img) {
		max-height: 500px;
	}
</style>
