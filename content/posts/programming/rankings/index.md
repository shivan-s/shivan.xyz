---
author: Shivan Sivakumaran
title: Rankings
date: 2024-04-29
summary: An example of user changing ranking of listed data
categories: ["programming"]
tags: ["ranking", "svelte", "arrays"]
draft: false
cover:
  image: ranking.gif
  alt: Screen video of rank changes
  caption: caption
  relative: false
  hidden: false
---

This is the issue I had at work: it involved allowing users to determine ranking of particular items of the list. Turns out alphabetical order won't cut it and they need their own way to prioritise these items.

Unfortunately, I can't share the actual problem case with you, but I can share an analogous example.

To see the full interactive site, [here is a Svelte REPL](https://svelte.dev/repl/40bd48de737e4858b45a7fe11be400a6?version=4.2.15).

Say we have a list of names and we would like to change the order of these.

Here we can display the list of names and a select box next to them. When we change the select box, we can move the person to a different placing, hence changing the order of the list.

Here is all the code.

```svelte
<script>
	import { flip } from "svelte/animate"
	import { sineInOut } from "svelte/easing"
	let list = ["Alan", "Bridget", "Charlie", "Diana", "Emma", "Fred"]

	let selected = {}

	$: {
			const [person, newRank] = Object.entries(selected).at(0) || []
			if (person && newRank) {
				const personIdx = list.indexOf(person)
				list.splice(personIdx, 1)
				list = [
					...list.slice(0,newRank-1),
					person,
					...list.splice(newRank-1)
				]
			}
			selected = {};
	}

</script>

<h1>Rank Example</h1>

<ol>
{#each list as person, idx (person)}
<li animate:flip={{easing: sineInOut }}>
		<select bind:value={selected[person]}>
		<option type="hidden" value={undefined}>Please select rank</option>
		{#each Array.from(Array(list.length).keys()) as r}
			{#if r != idx}
				<option value={r+1}>{r+1}</option>
			{/if}
		{/each}
	</select>
		<div>
	{person}
	</div>
</li>
{/each}
</ol>

<style>
	ol {
		list-style-type: decimal;
	}
	li {
		display: grid;
		grid-template-rows: auto;
		grid-template-columns: 1fr 2fr 3fr;
		gap: 1em;
	}
</style>
```

## Creating reactivity

To explain this above code further: when we change the selection this causes the bound variable `selected` to change. It's object and when there is a change, depending on which select box is changed, the object will receive a key with the person's name and the value of that key will be the rank.

We can write some code to react to this change as shown below:

```js
$: {
  const [person, newRank] = Object.entries(selected).at(0) || [];
  if (person && newRank) {
    const personIdx = list.indexOf(person);
    list.splice(personIdx, 1);
    list = [...list.slice(0, newRank - 1), person, ...list.splice(newRank - 1)];
  }
  selected = {};
}
```

The first line turns the object into an array which can process. The `person` variable is the individual who we will be changing the rank of, as well as the `newRank` will be their new rank.

We obtain the index of the `list` this way. We use the `splice()` to remove this person from the `list` in place. We can use the spread operator (`...`) to spread the first slice of `list`, which contains everything from the start of the `list` up until the point where we want to add our person to their new rank. We then add the `person`, and following this is the rest of the `list`.

This is how I implemented ranking (on client-side). Obviously, some play around with the code needs to be done to make this server-side, but the similar use of array slicing and splicing will be at play.

## Adding animations and improvements

You can see from the display image. When the rank is changed, there is an animation. This is easily implemented in Svelte's animation. Here we use `flip()`, which [stands for First, Last, Invert, Play](https://svelte.dev/docs/svelte-animate#flip). Finally, we use an easing function, `sineInOut` (also provided by svelte) to make the change smooth for users.

Something that could improve this is a drag and drop implementation, which is more of challenge to implement.

I hope this was useful to you. Let me know what you think.
