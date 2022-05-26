---
author: Shivan Sivakumaran
title: More Python Tools
date: 2022-05-22
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

Python projects - [When I started they were a simple .py file](https://github.com/ShivanS93/LearnMultiplication). Now they have grown to a large orchestration of folders and special tools, and dot files. Here, we will simplify and see the benefits of usingthese tools as well as setting these tools up to become the most effeicent programmer we can be.

### Package management

At first, my first project didn't use any specially downloaded libraries. But as soon as you start building new projects you start to use third party libraries that do not come with the standard pythong install. These include `pandas`, `numpy` and `matplotlib` for the data progressionals and `flask` and `django` for the web developers.

First is managing our packages. When I stared I would strati install packages into my local environment. The ptoblems is taht our project may have dependancies — and these depancies aren't related to the all the packes on my local system. This is where we use a virtual environment.

You can use virtualenv.

```bash
$ python -m venv .venv
$ source .venv/bin/activate
$ (.venv)

# we install our packages
# then we can store our dependancies in requirements.txt

$ pip freeze > requirements.txt
```

BUt instead we are going ot use a new modern method of setting up pakacges using pipen

I use `pipenv` to manage my packages. This is simple installed onto my local system using

```bash
pip install pipenv
```

```bash
cd project
pipenv lock # this creates a Pipfile and Pipfile.lock

pipenv install streamlit # installs streamlit
pipenv uninstall streamlit # removes streamlit
```

And we can run inside the virtual environment without having to run the virtual environment.

`pipenv run streamlit run main.py`

Finally, we can also install dev packages like `pytest`. This is one advantage over simply having a `requirements.txt`.

```bash
pipenv install pytest --dev
```

We can also enter the virtual environment like we do with `venv` using:

```bash
pipenv shell
```

There is also a `Pipfile.lock`. Put simply, this locks dependancies as some versions of packages depends on others.

### Git

This is no brainer and source control is important to have

Important to have a .gitignore to not share any secrets.

More on git here.

### Pre-commit hooks

Install `pre-commit` onto you system using `pip`:

`pip install pre-commit`

Include the following code in the `.pre-commit-config.yaml` file, in the root directory of the project.

<!-- Also look into pyproject.toml, setup.py, and all those config files!!  -->

```yaml
# .pre-commit-config.yaml
repos:
-   repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v3.2.0
    hooks:
    -   id: trailing-whitespace
    -   id: end-of-file-fixer
    -   id: check-yaml
    -   id: check-added-large-files

-   repo: https://github.com/ambv/black
    rev: 21.7b0
    hooks:
    -   id: black
        args: [--line-length=79]
        language_version: python3.8

-   repo: https://github.com/pycqa/flake8
    rev: 3.7.9
    hooks:
    -   id: flake8

-   repo: https://github.com/pre-commit/mirrors-mypy
    rev: v0.910
    hooks:
    -   id: mypy
```

Install these to git hook.

`pre-commit install`

Everything a git commit is run these checks will run. This ensures the code is clean.

`git add .
git commit -m 'message'# Pre commit hooks will run`

These pre-commit hooks include:

- `black` - [a python code formatter](https://pypi.org/project/black/)
- `mypy` - [a static type checker](http://mypy-lang.org/)
- `flake8` - [a style guide checker](https://flake8.pycqa.org/en/latest/)
- isort

If this becomes a pain, you can always by pass the pre-commit hooks with the `-n` tag.

`git commit -n -m 'bypassing hooks lulz'`

### Using Github issues for project management

### READMEs and LICENSEs

README

LICENSES


## Resources

[https://realpython.com/pipenv-guide/](https://realpython.com/pipenv-guide/)
