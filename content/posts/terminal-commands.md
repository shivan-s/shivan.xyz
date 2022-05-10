+++
author = "Shivan Sivakumaran"
title = "Terminal Commands"
date = "2020-11-29"
description = "Good knowledge of terminal commands is a requirement for a good developer."
tags = ["Programming"]
draft = true
+++

Being able navigate around a file tree using the command line is a good skill to have. In fact, the skill is probably necessary.

Below is a quick list to get you started with the command line.

> `cd <file>` is a way of navigating through the file system.
>
> `cd` alone will get you to the home directory.
>
> `cd ..` will get you back to the previous directory.
>
> `./` is your current directory. ~/ is you home directory.

You can use the use the tab key to autocomplete the file path name or bring up extra possibilities.

> `ls -alt` will list all the files in your current directory including hidden folders. Along with file sizes and the user permissions. It will sort it by time created as well.
>
> `mkdir` makes a directory in a location. Use the `-p` tag to have multiple files.
>
> `pwd` prints the current directory.
>
> `cp <path/of/original_file> <new/location>` copies files from one location to another. Using `cp -r <directory>` copies a directory.
>
> `rm <file>` removes a file. Use `rm -r <directory>` to remove a directory. WARNING: This command removes files FOREVER!
>
> `mv <path/of/original_file> <new/location>` moves a file from one location to another.
>
> `ln -s <path/of/original_file> <linked/location>` creates a symlink.
