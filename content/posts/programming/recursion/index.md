---
author: Shivan Sivakumaran
title: Recursion
date: 2022-06-03
summary: summary
categories: [""]
tags: [""]
draft: true
cover:
  image: image.jpg
  alt: alt text
  caption: caption
  relative: false
  hidden: false
---
Here is an intersting problems that I had. It involved recursion.

I received competition results. But they are all in Excel files both old and new. This can be quite problematic.

I have to turn Excel files both old (.xls) and (.xlsx) into csv files.

Suppose I have a directory and then directory inside those directories.

This invovlves a recursive function.

```python
def find_excel_files(directory):
    """"""
    # go thorough dir and find other dirs
    for file in directory.iterdir():
        if file.is_dir():
            find_excel_files(file)
        else:
            p = str(file)
            if p.split(".")[-1] in ["xls", "xlsx"]:
                files.append(p)
```

I get a list `files`, which is a list of all the files a a path.

If a run:

```python
len(files)
1412
```
