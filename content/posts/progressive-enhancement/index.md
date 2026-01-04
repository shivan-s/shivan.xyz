---
author: Shivan Sivakumaran
title: Progressive Enhancement
date: 2026-01-04
summary: A better web, in my opinion
tags: ["Progressive Enhancement" , "Web", "Ethics"]
category: ["Programming"]
draft: false
cover:
  image: .
  alt: .
  caption: .
  relative: false
  hidden: true
---

This might come across as preachy. I may have [touched on this briefly](/posts/animations), but it's worth mentioning again.

I used to think _progressive enhancement_ meant no JavaScript. So, I took that to heart. I tried to build features that would work without the need of it.

Quickly, you start to reach your limits in what you can build. The pressure mounts because you have expectations to uphold - to your teammates, your stakeholders, and users (most of whom have JavaScript turned _on_ in their browsers).


Important links:
- [Code](https://github.com/shivan-s/progressive-enhancement)
- [Presentation](https://progressive.shivan.xyz/slides)
- [Demo App](https://progressive.shivan.xyz/)

{{<youtube uijDRRqM5Z8>}}

## Disclaimer

As a short disclaimer, a lot of what I am sharing is opinion.

## Inspiration

Before diving in deeper, I want to acknowledge some talks and resources that inspired me to make this talk (even if I'm just parroting these concepts). As an aside, one day I will have original ideas and thoughts. One day...

### 1. [Paolo Ricciuti - Progressively enhanced apps with Svelte](https://www.youtube.com/watch?v=Ji4Y5vo-gOg)

Ricciuti's talk has much better examples of progressive enhancement.

{{<youtube Ji4Y5vo-gOg>}}

### 2. [Rich Harris – North Star @ JSNation US 2024](https://www.youtube.com/watch?v=UegUi2fWBaU)

This is a higher level video and provides the philosophy of why progressive enhancement is important (even though Harris doesn't say it directly).

{{<youtube UegUi2fWBaU>}}

### 3. [Svelte's Tenets](https://github.com/sveltejs/svelte/discussions/10085)

Again, at a philosophical level, they explain why we should care about progressive enhancement.

## Changing Tides

Maybe, it's time to reframe what progressive enhancement means? We can start by declaring what it **isn't**:
- No JavaScript - "[0kb of JavaScript is not a feature](https://bsky.app/profile/nucliweb.net/post/3m4ix4y6kac2f)"
- Everyone has the same experience

[MDN has a good definition](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement):

> __Progressive enhancement__ is a design philosophy that provides a baseline of essential content and functionality to as many users as possible, while delivering the best possible experience only to users of the most modern browsers that can run all the required code.

There is also another term _gradual degradation_, which in my mind, is the same idea but in reverse.

So by adopting this idea of progressive enhancement, it means we can use JavaScript in the browser, but can we still provide a similar experience if it were not there. This means not everyone who uses our application will have the same experience. Instead, can we think of breaking down functionality to what is critical vs what is nice to have?

## Why?

Why should we bother with progressive enhancement? I'm hoping the above [inspirational content](#inspiration) was enough to inspire you.

Thinkikng about our job as developers, we want to make our application as accessible as possible. This means we need to account for situations different to our own. I am fortunate to have a good internet connection and a fast running computer with the most up to date OS and browsers. This may not be the case for others around the world. What happens if there internet connection is slow? JavaScript is usually the last thing to load and this becomes more apparent on slow connections. Another example is using older version of browsers due to hardware constraints. We need to account for these situations or, at least, try our best to account for these situations.

Having this mindset is a good practice to have for developers. It doesn't have to be web and JavaScript. One example: I wrote a shell script that utilised [`bat`](https://github.com/sharkdp/bat) to distribute to my colleagues. But, silly me didn't think of some users not having `bat`; I would need to include a `cat` implementation as well.

These next points I cannot come up with a strong argument for (yet). Building with progressive enhancement can be technically challenging with good ethical benefits (we are making apps accessible to a wider audience). Additionally, as a byproduct, you will build applications with better user experience. As well as this, the way you build the application can be made simplier. One example I can think of is you will start to lean on ready-made browser implementations instead of coming up with your own. Another example, is that you start to put all your logic on the server instead of dual sources of truth for your logic.

## Examples

Let's look at some simple examples of where we can utilise progressive enhancement.

### 0. Checkbox

We have three checkboxes that function in identical fashion. We check the box and we have text appear next to it. This could be a vital function like displaying some warning text that we would like all our users to see.

We have two different implementations:
1. Use JavaScript to conditionally render the help text
2. Use CSS to conditionally render the help text

{{<figure src="./checkbox-js.gif" alt="Three checkboxes exist and when they are checked, text appears next to them" caption="When JavaScript is enabled">}}

However, let's simulate a possible scenario where JavaScript is disabled or broken due to a poor network connection.

We can handle the lack of JavaScript in two ways:
1. Disable the input and ask the users to either turn on JavaScript or refresh their page
2. Use an implementation that doesn't involve JavaScript

{{<figure src="./checkbox-nojs.gif" alt="Two checkboxes appear with the middle displaying text indicating no JavaScript is available. When the top checkbox is checked, no text appears, but when the bottom is checked, text does indeed appear" caption="JavaScript is disabled">}}

Here is the JavaScript implementation were we bind the `isChecked` variable, which displays the help text if `true`.

```svelte
<!-- JavaScript Only -->
<script lang="ts">
	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	let isChecked = $state(false);
</script>

<div>
    <label for="js">JS</label>
    <input id="js" type="checkbox" bind:checked={isChecked} />
    {#if isChecked}
        <p in:fade={{ easing: sineInOut }}>This is checked!</p>
    {:else}
        <p>&nbsp</p>
    {/if}
</div>

<style>
    div {
        display: flex;
        gap: 1rem;
    }
</style>
```
We use a CSS to display the help text based on the `:checked` pseudo-element and sibling selectors.

```svelte
<!-- CSS Trick -->
<script lang="ts">
</script>

<div>
    <label for="no-js">!JS</label>
    <input id="no-js" type="checkbox" />
    <p>This is also checked</p>
</div>

<style>
    div {
        display: flex;
        gap: 1rem;
        & input + p {
            visibility: hidden;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }
        & input:checked + p {
            visibility: visible;
            opacity: 1;
        }
    }
</style>
```

### 1. Form Action

We utilise progressive enhancement in our form actions.

{{<figure src="./form-js.gif" alt="A button is clicked, loading text is shown followed by the names of individuals being shuffled" caption="With JavaScript, we get the loading state and a nice page transition">}}

Without JavaScript, we still want to ensure we have our functionality, which is the shuffling of the names, even though we degrade the user experience of a loading state and the gentle page transition.

{{<figure src="./form-nojs.gif" alt="A button is clicked, no loading text is shown followed by the names of individuals being shuffled with a slight page refresh" caption="Without JavaScript">}}

This is achieved thanks to SvelteKit's `enhance` (see [form actions](https://svelte.dev/docs/kit/form-actions)).

```svelte
<script lang="ts">
	import { enhance } from '$app/forms';

    // ...

	let loading = $state(false);
</script>
<form
	method="POST"
	action="?/shuffle"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	}}
>
    <!-- ... -->
</form>
```

### 2. Optimistic Updates

This links with form actions and how in the `enhance` segment we can introduce the ability to perform an optimistic update. This makes the user interface appear more responsive as we change the state ahead of time instead of waiting for the server to make the changes for us.

In the scenario below, when the top button is clicked, the date is only shown once the server has completed its work. On the other hand, the button below immediately shows the date - so we update optimistically.

{{<figure src="./opt-js.gif" alt="There are two buttons. When the top button is pressed, it loads and text is shown after the page is loaded. On the bottom button, a date is shown immediately on click followed by a tick" caption="With JavaScript">}}

When we lose JavaScript, we don't get the optimistic update nor the loading state since we need JavaScript for this to happen. But, we still get the core functionality which would involves a form action and server update.

{{<figure src="./opt-nojs.gif" alt="There are two buttons. When both are pressed nothing happens until a date is shown" caption="Without JavaScript">}}

We are able to achieve the optimistic update by updating the state on the client-side.

```svelte
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();

	let done = $derived.by(() => {
		let done = $state(form?.done);
		return done;
	});
	let loading = $state(false);
</script>
<form
    method="POST"
    action="?/done"
    use:enhance={() => {
        loading = true;
        done = new Date();
        return async ({ update }) => {
            await update();
            loading = false;
        };
    }}
    <!-- ... -->
</form>
{#if done}
    <p class="success">
        <time datetime={done.toISOString()}>
            {done.toLocaleDateString()}
        </time>
        {#if done && !loading}✓{/if}
    </p>
{/if}
```

### 3. Show and Tell

Finally, we lean into browser features instead of using JavaScript. One example is using [popovers](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) and [details/summary](https://web.dev/learn/html/details/) to show and hide text.

{{<figure src="./show-js.gif" alt="There are three elements that show and hide text" caption="With JavaScript">}}

{{<figure src="./show-nojs.gif" alt="The toggle button clicked does not show any text but the two other methods work as expected" caption="Without JavaScript">}}


```svelte
<script lang="ts">
	let show = $state(false);

	const popoverId = 'popover';
</script>

<!-- Toggle that only works with JavaScript -->
<div>
    <button onclick={() => (show = !show)}>Toggle</button>
    {#if show}
        <p>I need JS!!</p>
    {:else}
        <p>&nbsp;</p>
    {/if}
</div>

<!-- Popover example -->
<div>
    <button popovertarget={popoverId} popovertargetaction="show">Open</button>
    <dialog popover id={popoverId}>We are awesome!</dialog>
</div>

<!-- Details/Summary -->
<details>
    <summary>Open me!</summary>
    <div>I don't need JS</div>
</details>

<style>
    /* ... */
</style>
```

## Conclusion

Once again, I believe progressive enhancement is a useful paradigm to keep in mind and will help developers across the world build accessible applications that are a joy to use.

At the end of the day, I can't change the world. I can only do what I think is right and try and spread the message as well as I can (that's the point of this post). If everyone thinks like this, then I think the world would be a better place.

Let me know what you think and thanks for reading!
