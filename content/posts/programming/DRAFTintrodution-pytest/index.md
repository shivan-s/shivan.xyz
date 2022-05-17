---
author: Shivan Sivakumaran
title: A Quick Introduction to Pytest
date: 2021-09-18
summary: Testing your code is important. Here is a quick demo.
categories: ["Programming"]
tags: ["pytest", "testing", "python"]
draft: false
cover:
    image:
    alt:
    caption:
    relative: false
    hidden: true
---

[Pytest is a python package](https://docs.pytest.org) where we write automated tests for our coded project. The reason we write tests for our code is to ensure the code runs the way we want. Writing automated tests can also make the process of testing our code easier, faster and more consistent.

We can develop tests first, in the case of test-driven development, and then build our code while using these automated tests to ensure we are heading in the correct direction.

We can also use the tests to ensure the changes we make to the code don't cause untended errors later in the pathway of our development.

Most modern packages come with automated testing code, so it is a great way to make your code look professional.

Here is a video I also made as quick demonstration:

{{ < youtube FNCVFNDVCCI >}}

[Here is a git repository with all the code](https://git.chch.tech/Shivan/learning_python/src/branch/main/intro_pytest).

## Installation

Let's create a directory and environment:

```bash
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

```bash
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

<pre title="function.py" class="wp-block-code"><code lang="python" class="language-python">class Maths:
    """
    Takes input and does maths
    """

    def __init__(self, n):
        self.n = n

    def __repr__(self):
        return f"n is {self.n}"
</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>The <code>__init__()</code> is a constructor that we can use to take input for objects created from this class. <code>__repr__()</code> is our representation of the object. Let's test the existence of our function.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">$ pipenv run python
&gt;&gt;&gt; from function import Maths
&gt;&gt;&gt; maths = Maths(12)
&gt;&gt;&gt; maths
n is 12 # output thanks to the __repr__ method
</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>We can use pytest to ensure this class works. In <code>tests/test_function.py</code>:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre title="tests/test_function.py " class="wp-block-code"><code lang="python" class="language-python">import pytest

from function import Maths

def test_exists():
    """
    Test that the Maths class works
    """
    maths = Maths(12)
    assert isinstance(maths, Maths)
</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Breaking down the function, there is an <code>assert</code> statement that verifies <code>isinstance()</code>, we can be more explicitly <code>assert isinstance(maths, Maths) == True</code>. <code>isinstance(*object*, *type*)</code> takes an <em>object</em>, which is <code>maths</code> and a type, which can be <code>int</code>, <code>str</code>, <code>bool</code> and so on, but we pass the class, <code>Maths</code> instead.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Now it's time to run a test. When we run pytest. Pytest will look for programs starting with <code>test_</code> and run these test cases. We will run <code>pytest</code> with <code>-vv</code> tags in order to provide a verbose and detailed response:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">
$ pipenv run pytest -vv

# we get output more or less simiar to this
tests/test_function.py::test_exists PASSED
</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Yay! We have run our first test and it works.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>How it works — less basic</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Now let's give our function some, well... functionality. We will use test-driven development (TDD). We will write the tests first, then the functioning code.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>We are doing to add two methods to the class. One the add numbers together and one to subtract numbers.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre title="tests/test_function.py " class="wp-block-code"><code lang="python" class="language-python">import pytest

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
</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>This will be a good time to introduce the <code>@pytest.fixtures</code> decorator. Decorators, well... decorate functions. Not related to decorators, we can see that we repeat the instantiation of the <code>maths</code> object. We can pass this fixture to our test functions. This saves us from having to set up our tests again and again.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre title="tests/test_function.py " class="wp-block-code"><code lang="python" class="language-python">import pytest

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
</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>We create a fixture <code>maths()</code>. We pass this function without calling it through our test functions. In addition to this, we can squash code down and make it look a bit neater.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Let's write our code and then test if it works.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre title="function.py" class="wp-block-code"><code lang="python" class="language-python">class Maths:
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
		def substract(self, x):
				self.n = self.n + x 
				return self.n

    def __repr__(self):
        return f"n is {self.n}"
</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>We run <code>pytest</code> in the root of our project directory again:</p>
<!-- /wp:paragraph -->

```bash
$ pipenv run pytest

tests/test_function.py::test_exists PASSED    [ 33%]
tests/test_function.py::test_add PASSED       [ 66%]
tests/test_function.py::test_subtract FAILED
```

We can see we get two out of three tests that passed.

When looking at the code from `function.py`. We see our mistake. We add instead of subtracting in the `subtract()` method. If we amend this:</p>

```python
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
    def substract(self, x):
            self.n = self.n - x
            return self.n

    def __repr__(self):
        return f"n is {self.n}"
```

Fixing our code will show all tests passing.

## Conclusion

<p>Pytest is a powerful tool to add to the tool belt in order to make your code more robust and professional.</p>

<p>A package that allows you to write automated tests, saving you time and mistakes as your proejcts grow.</p>

<p>I hope you find this useful and please send any feedback. Stay pythonic!</p>
