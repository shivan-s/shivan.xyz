---
title: Start using CSS Logical Properties
date: 2026-06-06
summary: Switching from left, right, top, bottom to inline, block, end, start
draft: false
cover:
  image: cover.gif
  alt: Quote by Iago, user changes language direction and the padding is in the wrong place; this is fixed once the user selects the correct logical property for padding
  caption: CSS Logical Properties
---

<script>
	import YouTube from "YouTube"
	import Figure from "Figure"
	import BlockQuote from "BlockQuote"
	import ExamplePadding from "./ExamplePadding.svelte"
	import ExampleOrientation from "./ExampleOrientation.svelte"
</script>

[Once again](/posts/theming), I love CSS. I'm not great at it, but it's a skill I want to improve. One aspect I want to talk about in this post in CSS logical properties.

<YouTube id="PcOqrIs8bFs" />

## Why?

Doesn't `left`, `right`, `bottom` and `top` work? It's intuitive. If I want to adding some padding to the right, I can just do `padding-right`, and it does the job.

This would work if you application is always in the same orientation. That may not be the case if your application is for example in a language that doesn't use go from left to right, like my native language, English.

<BlockQuote>
<ul>
    <li>
        English and Portuguese are written from left to right with new lines added below the previous ones.
    </li>
    <li>
        Hebrew and Arabic are right-to-left languages with new lines again being added below the previous ones.
    </li>
    <li>
        In some writing modes, the text lines are vertical, written from top to bottom. Chinese, Vietnamese, Korean, and Japanese are traditionally written vertically, from top to bottom, with each new vertical line added to the left of the previous one.
    </li>
    <li>
        Traditional Mongolian is also a top-to-bottom language, but new lines are to the right of previous ones.
    </li>
</ul>
{#snippet cite()}
    <a href=https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values target="_blank">
        MDN Guides on Logical Properties
    </a>
{/snippet}
</BlockQuote>

Even if you application is only in one orientation, I still think its a good idea to learn about CSS Logical properties as a replacement of the old way to refer to relative position. It's good to build this into habit early.

## Simple Example

Let's revisit the example we discussed with `padding`. I too would used the classical directions as I didn't know much about logical properties.

If you note the interactive example down below, you will see the padding coloured on hover.

If you adjust the [text direction, `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/dir), and [writing mode, `writing-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/writing-mode), you can hopefully see the padding is placed where we don't intend. That's if we select `padding-right`.

Now, try the exact same thing but using `padding-inline-end`.

<ExamplePadding />

The issue here is that `right` is always on the right, even though we intend to be at the `end`.

## The Definitions

In simple terms, for a left-to-right language and a horizontal writing style; `block` refers to the vertical axis, and `inline` refers to the horizontal. `start` is usually the top or left; and end is the bottom or right. So, this is what the mapping is roughly.

| Classical | Logical         |
| --------- | --------------- |
| `-left`   | `-inline-start` |
| `-right`  | `-inline-end`   |
| `-top`    | `-block-start`  |
| `-bottom` | `-block-end`    |

This applies to `padding`s, `margin`s, `border`s (like the example below) and more.

<ExampleOrientation />

If you want to target the `inline` or `block` axis, you can omit the `end`/`start` (e.g. `margin-inline: auto`).

### How about the `top`/`bottom`/`right`/`left`?

Here you go:

| Classical | Logical              |
| --------- | -------------------- |
| `left`    | `inset-inline-start` |
| `right`   | `inset-inline-end`   |
| `top`     | `inset-block-end`    |
| `bottom`  | `inset-block-end`    |

## Conclusion and Resources

Hopefully, this post justifies the use of logical properties. As always the MDN docs are a wealth of knowledge and I'd recommend checking them out.

- [MDN Guides on Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values)
