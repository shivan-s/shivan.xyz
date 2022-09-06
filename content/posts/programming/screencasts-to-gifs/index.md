---
author: Shivan Sivakumaran
title: Turning Screencasts into Animated .gifs
date: 2022-09-06
summary: Turn your screencasts into .gif files with a simple script
categories: ["programming"]
tags: ["programming", "screencasts", "bash", "scripts", "gifs"]
draft: false
cover:
  image: example.gif
  alt: Screencast showing example of code running
  caption: Creating .gifs
  relative: false
  hidden: false
---

Sometimes I want to show my screencasts, but the site I want to showcase them doesn't accept the `.mov` format that my screencast outputs. A good example is [GitHub](https://github.com).

Now, it comes in handy to be able to turn `.mov` files into animated `.gif`s

Requirements:
- palettegen
- ffmpeg

The shell file `makegif.sh` or whatever you want to name it:
```sh
#!/bin/bash
cd $PWD
mkdir -p ./gifs
for file in *
  do
    if [[ $file =~ ^(.*)\.mov$ ]]; then
      newfile=${file/.mov/.gif}
      echo Transforming $file ...
      ffmpeg -i $file -vf palettegen temp_palette.png
      ffmpeg -i $file -i temp_palette.png -filter_complex "fps=10,scale=1280:-1[x];[x][1:v]paletteuse" ./gifs/$newfile
      rm -f temp_palette.png
    fi
  done
```

The above shell script needs to be in the same folder as the `.mov` files that you want to make into animated `.gif` files.

The script creates a new directory `gifs/`, which contain the newly created animated `.gif` files.

*I'll add more to this*
