---
title: Bounding User Input in Python
date: 2023-08-05
summary: Here a nice trick to bound user input for numbers between 2 values.
draft: false
cover:
  image: bound.gif
  alt: Text on screen
  caption: Bounding in one line.
---

Imagine you take on user input like so:

```py
"""Bounding input."""

n = input("Please enter some number: ")

m = int(n)

print("Here is the output:", m)
```

Here we have to cast `n` into an integer because it's considered a string when using `input`.

### Problem

Let's say you have this hypothetical problem where you need to bound the user input of a number between two values, say 10 and 0.

You could use branches of `if` and `else` statements, but I want to introduce how you can do it in one line.

### Solution

Here we can use the builtin `max()` and `min()` functions to enforce the value between two bound.

```python
"""Bounding input."""

n = input("Please enter some number: ")

UPPER = 10
LOWER = 0

m = max(min(int(n), UPPER), LOWER)

print("Here is the output:", m)
```

Here, if the user enters a value above the highest bound, then the `min()` function will enforce the value provided by `UPPER` (e.g. `11` will be ignored for `10`, which is what `UPPER` is assigned too)

If the user enters a value below the lowest bound, then the `max()` function will enforce the value provided by `LOWER`.

### A Practical Application

Javascript/Typescript has an analogous syntax to this and I've used this a few times with user input. One example is a select box with numbers as inputs. A bad actor can always alter the values and send numbers above or below the bounds of what you code wants.

```html
<label>
	Is it better with 1, 2 or 3:
	<select name="num">
		<option value="1">1</option>
		<option value="2">2</option>
		<option value="3">3</option>
	</select>
</label>
```

```javascript
let num = parseInt('4'); // Bad actor!
const UPPER = 3;
const LOWER = 1;
num = Math.max(Math.min(num, UPPER), LOWER);
```

### Conclusion

A simple one-liner can be used in Python and Javascript/Typescript to bound user input for numerical values.
