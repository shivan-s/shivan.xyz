---
author: Shivan Sivakumaran
title: Mutability Js Ts Rust
date: 2023-07-15
summary: summary
categories: ["programming"]
tags: ["rust", "mutability", "javascript", "typescript"]
draft: false
cover:
  image:
  alt:
  caption:
  relative: false
  hidden: true
---

In Typescript/Javascript, the `const` keywords doesn't necessarily mean that the variable will be constant. In the case of arrays and objects, these can still be mutated.

This is opposed to Rust, where all variables declared are immutable by default and must declared so if otherwise.

Here is the video covering the topic.

{{<youtube OHAayFfXprQ>}}

### What is mutability?

Mutability in my own inexperienced words is data that can change. For example, data that is considered immutable and does not change in the real world is your name for example (yes, you can change it, but for most it's the same from birth til death). Oppose this to age, which changes every birthday.

Therefore, name is immutable and age is mutable.

For writing programs, it's important to know which data is mutable and which isn't.

And there are special data types that are mutable and that aren't.

### Arrays in Javascript and Typescript

Previously, variables used to be declared with the `var` keyword, but this has been phased our for the `const` and `let` keyword.

`const` represents a variable that cannot be reassigned (and you would think cannot change), while `let` represents variables that can be reassigned (and hence can be changed or mutated).

However, if a variable is assigned to an object type of array type, it can indeed be mutated.

Take this example in typescript:

```ts
const arr: string[] = ["Hello"];

function addArray(arr: string[]) {
  arr.push("World");
  return arr;
}

const newArr = addArray(arr);

console.log(newArr); // ["Hello", "World"]
console.log(arr); // ["Hello", "World"]
```

In this situation, we create a global `arr` variable and a function to alter any array.

What is mostly unexpected is that the function also alters the globally created `arr` despite it being passed into a function with it's own scope. Our intent might have been to copy this array create a new array with the modification, not modify in place.

The array is not copied in this example but it is referred to, which is important to understand - an alias is created.

We can utilise typescript's `readonly` on declaration.

```ts
const arr: readonly string[] = ["Hello"];
```

This way we will get errors when we try and invoke the `addArray` function.

Finally, we can copy the array instead of aliasing it in the function using:

```ts
function addArray(arr: string[]) {
  const arrNew = [...arr];
  arrNew.push("World");
  return arrNew;
}
```

### How Rust differs

By default, Rust variables are truly immutable by default. Rust has a similiar datatype called Vectors, represented as `Vec`. Rust also has arrays but this is slighly primative.

Vectors can be modified with the `.push()` method. But this can only be done if the variable is declared to be mutable.

```rust
// won't work
let arr: Vec<&str> = vec!["Hello"];
arr.push("World");

// will work
let mut arr: Vec<&str> = vec!["Hello"]
arr.push("World");

```

### Conclusion

Be wary of arrays and objects that can mutate in Javascript and Typescript, despite being declared using the keyword `const`.

`readonly` keyword can help in type declarations.
