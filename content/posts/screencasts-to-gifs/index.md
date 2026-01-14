---
title: Turning Screencasts into Animated .gifs
date: 2022-09-06
summary: Turn your screencasts into .gif files with a simple script
draft: false
cover:
  image: example.gif
  alt: Screencast showing example of code running
  caption: Creating .gifs
---

Sometimes I want to show my screencasts, but the site I want to showcase them doesn't accept the `.mov` format that my screencast outputs. A good example is [GitHub](https://github.com).

Now, it comes in handy to be able to turn `.mov` files into animated `.gif`s

Requirements:

- `palettegen`
- `ffmpeg`

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

The crux of this is handled by `ffmpeg` which is a powerful library for dealing with movie file encodings.

A problem we face with converting the `.mov` file into a `.gif` is colours. `.gif` files only support 256 colours, while `.mov` files have a lot more colours. Fortunately, for screencasts, but all colours are used, so we can create a palette of most comment colours that are used. And we do this with `pallettegen`. This palette is fed into ffmpeg to construct our `.gif` in almost exact replication to the `.mov` file.

## Update

In the above shell script, I had to move the files into a speific folder and then run this command. It got extremely cumbersome to have move files around in order to turn them into gifs. I also wanted the option of using a command line tool to turn a selected file into a gif. For examples `makegif test.mov`.

Hence, I started [working on `makegif`](https://github.com/shivan-s/makegif). I decided to use Golang because it's easy to delivery a binary to work as a CLI (command line interface). It's essentially glues together multiple projects:

- [Cobra](https://github.com/spf13/cobra) - helps create CLIs
- [ffmpeg-go](https://github.com/u2takey/ffmpeg-go) - a wrapper for ffmpeg and palletegen

The package can be installed if the user has Golang installed.

```sh
go install github.com/shivan-s/makegif
```

Now it can be used as a normal CLI tool. The plan in future is to make this installable via `brew`.
