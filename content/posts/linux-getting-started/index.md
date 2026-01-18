---
title: How I got started using Linux (and how you can too)
date: 2020-11-29
summary: Linux changed the game for me
draft: false
cover:
  image: linux-eg.png
  alt: Screenshot of terminal
  caption: Linux is something you can use too
---

<script>
    import Figure from "Figure"
    import I3 from "./i3.png"
</script>

I've heard great things about the Linux operating system and their many distributions. Unlike MacOS or Windows, Linux is an open-source, free to use operating system or OS. As liberating as the idea of a democracy: made by the people, for the people.

When your system starts to run a bit slower, then switching to Linux can inject a little bit more speed.

Not only this, Linux comes with a plethora of passion-fueled open-source software that is free to use. The code is available for other to curate and see making it safe.

Linux is also customisable. You can change the operating system to how you like it.

I’ll share my experience with Linux, more specifically, the Ubuntu distribution.

## Update

_10 November 2021: I have moved off to MacOS. But I still strongly utilise the command line. I missed Adobe suite and MacOS - just works._

## My Set Up

I am running [Ubuntu](https://ubuntu.com/) on my Surface Book. I dual boot with Windows on the side in case I have to use any application that do not come with Linux such as the Adobe Creative Cloud applications (e.g. Lightroom, Photoshop).

I use a [tiling window manager called i3](https://i3.org/). This makes things a lot cleaner to use when I am learning, writing, or programming.

I also wanted to gain more confidence with using the terminal (similar to command prompt in Windows). Using the command line is an essential skill for programming.

Linux and the tiling window manager make this both easy and necessary to use. This will make me better at programming and more confident using other systems that are command line based.

## Why Ubuntu?

I choose Ubuntu because it is simple to set up and recommended for beginners (like myself). Ubuntu is one of the most popular distributions for Linux1. Some other distributions you can use include:

- [Linux Mint](https://linuxmint.com)
- [Manjaro](https://manjaro.org)

## Common Linux Commands

Here are list of common Linux commands to get you started:

- `cd <file>` is a way of navigating through the file system.

- `cd` alone will get you to the home directory. `cd ..` will get you back to the previous directory. `./` is your current directory. `~/` is you home directory. You can use the use the tab key to autocomplete the file path name or bring up extra possibilities.

- `ls -al` will list all the files in your current directory including hidden folders. Along with file sizes and the user permissions.

- `mkdir` makes a directory in a location.

- `pwd` prints the current directory.

- `cp <path/of/original_file> <new/location>` this copies files from one location to another.

Using `cp -r <directory>` copies a directory.

- `rm <file>` this removes a file.

Use `rm -r <directory>` to remove a directory.

- `mv <path/of/original_file> <new/location>` – this moves a file from one location to another

- `sudo apt-get update && sudo apt-get upgrade` – this is two commands given in one line, separated by &&. This looks for updates for the software and kernel on your machine and then upgrades them as well

## Getting started with i3

Imagine you have a note taking app in one window and a internet browser in the other. Then, you need to access the terminal. You also want to change the music that you are playing as well.

Here is where i3 comes in handy.

<Figure src={I3} alt="Screenshot of a deskstop showing i3" caption="Desktop for nerds!" />

i3 is a window titling manager. If you use multiple windows simultaneously, like this imagined scenario, then this can come in handy.

When you first log in, you are presented with essentially a blank screen. My first time, I thought this was frozen, so don’t be like me.

Instead, here are a few commands to get you started. The first is $mod+enter. The $mod key is usually the alt key or the windows key. You normally have a chance to set this when you first log in and set up i3.

- `$mod+enter` opens the terminal window
- `$mod+d` opens up a menu of applications that you can open like Firefox.
- `$mod+1` or mode+2 or mode+3 etc will open up a different workspace.
- `$mod+shift+q` will quit out of the selected window.
- `$mod+shift+e` will logout of your session.
- `$mod+r` will resize a selected window using the arrow keys
- `$mod+shift+r` will reload you session

These above are called keybindings. And you don’t have to be stuck with these default keybindings. By editing the config file, you can creating your own keybinding

This file is usually located `~/.config/i3/config`. There is excellent documentation on this on the [i3wm webpage](https://i3wm.org/docs/userguide.html).

## Conclusion

Daunting at first, there are many Linux distributions that you can use to make you feel like you are at home if you are regular Windows user.

Switching to Linux may be a good idea if your computer is starting to slow down or if you want to gain more confidence in command line. This can help hone your skills if you want to improve as a programmer.

Linux has a high level of customisation. The set up process does take some time but it will be worth it in the end.

We have run through some commands you can use in the Linux terminal. In addition to this, if you use i3 – an window tiling manager – we have some basic commands to get started.

I hope you found this useful. Comment on your experience with Linux and please share this anyone who you would this if would help.
