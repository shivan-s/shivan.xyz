---
author: Shivan Sivakumaran
title: Object Parameters in Javascript/Typescript Functions
date: 2024-04-11
summary: Using an object as a parameter for functions
categories: ["programming"]
tags: ["javascript", "typescript", "functions", "opinion", "code"]
draft: false
cover:
  image: params.png
  alt: Screenshot of code with a function with positional arguments vs keyword
  caption: I like passing objects through as parameters in functions
  relative: false
  hidden: false
---

{{< youtube Fx1x2gyPidE >}}

In the realm of javascript and typescript, it's my opinion that as your function takes on more parameters, consider passing an object rather than separate positional arguments. How many parameters is a matter of taste but I would like to think anything above 3.

Let's use some code as an example. Here we have a simple function.

```ts
function combineName(firstName: string, lastName: string): string {
  return `${lastName.toUpperCase()}, ${firstName}`;
}
```

It takes two inputs for a person's first and last name and provides an output form this. Let's add another parameter to this, like age:

```ts
function combineName(firstName: string, lastName: string, age: number): string {
  return `${lastName.toUpperCase()}, ${firstName} - ${age.toString()}`;
}
```

There are few problems with using a constant flurry of positional arguments, one is that the order of the parameters matters; another is that you don't get nice type hinting; and finally, it's likely you will receive these parameters as an object - you will have to spread the object.

```ts
combineName(personDetails.firstName, personDetails.lastName, personDetails.age);
// ...or
combineName(...personDetails);
```

Why not instead use an object as a parameter?

```ts
function combineName(params: {
  firstName: string;
  lastName: string;
  age: number;
}): string {
  return `${params.lastName.toUppercase()}, ${params.firstName} - ${params.age.toString()}`;
}
```

Sure, you will need to add `params.`to the start of most variables. But it's nice to ve able to have good type hinting as well as being able to use the object as an input. On top of this, order of the parameters do not matter since you provide the key.

I'd be interested in what you think about this. Do you prefer this way of writing function in typescript/javascript.
