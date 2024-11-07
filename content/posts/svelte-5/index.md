---
author: Shivan Sivakumaran
title: Svelte 5 Simplified
date: 2024-11-05
summary: Svelte 5 Simplified
tags: ["programming", "svelte"]
draft: false
cover:
  hidden: true
---

https://svelte.dev/docs/svelte/v5-migration-guide

Let's start with a simple example.

## Runes

### $state()

[More information](https://svelte.dev/docs/svelte/$state)

A simple example where input will change the text on screen. In others words, changing state reactively.

Old:

```svelte
<script>
	let name = 'world';
</script>

<input bind:value={name} />
<p>Hello {name}!</p>
```

New:

```svelte
<script>
	let name = $state('world');
</script>

<input bind:value={name} />
<p>Hello {name}!</p>
```

### $derived()

We have to use `$:` to declare a reactive variable, else `nameToDisplay` won't update when `name` changes.

Old:

```svelte
<script>
	let name = "world";
	$: nameToDisplay = `${name}!`
</script>

<input bind:value={name} />
<p>Hello, {nameToDisplay}</p>
```

New:

```svelte
<script>
	let name = $state('world');
	let nameToDisplay = $derived(`${name}!`)
</script>

<input bind:value={name} />
<p>Hello, {nameToDisplay}</p>
```

### $effect()

Something to avoid, since we have [`$derived()`](<#$derived()>), but here is a simple example if we want to trigger a side effect (e.g. logging).

Old:

```svelte
<script>
	let name = 'world'
	$: {
		console.log("Name changed: ", name)
	}
</script>

<input bind:value={name} />
<p>Hello, {name}</p>
```

New:

```svelte
<script>
	let name = $state('world')
	$effect(()=> console.log("Name changed: ", name))
</script>

<input bind:value={name} />
<p>Hello, {name}</p>
```

## Snippets
