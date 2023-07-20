---
author: Shivan Sivakumaran
title: Named Anchors
date: 2023-07-20
summary: A Javascript free way to scroll through a page.
categories: ["programming"]
tags: ["javascript", "html", "css", "scrolling"]
draft: false
cover:
  image: named-anchors.gif
  alt: Animation of the scrolling using named anchors
  caption: Named anchors in action
  relative: false
  hidden: false
---

An alternative to using Javascript's `.scrollIntoView()` is to use named anchors to enable navigation within a page.

At times, Javascript can be problematic. It is at time flaky and sometimes may not load as expected for clients.

I am a big fan on leaning onto in built browsers features over using custom Javascript.

### Just HTML

We can construct out a simple HTML file, `index.html`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Example of Named Anchors</title>
  </head>
  <body>
    <a href="#header-one">Move to header one</a>
    <a href="#header-two">Move to header two</a>

    <!--Some random stuff-->

    <h2 id="header-one">Header One</h2>

    <!--Some random stuff-->

    <h2 id="header-two">Header One</h2>
  </body>
</html>
```

Note the `#` for the `href` attributes on the anchor tags. When clicked they tell the browser to goto the next element with the `id` attribute that matches what is in the `href`.

You will also see the URL address in the browser be appended with the `#`. This link can be sent to anyone and they too would be navigated to the same location.

### Adding CSS

It might be beneficial to make the scroll not to instant. We can employ CSS to make the scroll _smooth_.

We add a `link` tag inside the `head` tag.

```html
<link rel="stylesheet" href="styles.css" />
```

We create a file in the same directory called `styles.css`.

From there, we apply the CSS logic.

```css
html {
  scroll-behavior: smooth;
}
```

When we click on the links, the movement will not be smooth.

On the other hand, if we send links with `#`, navigation is instant, so there is no scroll animation.

### Conclusion

Use browser related features when possible. It saves code and a lot of hassles. In this example we are able to leverage just HTML and CSS alone to create navigation within a page that is also smooth.

I hope this helps you! Happy coding.
