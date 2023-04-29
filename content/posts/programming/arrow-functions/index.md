---
author: Shivan Sivakumaran
title: Arrow Functions and Function Definitions
date: 2023-04-29
summary: There is a difference between normally defined functions and arrow functions
categories: ["programming"]
tags: ["javascript", "typescript", "arrow functions", "functions"]
draft: false
cover:
  image:
  alt: No image
  caption: caption
  relative: false
  hidden: true
---

A function is a handy piece of code that allows practitioners to utilise in a same functionality multiple times. Hence the same.

ECMAScript 2016 or ES6 was the second major revision to Javascript. Of those revisions, one saw the introduction of arrow functions, a more consise way to write functions.

Here is an example:

```javascript
// a regular function
function func(x,y) {
  return x + y
};

// an arrow function
const func = (x,y) => x + y;
```

We see in this case, the return is implicit for the arrow function. We could write this more explicitly.

```javascript
const func = (x,y) => {
  return x + y
};
```

Where do arrow functions becomes useful? There are probably many, but one I can think about is applying arrow functions for properties that require a callback function. An example is handling `onClick` functionality for `react` components.

```jsx
<button onClick={() => console.log("Clicked!")}>Click me</button>
```

### Context

I am working with a Svelte code base where we want to maintain the original functional definitions. This begs to question, are there any differenences between arrow functions and the original function definitions because aren't they the same?

To my shock and horror, they're similar but there are some differences to note.


#### Declaration vs Expression

Arrow functions are anonymous functions that assigned to a variable by expression.

The traditional function is declared.

Here is example of a defined function compared to a function by expression.
```typescript
// function definition
function defFunc() {
  console.log("defFunc");
}

// function expression
const someFunc = function() {
  console.log("someFunc")
}

// turning someFunc into an arrow function
const someFunc = () => {
  console.log("someFunc")
}
```

Arrow functions are anonymous functions. They are expressed and assigned to a variable.

This is important for the next portion about hosting.

#### Hoisting

Defined functions can be declared and referenced anywhere, when arrow function due to being expressed cannot.

```typescript
defFunc(); // able to call function before it's definitions

// Function is defined.
function defFunc() {
  console.log("defFunc");
}

arrowFunc(); // this will not work as it is referenced before it is expressed

// Function is not declared but is expressed and assigned to the variable
const arrowFunc = (param1, param2) => {
  console.log("arrowFunc");
};

arrowFunc(); // this will work
```

#### Other points

1. Arrow functions don't have `arguments` object
2. Arrow functions don't create a `this` binding when in an object
3. Arrow functions cannot be used in constructors

#### References:

1. [W3Schools - JavascriptES6](https://www.w3schools.com/Js/js_es6.asp)
2. [Freecodecamp - Arrow Functions vs Regular Functions in JavaScript – What's the Difference?](https://www.freecodecamp.org/news/the-difference-between-arrow-functions-and-normal-functions/)
