---
author: Shivan Sivakumaran
title: My Git Cheatsheet
date: 2022-05-22
summary: Git is an awesome tool. It's better with these commands.
categories: ["Programming"]
tags: ["git", "source code"]
draft: false
cover:
  image: image.jpg
  alt:
  caption:
  relative: true
  hidden: true
---

Git is a very powerful tool in developers toolkit.

Here is a simple cheatsheet for my git workflow.

## Branches

Branches are importing to work on different features on the code. A branch per feature.

```shell
# creating a new branch called 'dev'
git branch dev

# entering the branch called 'dev'
# note any changes to code must be committed or stashed
git checkout dev

# go back to previous branch working on
git checkout -
```

Change the branch name from master to main

```python
git branch -m master main
```

## Stash

This is great way of storing changes temporarily without needing to commit any code.

```shell
# saving a stash
git stash save "message to self"

# list all stashes
git stash list

# bring changes back
git stash apply <name of stash>

# bring changes back and drops the previous stash
git stash pop

# dropping a stash
git stash drop <name of stash>

# clearing ALL stashes (WARNING)
git stash drop
```

## Adding and Committing at the same time

```shell
# add and commit
git commit -am "message"

# update the latest commit message
git commit --amend -m "ammendded message"

# updating code, with same commit message, only works if commit has not been pushed
git add .
git commit --ammend --no-edit
```

```shell
# going back to previous state
git revert

# seeing changes over time - an easy way to view all this
git log --graph --oneline --decorate

# searching through commit using binary search
git bisect start
# commit looks good
git bisect good
# commit looks bad
git bisect bad

```

## Squashing code

```shell
git rebase main --interactive
# pick to use commit, squash to combine the commit

# using fixup and squash when committing
git commit --fixup
git commit --squash
git rebase -i --autosquash
```

## Resetting things

Careful this will get rid of all changes

```shell
git fetch origin
git reset --hard origin/main

#clean up unused files
git clean -df
```

## More to checkout

Checkout [LazyGit](https://github.com/jesseduffield/lazygit). This is a terminal application for git.

## Resources

[Corey Schafer YouTube video on Git Stash command](https://www.youtube.com/watch?v=KLEDKgMmbBI)

[Fireship YouTube video on 13 Advanced Git Tricks](https://www.youtube.com/watch?v=ecK3EnyGD8o)
