---
author: Shivan Sivakumaran
title: Git Guide
date: 2023-07-01
summary: A simple introduction to git and Github
categories: ["programming"]
tags: ["git", "github"]
draft: false
cover:
  image: git.jpg
  alt: Man in front of logo for git and github
  caption: By example.
  relative: false
  hidden: false
---

The best way I think to getting better at programming is by sharing personal projects. GitHub is an excellent way to share source code and `git` is an excellent tool to make sharing code easier.

What is `git`?

This is a tool that allows you to track changes in your code.

What is `GitHub`?

This is a place for code to live in order to be shared and worked on collaboratively.

Remember, the key to getting better at any tools, like git, is to use it. I ope this will get you started on your journey.

{{<youtube 9raYPDvhkt0 >}}

### Requirements

- [git](https://git-scm.com/) installed on your machine.

### Initialisation of your Repository

A repository is where your code lives.

Use the command to initial a git repository.

```sh
git init
```

There will be instructions provided by `git` and on `GitHub` on how to add your code to a repository on GitHub.

**Tip:** I like to create the repository on GitHub first and then clone this. It saves having to set up and connect the repository.

You can add changes to you code like do:

```sh
git add .

git commit -m '<your message>'

git commit --amend # can be used to amend a commit message
```

Refer to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) on better commit messages.

This is probably all you will need to get started sharing your personal projects online. The next sections include some extra workflow to help you out.

### Issue -> Branch -> PR -> Merge

Assigning a issue to a particular feature or fix, and then a branch to this can help your workflow a lot.

You can create a branch for this issue (using the Github user interface) or by:

```sh
git checkout -b <name of branch>
```

This allows you to work on changes independent of other branches or the main code.

You can easily move back to the main branch, granted you have committed code for that particular branch you were working on.

```sh
git checkout main


git checkout branch1
```

Once you are done, you can push this branch to the origin repository.

You can create a pull request to merge these changes on the branch you were working on into the `main` branch for example.

### Squash changes

The habit I am getting into recently is committing any new features and refactorings. For examples, let's say I made 2 commits for single feature and a commit to refactor. I do this because if I want to revert to a previous change, I can do that since a commit acts as a milestone (e.g. my refactor is not working and I want to rollback to when the feature was working).

I can squash my commits before pushing these changes to the origin repository.

```sh
$ git log --oneline

7a5de0c (HEAD -> main) refactor
c3c85c0 feat: new feature
dn32sk2 wip: done for the day
4ff43e6 (origin/main) init
```

I can reset (softly) back to where the `origin/main` branch, and then commit the changes again.

```sh
git reset --soft 4ff43
git add .
git commit -m 'feat: new feature'
```

Don't forget to run `git status` and `git diff origin/main` to see the what you are committing and pushing as well.

### Don't forget to fetch

A common trap I fall into is not syncing with the main branch.

This means you could be working on things that already have been changed leading to some annoying merch conflicts.

Routinely, I try and fetch and merge the `origin/main` branch.

```sh
# working on a branch
git fetch
git merge origin/main
```

### `.gitignore`

This is an important file. You can add files and directories that you want to keep on your local repository but not committed to source code.

An example are files that contain sensitive information, like API keys and passwords.

### Conclusion

Thanks for reading this. I hope it helps you out. Feel free to make a pull request (now that I'm sure you know how) if you have any feedback.

### Resources

- [lazygit Tool](https://github.com/jesseduffield/lazygit)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Setting up SSH with Github](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
