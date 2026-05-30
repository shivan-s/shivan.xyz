---
title: Theming and CSS Colours
date: 2026-05-30
summary: I want to introduce theming and a better way to do it with CSS
draft: false
cover:
  image: cover.png
  alt: An image of colours in circles with sliders at the top, one for colours and another for shade
  caption: Colours of oklch!
---

<script>
	import YouTube from "YouTube"
	import Figure from "Figure"
	import BlockQuote from "BlockQuote"
    import ExampleRGB from "./ExampleRGB.svelte"
    import ExampleHSL from "./ExampleHSL.svelte"
    import Example2HSL from "./Example2HSL.svelte"
    import ExampleOKLCH from "./ExampleOKLCH.svelte"
    import Example2OKLCH from "./Example2OKLCH.svelte"
    import ExampleLightDark from "./ExampleLightDark.svelte"
</script>

<YouTube id="dSOTxru1uVE" />

I'm not brilliant at it, but I love CSS. And in this specific post, I want to highlight CSS's features that make creating colours and applying themes easier.

## Quick Definitions

They are parapharsed from my lecture notes when I was in university. Credits to [Dr. Misha Vorobyev](https://profiles.auckland.ac.nz/m-vorobyev).

**Colour** - sensation or visual perception and are a combination of hue, saturation and brightness.

**Hue** - attribute of colour perception. I like to think of this as the characteristic (perhaps the frequency or wavelength of light), which is denoted by blue, red, green, yellow and so on...

**Brightness** - the visual perception which appears to emit more or less light, described by bright or dim.

**Lightness** - simliar to brightness but proportioned to a similiarly illuminated surface perceived as white.

**Saturation** - how the colour differs from achromatic (no 'colour') regardless of brightness (e.g. how red is it?).

**Chroma** - same as saturation but of the same brightness.

## Why Care?

I think the main struggle with software development is taming complexity. Complexity has many forms but one form is inconsistency.

Imagine your code base littered with different hard-coded colour declarations for grey/gray. Not only does it make your application look strange, it's a nightmare to maintain.

This also makes it difficult to apply themes like light- and dark-mode. You'll be asking, _which gray/grey do I use?_

### Why Themes?

Spice up your life a little; instead of offering one theme, why not light- and dark-mode as a minimum? I recently went to a talk where the speaker said dark-mode didn't improve symptoms of eye strain nor did it "protect" the eyes. However, the research did support that people felt more comfortable with dark-mode, and there was evidence that light-mode improved focus.

So, I think there is an argument to offer at least an option to switch between these two themes. On top of this, operating systems also offer a light/dark mode.

And the cool thing, CSS makes this easy.

## My Dark Ages

Before I jump into theming, I want to talk about how I used to declare colours in my application.

### Hexcodes and RGB

```
#xxxxxx

rgb(r g b [ / a])
```

In my youthfulness in software and web development, I would use hexcodes in place of RGB. Pure RGB didn't seem as technical as a combination of numbers and letters preceded by a hash. And my lack of experience and understanding didn't lend me to other ways of declaring colours, which I will talk about soon.

Hexcodes are RGB values (`0`-`255`) converted into base 16 numbers. We can do this simply in JavaScript, as shown:

```js
// num is between 0 and 255
num.toString(16);
```

The combination of red, green and blue (RGB) is what is used to display the variety of colours on the visible spectrum.

We can see the relationships between RGB and hexcodes interactively below.

<ExampleRGB />

Hexcode and RGB provide a simple way to alter colours. However, the next step comes in providing alternatives to our colour declarations. How about a lighter red? Easy, just bring the red slider down. What about colours that **aren't** red, blue or green? I want the same orange but a lighter version of it. Or a reduced saturated purple.

To deal with this conundrum, we have my next evolution.

### Introducing HSL

```
hsl(h s l [ / a])
```

We move out of the dark ages and into [`hsl` or hue, saturation, lightness](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/hsl).

Now we have a way to modify the lightness (not perceived lightness). and saturation of a colour independently; while hue define the characteristic of that colour (i.e. that type of orange, or purple).

<ExampleHSL />

If we expand the number of colours and different shades, we will encounter another problem.

<Example2HSL />

If you focus on the mid-tone colours (these would be the most in use), you might see the perceived brightnesses differ even though each row

This is based loosely on the [Helmholtz-Kohlraush effect](https://en.wikipedia.org/wiki/Helmholtz%E2%80%93Kohlrausch_effect) where colours of the same _lightness_ have differently perceived _brightnesses_. Also, that perception can be affected by surrounding colours, which links to [colour constancy](https://en.wikipedia.org/wiki/Color_constancy) (e.g. we perceive the bannana to have the same yellow during the day vs. at sunset).

This is also because we have 3 types of cones (a photoreceptor that is excited by light/photons) in our retina (the photosensitive layer of our eye). Each type of photoreceptor is excited by a particular wavelength of light, and the combination of these determines colour. Particular colours are more excitatory than others; hence, we are not able to linearly define colours and shade the linearly, also, since we perceive these brightnesses differently.

All of this is to say that `hsl`, `lightness` definition does not match our perceive brightness of colours differently.

And for that we move onto the next step.

### `oklch`

```
oklch(l c h [ / a])
```

[Björn Ottosson](https://bottosson.github.io/), in December 2020, took the already implemented `lab` and `lch` and our perception of brightness, and developed `oklab` and `oklch`.

`ok...` because they are okay.

We introduce `L` for perceived brightness and `C` for **chroma**, as we [defined above](#quick-definitions).

<ExampleOKLCH />

And we provide a spread of colours. We can see a more consistent perception of brightness among the swatches.

<Example2OKLCH />

## Proposition on Themes

Now, that ways we can define colour and alter them, we can start to look at theming.

### We can still use hexcodes using `from`

Another misconception I had was to ditch everything and just use `oklch`. We don't have to - we can still keep our hexcodes. Let me explain.

For my website, when I tried to convert my colours to `oklch`, this is what it looked like:

```css
:root {
	--blue: #196680; // [!code --]
	--blue: oklch(47.75% 0.0821 225.75deg); // [!code ++]
}
```

I like the hexcode defintions better. Plus, if you are working with designers or diligent product people, they might be helpful and give you hexcodes. Instead of preaching the use of `oklch`, you can use the magic of CSS to use whatever colour input and provide transformations with `oklch` - **relative colours**. We can use `from`. Here is an example:

```css
:root {
	--blue: #196680;
	--light-blue: oklch(from var(--blue) calc(l + 0.3725) c h / 100%);
}
```

Then you can apply changes in `L` consistency among different colours; but you only have to define your colour once, and generally as css variables.

Obviously, it's a good idea to define colours in a `.css` file as variables, which can then be used throughout the entire application (and to base the colours relatively as shown above).

### How about light- and dark-mode? `light-dark`

The goal of this post was the discuss theme and we finally made it.

Previously, I mentioned how the perception of colours also depends on the surrounding colours. This can be problematic with light- and dark-modes, since the backgrounds will change drastically. This means we will need to have colours for each theme (e.g. a blue for dark-mode and a blue for light-).

Here is an example implementation:

```css
// In our example, we could split up the `.css` files
// But, for simplicity, it will be one code block
:root {
	color-scheme: light dark;

	--base-blue: #196680;
	--dark-blue: oklch(from var(--base-blue) l c h / 100%);
	--light-blue: oklch(from var(--base-blue) calc(l + 0.3725) c h / 100%);
	--blue: light-dark(var(--dark-blue), var(--light-blue));
}

html {
	&[data-theme='dark'] {
		color-scheme: dark;
	}

	&[data-theme='light'] {
		color-scheme: light;
	}
}
```

Depending on the system settings, it will determine if light more or dark mode is in use. Then it will apply the colours. We can also alter the `data-theme` attribute if the user wants to use a different theme compared to their system settings.

Finally, we end with an example.

<ExampleLightDark />

## Bonus

### `contrast-color(color)`

If you go the example and you are wondering why the text changes color from black to white depending on the background color. This is thanks to [`contrast-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/contrast-color), which is baseline for all modern browsers in April 2026!

```css
* {
	color: contrast-color(var(--background-color));
}
```

A deal breaker for this is that you can only to pure white and black text - so a more elaborate system is needed for alternate colours.

## Conclusion & Resources

Theming is important and the use of CSS provides consistency. CSS is built with amazing functionality, such as using relative colours to define colours in hexcode and manipulate them using `oklch`. We can declare themes using `color-scheme: light dark` and `light-dark(...)` so we can adjust our colour scheme depending on the situation - all for a good user experience.

Finally, this post is really an assembly to the following resource, so please check them out. Thanks for reading and I hope this helps you out.

<YouTube id="nhbYveaV0pk" />

<YouTube id="zFFuV_vXNhY" />

- [OKLCH in CSS: why we moved from RGB and HSL - Evil Martians](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
- [MDN Docs on `oklch`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch)
