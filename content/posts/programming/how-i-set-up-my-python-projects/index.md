---
author: Shivan Sivakumaran
title: How I Set Up My Python Projects
date: 2022-05-22
summary: summary
categories: ["programming"]
tags: ["python"]
draft: true
cover:
  image: image.jpg
  alt: alt text
  caption: caption
  relative: false
  hidden: false
---

<!-- TODO:  -->
<!-- - Date -->
<!-- - summary -->
<!-- - image -->


What tools I use:
- avoid using pip
- pyenv (to deal with multiple version of python)
- brew used to install pipx
- pipx  (to install CLI tools that are python related)
  - use pipx to install pipenv, tox, mkdocs
- pipenv (to set up virtual environment for projects)

How the project is structures:

```shell
.
├── Dockerfile
├── .dockerignore
├── LICENSE
├── Makefile
├── Pipfile
├── Pipfile.lock
├── README.md
├── docker-compose.yaml
├── docs
│   ├── index.md
├── mkdocs.yml
├── pyproject.toml
├── setup.cfg
├── setup.py
├── src
│   ├── project
│   │   ├── __init__.py
│   │   ├── __main__.py
│   │   └── main.py
├── tests
│   ├── __init__.py
│   ├── conftest.py
│   └── test_main.py
└── tox.ini
```

I use tools like pipenv:
docker sometimes

Linters/Code quality:
mypy
flake8


Test runners:
tox
pytest

config files:
pyproject.toml
setup.cfg
tox.ini

Documentation - published using github pages.
using mkdocs
