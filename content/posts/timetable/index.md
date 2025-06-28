---
author: Shivan Sivakumaran
title: My Timetable Project
date: 2025-06-28
summary: A small programming project built in Svelte
tags: ["programming", "project"]
draft: false
cover:
  image: demo.gif
  alt: A demo of the application. A timetable is shown with classes between 6pm to 8pm on Monday and Tuesday. A class is being created and a various classes are being dragged and dropped. A feature being shown is how classes of the same name have the same colour
  caption: Timetable away!
  relative: false
  hidden: false
---

**What**: [App Link](https://timetable.shivan.xyz). [Code](https://github.com/shivan-s/timetable)

The [pole studio I attend](https://www.altitudepole.co.nz/) offer a variety of classes focusing on skills, to flex, to flow all organised in a timetable.

I would bet that coming up with this timetable was no easy task. You would have to align popular times with students with time availability of teachers.

It was interesting to find out that the manager and studio owner would have sticky notes all over the walls to work out an optimal timetable.

I understand timetabling is a very hard problem to solve - in the [realm of a NP-hard](https://en.wikipedia.org/wiki/NP-hardness) (or something like that?).

So this situation that the manager and studio owner were in got me thinking about an easier project to create - an interactive timetable.

It's been a while since I've created a fun project to work on. Something to satisfy that creative kick with programming. It doesn't have to make a million dollars or even be that good to others - I can make it just for the hell of it.

## Goals of this project

The main goal is just to have fun and express creativity. Like a I said before, I wanted to learn more about Svelte 5 as well as build a client-side application. Additionally, I wanted to test my raw CSS ability.

## What did I use?

Let's look at the stack. This is a [Sveltekit application](https://svelte.dev/) hosted on [Cloudflare Pages](https://pages.cloudflare.com/). At work, I really focus on [SSR](https://svelte.dev/docs/kit/page-options#ssr), for this app, I wanted to build something client-side heavy while also learning a bit of Svelte 5 too.

Another main package is [sveltednd](https://github.com/thisuxhq/sveltednd) by [thisuxhq](https://www.thisux.com/). This made the whole process of drag and drop very easy.

I also used other tools like [Storybook](https://storybook.js.org/) for the first time in a long time. Storybook aids in building UI components in isolation to a page on your application.

{{<figure src="/storybook.gif" alt="Storybook example with switching different views of a button" caption="Storybook example">}}

In addition to that, I also wanted to start [pnpm](https://pnpm.io), which is a package manager for node modules.

## How does this work?

{{<figure src="/demo.gif" alt="A demo of the application. A timetable is shown with classes between 6pm to 8pm on Monday and Tuesday. A class is being created and a various classes are being dragged and dropped. A feature being shown is how classes of the same name have the same colour" caption="Here is a quick demo">}}

The idea is that this timetable app replaces the need to have sticky notes everywhere in order to draft up a timetable.

A user can create an `Item` (a class - not in the programming sense) and drag and drop this anywhere. You can have multiple items (or classes) for a day and hour as a placeholder while you figure out other parts of the timetable.

## Features

There are some features or quirks that I have implemented just as an expression of creativity.

### Seeded colours

{{<figure src="/colour-seed-01.gif" alt="Timetable grid changing colours with a page refresh" caption="Grid of colours">}}

The colours of each day grid correspond to a seed. Every time you refresh the page, a new seed is generated and this changes the colours according to the seed.

Using [hue-saturation-luminance (`hsl()`)](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl), I am able to set the seed of the hue and then I can use the saturation and luminance to have the same 'colour' at different shades.

In addition to this, the `Item`s are coloured by generating the hue using the text that is input.

{{<figure src="/colour-seed-02.gif" alt="Two Items called 'Test' have the same colour. Two new items are created 'Test 1' and 'Test 2' with different colours" caption="Text dictates the colour">}}

### Data is stored in the URL

Every moment of an `Item`, a create and a delete results in the data being saved as a [base64 string](https://en.wikipedia.org/wiki/Base64) in the URL as a search parameter.

{{<figure src="/url.gif" alt="A new browser tab is opened and a link is pasted with the base64 string as the url parameter and prepopulated timetable appears" caption="Data stored in the url">}}

## Summary

I had fun making this project to spark some creativity. It is front-end heavy which is something I usually don't do at work.

I learned more about svelte 5 and many other tools.

Thank for reading. If you are interested, the [app is located here](https://timetable.shivan.xyz) and the [code is linked here](https://github.com/shivan-s/timetable).
