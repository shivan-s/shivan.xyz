---
title: CSS Nesting
date: 2026-06-20
summary: Another cool CSS trick
draft: false
---

<script>
	import YouTube from "YouTube"
    import ExampleDemo from "./ExampleDemo.svelte"
</script>

Did I mention how much I [like](./theming) [CSS](./logical)? Well, I'll say it again. I love CSS.

<YouTube id="ESfElpwWJ2A" />

I want to introduce the idea of CSS nesting, which I think is really cool. It helps because you can repeat yourself less.

To see what I mean, let's start with an example (in [Svelte](https://svelte.dev)).

<ExampleDemo />

```svelte
<script lang="ts">
	// ...
</script>

<div class="wrapper">
	<!-- ... -->
	<button class="btn" type="button">A button! (but not really)</button>
</div>

<style>
	@property --angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: true;
	}
	@keyframes spinning {
		0% {
			--angle: 0deg;
		}
		100% {
			--angle: 360deg;
		}
	}

	:root {
		animation: spinning 5s infinite;
	}

	.wrapper {
		display: grid;
	}

	.btn {
		transition:
			color 0.2s ease-in-out,
			background-color 0.2s ease-in-out;
		border: solid 2px;
		border-radius: 1rem;
		padding-inline: 0.5rem;
		padding-block: 1rem;
	}

	.btn:hover {
		cursor: pointer;
		color: contrast-color(oklch(80% 0.4 var(--angle)));
		background-color: oklch(80% 0.4 var(--angle));
	}
</style>
```

See how we repeat out class names? Also, if we are using Svelte, [we can lean into scoped styling](https://svelte.dev/docs/svelte/scoped-styles), so instead of using many class names, we can just target the HTML element without fear of everything inheriting this style.

The syntax is `&`.

We can demonstrate this below (NB: some code has been removed for brevity).

```svelte
<script lang="ts">
	// ...
</script>

<!-- ... -->

<style>
	/* ... */

	div {
		display: grid;
		& > button {
			transition:
				color 0.2s ease-in-out,
				background-color 0.2s ease-in-out;
			border: solid 2px;
			border-radius: 1rem;
			padding-block: 0.5rem;
			padding-inline: 1rem;
			&:hover {
				cursor: pointer;
				color: contrast-color(oklch(80% 0.4 var(--angle)));
				background-color: oklch(80% 0.4 var(--angle));
			}
		}
	}
</style>
```

In the example, we have removed the class names and we just use the HTML tags as CSS selectors.
