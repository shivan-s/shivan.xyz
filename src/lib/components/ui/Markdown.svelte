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
		backdrop-filter: invert(var(--invert));
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
		background-image: linear-gradient(transparent, transparent), url('$lib/assets/img/noise.svg');
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

	:global(table) {
		display: table;
		border: solid 2px var(--color);
		border-collapse: separate;
		border-spacing: 0;
		margin-block: var(--margin);
		margin-inline: auto;
		border-radius: var(--border-radius);
		& thead {
			border-block-end: solid 1px var(--color);
		}
		& thead tr:first-of-type th:first-child {
			border-start-start-radius: var(--border-radius);
		}
		& thead tr:first-of-type th {
			backdrop-filter: invert(var(--invert));
		}
		& thead tr:first-of-type th:last-of-type {
			border-start-end-radius: var(--border-radius);
		}
		& tbody tr td {
			padding: var(--padding-small);
		}
		& tbody tr:last-of-type td:first-of-type {
			border-end-start-radius: var(--border-radius);
		}
		& tbody tr:last-of-type td:last-of-type {
			border-end-end-radius: var(--border-radius);
		}
		& tbody tr td {
			transition: backdrop-filter 0.3s ease-in-out;
		}
		& tbody tr:nth-of-type(2n) td {
			backdrop-filter: invert(var(--invert));
		}
		& tbody tr:hover td {
			backdrop-filter: invert(var(--invert-highlight));
		}
	}
	:global(pre.shiki.has-diff > code > span.line.diff.add) {
		display: inline-block;
		--_c: hsl(from var(--green) h s l / 0.2);
		background-color: var(--_c);
		box-shadow: 0 0 0.125rem 0.075em var(--_c);
		border-radius: var(--border-radius);
		width: 100%;
	}
	:global(pre.shiki.has-diff > code > span.line.diff.remove) {
		display: inline-block;
		--_c: hsl(from var(--red) h s l / 0.2);
		background-color: var(--_c);
		box-shadow: 0 0 0.125rem 0.075rem var(--_c);
		border-radius: var(--border-radius);
		width: 100%;
	}
</style>
