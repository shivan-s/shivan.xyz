+++
author = "Shivan Sivakumaran"
title = "Python Decorators"
date = "2022-05-12"
description = "Python Decorators are powerful in that they can modify functions without needing the edit the function being modified."
categories = ["Programming"]
tags = ["python", ""]
draft = true
showToc = true
showPowerBy = false
+++

Python decorators are a tool that can be used to modify functions without the need to change the function's code.

```python
def dec_function(func: Callable) -> Callable:
    def wrapper(self) -> None:
        """Wrapper function."""
        # FIXME: fix this function
        func(self)
        if self.instructions:

            def on_end(completed) -> None:
                """Call back function. For ending speech."""
                if completed:
                    pass

            engine.connect("finished-utterance", on_end)
            engine.say(self.instructions)
            engine.runAndWait()

    return wrapper
```
