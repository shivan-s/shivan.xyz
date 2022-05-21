---
author: Shivan Sivakumaran
title: Python Decorators
date: 2022-05-12
summary: Python Decorators are powerful in that they can modify functions without needing the edit the function being modified
categories: ["Programming"]
tags: ["python", "decorators"]
draft: true
---

Python decorators are a tool that can be used to modify functions without the need to change the function's code.

```python
def dec_function(func: Callable) -> Callable:
    def wrapper(self) -> None:
        """Wrapper function."""
        # FIXME: fix this function
        func(self)
        # stuff to run outside the function

    return wrapper

@dec_functions
def our_function():
    # stff
```
