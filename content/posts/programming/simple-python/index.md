---
author: Shivan Sivakumaran
title: Simple Python
date: 2023-07-04
summary: Mistakes of beginner Python developer
categories: ["programming"]
tags: ["python", "setup"]
draft: false
cover:
  image:
  alt:
  caption:
  relative: false
  hidden: true
---

Python is a fantastic programming language for any beginner. However, a small pitfall is setting up a project and it's dependencies, which will eventually happen as you improve and get better.

Remember, that a language stays the same to entice the beginners, but you as a developer will improve.

Rust, a more difficult language to get started with, is much more elegant in it's way of dealing with dependencies.

So, in this post, I want to provide a simple way of setting up Python for _expert_ development (I must disclaim that I am no expert and have plenty to learn).

Here is the [Github Project](https://github.com/shivan-s/python-setup) if you would like to have a look.

{{<youtube QEELoOVpKZY>}}

### Managing Python Version

Usually, Python minor versions are released once a year. So you could start of with one version, say Python version 3.8 on your system, but eventually you would like to update to a more recent version as you progress in your python journey, such as 3.10.

Python is normally back compatible. That means code from older version of Python 3 will run in newer versions. Obviously, features from later version won't run on older versions. For examples pattern matching from 3.10 will be foreign to 3.9.

Note that the `x` number represented in the version `3.10.x` is any hotfixes or security updates that do not add new features. `3` is a major update (normally, breaking changes), and `10` represnted minor updates (new features, but back compatiblilty remains). This is in accordance to semantic versioning.

I use a tool called `pyenv` to deal with multiple python version. I installed this with `brew` since I am a MacOS user.

Here are some common commands:

```bash
# providing a list of installed versions on your machine
pyenv versions

# providing a list of versions that can be installed filted to version 3.11
pyenv install --list | grep 3.11

# installing 3.11.3 version of python
pyenv install 3.11.3

# activate the new version of python for your system
pyenv global 3.11.3

# can switch back to previous version if needed
pyenv global 3.10.7
```

### Virual Environments

This is the biggest and most annoying problem I encoutered. In Python, you are going to use many different packages. But what you will find is that when you `pip install PACKAGE`, you start to polute your computer with different packages.

The problems comes to when you work on multiple projects. You may have packages that are different versions (2 versions of `pandas`).

This is where a vitual environment should be reserved for a single project.

We create a virtual environment:

```bash
python -m venv .venv
```

This creates a directory `.venv/` in your project directory. Remember to include the `.venv/` in your `.gitignore` because you don't need this commited to the source repository.

```bash
source ./.venv/bin/activate # for bash

source ./.venv/bin/activate.fish # if you are using fish, like me
```

This will activate the virtual environment and from there you can install packages via `pip` and them be isolated from you system and other virtual environments for different projects.

### Pip-comile

A tool I like to use to manage dependencies is `pip-compile`.

I can declare a file called, `requirements.in`. And inside that file I can add dependancies.

```txt
httpx
```

I then run `pip-compile -o requirements.txt requirements.in` and this will create a `requirements.txt` as a dependency graph.

I can install those packages using `pip install -r requirements.txt`.

I can also do this with development dependencies.

```bash
# create dev-requirements.in with a package like `pytest`

pip-compile -o dev-requirements.txt dev-requirements.in

pip install -r dev-requirements.txt
```

We want to commit the `requirements.in`, `requirements.txt` and associated files because this allows others to replicate the environment we have created.


### Other tools to note

Another great tool to install packages globally and not pin them to a particular version of python is `pipx`.

`pipx` installs the package inside it's own virtual environment. For example, this can be used for packages like `black`.

### Conclusion

Despite Python being a beginner friend langauge, it actually involves a bit of set up quite dauting for a beginner. This is the main pitfall.

Tools are available to manage different version of Python as well as vitual environments to ensure dependancies don't collide with different projects.

Good luck with you Python journey.
