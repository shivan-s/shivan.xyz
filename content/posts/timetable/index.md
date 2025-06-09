---
author: Shivan Sivakumaran
title: My Timetable Project
date: 2025-06-09
summary: A small programming project built in Svelte
tags: ["programming", "project"]
draft: true
cover:
  image: image.jpg
  alt: alt text
  caption: caption
  relative: false
  hidden: false
---

The [pole studio I attend](https://www.altitudepole.co.nz/) offer a variety of classes focusing on skills, to flex, to flow all organised in a timetable.

I would bet that coming up with this timetable was no easy task. You would have to align popular times with students with time availability of teachers.

It was interesting to find out that the manager and studio owner would have sticky notes all over the walls to work out an optimal timetable.

I understand timetabling is a very hard problem to solve - in the [realm of a NP-hard](https://en.wikipedia.org/wiki/NP-hardness) (or something like that?).

So this situation that the manager and studio owner were in got me thinking about an easier project to create - an interactive timetable.

It's been a while since I've created a fun project to work on. Something to satisfy that creative kick with programming. It doesn't have to make a million dollars or even be that good to others - I can make it just for the hell of it.

## Goals of this project

The main goal is just to have fun and express creativity. Like a I said before, I wanted to learn more about Svelte 5 as well as build a client-side application. Additionally, I wanted to test my raw CSS ability.

## What did I use?

Let's look at the stack. This is a [Sveltekit application]() hosted on [Cloudflare Pages](). At work, I really focus on [SSR](), for this app, I wanted to build something client-side heavy while also learning a bit of Svelte 5 too.

Another main package is [sveltednd](https://github.com/thisuxhq/sveltednd) by [thisuxhq](https://www.thisux.com/). This made the whole process of drag and drop very easy.

I also used other tools like [Storybook](https://storybook.js.org/) for the first time in a long time. Storybook aids in building UI components in isolation to a page on your application.

## How does this work?

Here is quick demo.

The idea is that this timetable app replaces the need to have sticky notes everywhere in order to draft up a timetable.

A user can create an "Item" (a class) and drag and drop this anywhere. You can have multiple items (or classes) for a day and hour as a placeholder while you figure out other parts of the timetable.
