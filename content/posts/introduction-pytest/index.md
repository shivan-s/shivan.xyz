---
title: A Quick Introduction to Pytest
date: 2021-09-18
summary: Testing your code is important. Here is a quick demo.
draft: false
---

<script>
    import YouTube from "YouTube"
</script>

[Pytest is a python package](https://docs.pytest.org) where we write automated tests for our coded project. The reason we write tests for our code is to ensure the code runs the way we want. Writing automated tests can also make the process of testing our code easier, faster and more consistent.

We can develop tests first, in the case of test-driven development, and then build our code while using these automated tests to ensure we are heading in the correct direction.

We can also use the tests to ensure the changes we make to the code don't cause untended errors later in the pathway of our development.

Most modern packages come with automated testing code, so it is a great way to make your code look professional.

[Here is a git repository with all the code](https://github.com/shivan-s/intro-pytest).

Here is a video I also made as quick demonstration:

<YouTube id="FNCVFNDVCCI" />

## Installation

Let's create a directory and environment:

```shell
# setting up directory
mkdir intro_pytesting
cd mkdir intro_pytesting

# creating a git repo
git init
git add .
git commit -m 'init'

# creating Pipfile and installing pytest as a dev package
pipenv lock
pipenv install pytest --dev

# creating out files
touch function.py
mkdir tests
touch tests/test_function.py
touch tests/__init__.py # tells python tests is a module
```

We should have something looking like this:

```shell
intro_pytesting/
  ├── function.py
  ├── Pipfile
  ├── Pipfile.lock
  └── tests
       ├── __init__.py
       └── test_function.py
```

`function.py` will contain code for our interesting application.

On the other hand, `test_function.py` will contain the code used to test the features in the `function.py` file.

## How to use - the basics

Let's construct our interesting function. This function will be a be a class that performs mathematics functions

```py
class Maths:
    """
    Takes input and does maths
    """

    def __init__(self, n):
        self.n = n

    def __repr__(self):
        return f"n is {self.n}"
```

The `__init__()` is a constructor that we can use to take input for objects created from this class. `__repr__()` is our representation of the object. Let's test the existence of our function.

```shell
$ pipenv run python
>>> from function import Maths
>>> maths = Maths(12)
>>> maths
n is 12 # output thanks to the __repr__ method
```

We can use pytest to ensure this class works. In `tests/test_function.p`:

```py
import pytest

from function import Maths

def test_exists():
    """
    Test that the Maths class works
    """
    maths = Maths(12)
    assert isinstance(maths, Maths)
```

Breaking down the function, there is an `assert` statement that verifies `isinstance()`, we can be more explicitly `assert isinstance(maths, Maths) == True`. `isinstance(object, type)` takes an **object**, which is `maths` and a type, which can be `int`, `str`, `bool` and so on, but we pass the class, `Maths` instead.

Now it's time to run a test. When we run pytest. Pytest will look for programs starting with `test_` and run these test cases. We will run `pytest` with `-vv` tags in order to provide a verbose and detailed response:

```shell
$ pipenv run pytest -vv

# we get output more or less similar to this
tests/test_function.py::test_exists PASSED
```

Yay! We have run our first test and it works.

## How it works — less basic

Now let's give our function some, well... functionality. We will use test-driven development (TDD). We will write the tests first, then the functioning code.

We are doing to add two methods to the class. One the add numbers together and one to subtract numbers.

```py
import pytest

from function import Maths

def test_exists():
    """
    Test that the Maths class works
    """
    maths = Maths(12)
    assert isinstance(maths, Maths)

def test_add():
    """
    Test the add function
    """
    maths = Math(12)
    addition = maths.add(10)
    assert addition == 22

def test_subtract():
    """
    Test subtract
    """
    maths = Math(12)
    subtraction = maths.subtract(2)
    assert subtraction == 10
```

This will be a good time to introduce the `@pytest.fixtures` decorator. Decorators, well... decorate functions. Not related to decorators, we can see that we repeat the instantiation of the `maths` object. We can pass this fixture to our test functions. This saves us from having to set up our tests again and again.

EDIT in 2023: Normally, fixtures are placed in a `conftest.py` file, but I didn't know about this at the time of this blog post.

```py
import pytest

from function import Maths

@pytest.fixture()
def maths():
    return Maths(12)

def test_exists(maths):
    """
    Test that the Maths class works
    """
    assert isinstance(maths, Maths)

def test_add(maths):
    """
    Test the add function
    """
    assert maths.add(10) == 22

def test_subtract(maths):
    """
    Test subtract
    """
    assert maths.subtract(2) == 10
```

We create a fixture `maths()`. We pass this function without calling it through our test functions. In addition to this, we can squash code down and make it look a bit neater.

Let's write our code and then test if it works.

```py
class Maths:
    """
    Takes input and does maths
    """

    def __init__(self, n):
        self.n = n

    # our new functions
    def add(self, x):
            self.n = self.n + x
            return self.n

    # 100% sure this below function is right
    def subtract(self, x):
            self.n = self.n + x
            return self.n

    def __repr__(self):
        return f"n is {self.n}"
```

We run `pytest` in the root of our project directory again:

```shell
$ pipenv run pytest

tests/test_function.py::test_exists PASSED    [ 33%]
tests/test_function.py::test_add PASSED       [ 66%]
tests/test_function.py::test_subtract FAILED
```

We can see we get two out of three tests that passed.

When looking at the code from `function.py`. We see our mistake. We add instead of subtracting in the `subtract()` method. If we amend this:

```py
class Maths:
    """
    Takes input and does maths
    """

    def __init__(self, n):
        self.n = n

    # our new functions
    def add(self, x):
            self.n = self.n + x
            return self.n

    # !!! FIXED !!!
    def subtract(self, x):
            self.n = self.n - x
            return self.n

    def __repr__(self):
        return f"n is {self.n}"
```

Fixing our code will show all tests passing.

## Conclusion

Pytest is a powerful tool to add to the tool belt in order to make your code more robust and professional.

A package that allows you to write automated tests, saving you time and mistakes as your projects grow.

I hope you find this useful and please send any feedback. Stay pythonic!
