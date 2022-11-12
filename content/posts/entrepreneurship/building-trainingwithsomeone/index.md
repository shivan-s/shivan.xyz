---
author: Shivan Sivakumaran
title: Building Trainingwithsomeone
date: 2022-11-07
summary: summary
categories: ["programming", "entrepreneurship"]
tags: ["building in public", "solopreneur", "indie hacker", "indie development"]
draft: true
cover:
  image: image.jpg
  alt: alt text
  caption: caption
  relative: false
  hidden: false
---

**Small back story**: since this is the first post about building project with this new _intention_ I need to provide a little context.

Earlier, I had the intention of learning programming to switch careers from optometrist to software engineer.

I realised optometry wasn't for me and wanted to make the move. I liked programming and I thought getting a job would propel my skills.

But what I really loved was working on my own projects.

Then it dawned on me: why switch a job for another job?

Optometry, though wasn't my love, was something I could tolerate. Plus, it came with benefits: clear distinction between work and home, money, stable career, and the place I am working has a good team (the boss in my friend, which is bonus).

I remember a fellow optometrist, who I admired and respected, told me that optometry is a good career since you can do things outside of it. You can do things outside of it. What can I do outside of optometry? Programming for myself.

Now, I had a conversation with another friend. Not a fellow optometrist, but someone just as talented. They told me, don't waste your talents for a company or someone else. Become and "Indie Hacker".

There are many definitions of indie hacking, but my idea is where you build a marketable application all on your own.

There are caveats to this:

- building an app is hard (but challenges are fun), and
- ideas are useless (that's why you need to quickly execute, programming even as an indie developer means you can do it quickly with no gatekeeping)
- most will fail (so learn from failure quickly and work on another idea as soon as you realise it's a sinking ship)

I hope that clears most of that out of the way. And apologies, I wanted to give this small back story since this is my first foray into indie hacking.

**The real introduction**: the idea for this application was birthed from weightlifting. I have a remote coach and he sends me a programme via Google Sheets. It works. But can we do better?

<have screen shot here>

Things I didn't like about using Google Sheets:

- It's small on your phone
- You have scroll down to get to your programme (this will get worse the more and more gets added onto the programme).

I even pitched the idea to my Coach and he liked it (luckly, my coach is very receptive to new ideas):

What my coach wanted:

- notification
- a centralised way to communicate with th athlete (not using multiple different messaging app)
- A way to share video (looking at technique)

I understand what my coach wants is quite hard to achieve.

## Inception

Wanting to improve upon how I received my weekly traning regiment. I was inspired by a podcast between an American, a Brit, and an Aussie (trust me, this isn't a joke), where Andy Ide build a vanilla django application.

I love python and knew django, so why I don't give it a go with my idea, which seemed simple at the time.

Also no complex orchestration (espicially, when no one is going to use it in the beginning anyway).

Deployment is made easier.

Also another learnign lesson is that not everything we do is a waste of time. Let's say this project does no where. That is okay, since I am learning along the way.

And I can use those learning lessons for future projects (e.g. learning about authentication in django will apply to future projects).

## Deployment first

Django has a interesting method of deploytment. It's hard (I think). It's hard because there are lots of ways to do this.

So I "deployed first, build later".

I wanted to keep things cheap.

I already have a domain, shivan.xyz and I just created a subdomain to keep costs down. training.shivan.xyz

And this is hosted on a single remote server that I think costs $6 per month and it hosts other projects as well. Remember we will likely get 2 users in the bgeinning (including myself) so no need to worry baout compute and complex orchestration (I mean these are good problems to have).

On top of this I use NGINX as a reverse proxy to enable multiple projects on one server.

I use docker to containerize the database as well as the actual application.

And finally a ansible script to load the server, perform a git pull, and start the application.

## Django Authentication

The first thing to build is tha authentication for the user.

For this I used django allauth. The reason is that there are number of prebuild pages and it has social login (so people can log in with google etc).

## Styling

The idea is simplicity and also the look Bulma CSS for simple styling as well it looking good.

Remember, the idea is minimal viable product or conception.
