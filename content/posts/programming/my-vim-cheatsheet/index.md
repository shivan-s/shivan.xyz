---
author: Shivan Sivakumaran
title: My Vim Cheatsheet
date: 2020-06-10
summary: Vim is a powerful tool to supercharge your programming. There is a slight learning curve, but once you master the key bindings, you won't regret it
categories: ["Programming"]
tags: ["vim", "developer environment", "code"]
draft: false
cover:
  image: opening-vim.png
  alt: terminal with vim
  caption: A lovely welcome message when opening vim
  relative: true
  hidden: false
---

When we think about programming efficiently, we think about how fast we can type on a keyboard.

This is true to a certain point. But it comes to a point where the faster you type doesn't improve your ability to program. What now becomes more important is your ability to reduce the number of keystrokes, navigate through your code, as well as remain in that all important flow.

That's where Vim and its keybindings can greatly improve your productivity as a programmer, and that is what I will hopefully cover in this post.

As a quick note: in the beginning, learning something takes time. There is a small cost to pay. Aren't we trying to save time? Yes, we are but you are paying a small upfront cost for what will pay you many dividends down the track later.

## Update in 2022

I have now switched to VSCode for the vast extension and support for extensions, but I will use Vim for quickly accessing and editing files. I also use Vim for writing draft posts as its distraction free. I do use Vim keybinding, which we will learn about soon in VSCode.

## What is Vim?

> Vim is a highly configurable text editor built to make creating and changing any kind of text very efficient.
>
> From the Vim webpage

Vim (or Vi IMproved) is a stable and open-source text editor that runs on the terminal. It supports many different programming languages like Python and C++.

When first opening Vim, we are met with a pleasant welcome page.

![vim welcome page](images/opening-vim.png)

A common gag for first time Vim users is how to close the application. That's the first thing we need to learn. Firstly, when we open Vim, we are in "Command Mode". That means we can write commands, and the command we use to quit Vim is `:q!`. The additional `!` means we will quit without saving.

## Navigation

Let's move onto some more practical stuff. Movement!

Imagine we have a large body of text to move around in, we move the cursor using:

> `h` left
>
> `j` down
>
> `k` up
>
> `l` right

You can put a number in front of commands and it will do that command that number of times. (e.g. `20h` will take your cursor to the left 20 times).

One of the first things to learn it how to exit Vim. This can be done:

> `:q` This is the most important being able to quit, following this with an ! such as :q! allows you to quit without saving
>
> `:w` will save your created file
>
> `:wq` will save and quit in one commands
>
> `:x` will save and quit as well

Moving to start and end:

> `G` (note that this `shift+g`) takes you to the start of the bottom line
>
> `gg` takes you to the top of the code

If we are at the top and we typing in a number then enter, this will take us to the that particular line of code (e.g. `gg42` enter will take us to the 42nd line of code)

Navigating on a line:

> `0` will take you to the start of a line; using this in combination with w (so 0w) will take you to the first word of the line.
>
> `shift+^` will move you to the start of the line as an alternative to `0`.
>
> `shift+$` will move you to the end of the line. This can be used in visual mode (press `v` in command mode and this will allow you to selected text).
>
> `b` moves you back by one word, B ignores punctuation and we know w will take you to the next word, W will ignore punctuation.

More ways of gross navigation:

> `{` and `}` navigates by blocks of code
>
> `%` will take you back and forth between parenthesis, curly braces or square brackets

Keeping the cursor in the same position, but being able to move the window is useful as well:

> `zz` will move the window to the cursor becomes the center of the screen.
>
> `ctrl+y` will move the window up by one line.
>
> `ctrl+e` will move the window down by one line.

Searching:

> `/` then what ever you want to search and enter will take you whatever you want searched. Following this, n will take you to the next match; N will take you to the previous
>
> `/s` allows replacement of searchable text (e.g. `/s/<text>/<replace with>`). This will work for one match, for all matches in a line suffix this with `/g`.
>
> `*` locates all of the similar words that the cursor is at

While in visual mode (press `v` when in command mode) you can make movements:

## Inserting

Some of the above commands will actually take you from "Command Mode" into "Insert Mode", but the way to get into "Insert Mode" is by using the `i` key.

> `I` (`shift+i`) will take you to the start of the current line and then insert mode.
>
> `A` (or `shift+a`) will take you to the end of the current line and into insert mode.

Lines:

> `o` creates a new line below and enters insert mode
>
> `O` (shift+o) creates a new line above and enters insert mode

## Editing

Before we get into editing, a useful tool is to use visual mode, which we can get into by using `V`(or `shift+v`) puts you into visual mode. This allows you to select code using your navigation keys. This comes in handy if you want to see what code you will be manipulating.

Undo and redo:

> `u` will undo (can repeat)
>
> `ctrl+r` will redo (can repeat)

Deleting, copying and pasting:

> `dd` deletes the line you are on and this also copies it to clipboard so its like using ‘cut’
>
> `D` deletes from where the cursor is to the end.
>
> `ct` and then whatever character will delete to the where you are to the the character you want to delete.
>
> `yy` copies the selected line onto the clipboard
>
> `p` will paste what is on the clipboard below

Indenting code:

> `<` and `>` can be used to indent you code. You can use this in combination with visual mode to select and indent your code. Using . will allow you to repeat this action. If you use a number in front, then it will indent the number of lines below your selection.
>
> `<<` and `>>` is useful when you are in command mode.

Here are some other useful keys and settings that can help you:

> `~` will swap the case of the character (i.e. make a lower case to upper and vice-versa).
>
> `:set number` will provide lines numbers
>
> `.` is particularly useful in redoing the previous command

Moving:

> `J` (`shift+J`) removes a line breaks.

## Creating a macro

A macro a set of commands that you can map to any key. This is extremely powerful if you need to do a set of commands multiple times. You can set this to any key you want as well.

Here is the process:

> `q` and then any key after (e.g. `qw`) is used to record the macro and set it to that particular key (e.g. `w`).
>
> We perform our commands, entering in and out of command, insert, visual mode etc.
>
> We can replay our macro using `@` and then the key we used to save the macro, which was `w`.

We can repeat the macro multiple times by adding a number before calling the macro (i.e. number then `@` then your assigned key, e.g. `42@w`).

## Conclusion

Now it’s your turn!

Get Vim on your system.

Make a simple program using Vim. Or play around with the commands with some code or text you have already. It will feel awkward at first, but it will get better as you progress.

So, I’m hoping this helps you out. How did you find it? What other keys did you discover useful that I haven’t listed here? What were useless? Please comment below and share this with others who might find this useful.

## More Resources

- [Vim webpage](https://www.vim.org/)
