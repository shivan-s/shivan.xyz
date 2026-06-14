---
title: The Power of Object Freeze
date: 2026-06-14
summary: Using runtime over just typescript
draft: false
---

<script>
	import YouTube from "YouTube"
	import Figure from "Figure"
	import BlockQuote from "BlockQuote"
	import Highlight from "Highlight"
</script>

In JavaScript, `const` means you cannot reassign, but that doesn't mean the *const*ant is subject to mutation. Here is a [post about this unfortunate realisation as well as how it compares to other languages](/posts/mutability-js-ts-rust).

<YouTube id="UgS_f_XpDM4" />

```ts
const obj = { a: 1 };
obj.a = 2;
```

```ts
const arr = [0];
arr[0] = 1;
```

This might be what you want, but there are ways to enforce immutability. First, we can do this through the type system by using `as const`.

```ts
const obj = { a: 1 } as const;
obj.a = 2; // ERROR
```

```ts
const arr = [0] as const;
arr[0] = 1;
```

However, if you bypass these type-level errors, you won't get any cataclysmic errors (which might be what we want, in other words, errors in runtime).

In the case of the object, we can use `Object.freeze` to ensure true immutability (unfortunatly, we are stuck on `as const` for arrays).

```ts
const obj = Object.freeze({ a: 1 });
obj.a = 2; // ERROR
```

<Highlight directive='info'>
    We don't actually get an error when the assignment is run. But the value won't change. If you use <code>'use strict'</code>, then you will get <code>TypeError</code>s at runtime.
</Highlight>

This is quite useful in defining constants in objects. The is that `Object.freeze` does not perform a deep freeze (so any nested arrays or objects are still mutable).

```ts
const obj = Object.freeze({ a: { b: 2 } });
obj.a.b = 3; // ALLOWED
obj.a = { b: 4 }; // ERROR
```

The obvious remedy here is to wrap the inner object with a `Object.freeze`.

So, they can be useful in defining constants but they are also useful in defining unions.

```ts
function someTask() {
	const fail = Math.random() > 0.5;
	if (fail) {
		return { success: false, message: 'It failed for this reason :(' };
	}
	return { success: true };
}

const result = someTask();

if (!result.success) {
	console.error(result.message); // ERROR
}
```

In this scenario, the return type of `someTask()` is:

```ts
{ success: boolean, message?: undefined } | { success: boolean, message: string }
```

Since `success` is a `boolean`, our type-guard check doesn't work like we expect, both scenarios in our union type `success` as `boolean` instead of `true` and `false` seperately. Alternatively, we could check if `message` existed `'message' in result`, but I think we can do better by wrapping the return objects in an `Object.freeze`.

```ts
function someTask() {
	const fail = Math.random() > 0.5;
	if (fail) {
		return Object.freeze({ success: false, message: 'It failed for this reason :(' });
	}
	return Object.freeze({ success: true });
}

const result = someTask();

if (!result.success) {
	console.error(result.message); // ERROR
}
```

And here is our for the return type, a beautiful discriminated union.

```ts
Readonly<{
	success: false;
	message: 'It failed for this reason :(';
}> |
	Readonly<{
		success: true;
	}>;
```

`success` can now be narrowed _successfully_, so we get `result.message`.

## Bonus

On the topic of enforcing runtime immutability, I would also like to popularise private methods and values in classes.

```ts
class C {
	private _a = 10;
	#b = 10;

	get b() {
		return this.#b;
	}

	get a() {
		return this._a;
	}
}

const c = new C();

console.log(c._a); // TS Error but valid runtime code
console.log(c.#b); // ERROR in runtime
```

The example is self explanatory, but you can see that `private` is removed by the TS compiler before running this in JavaScript, so we don't get a true runtime error unlike with using the `#` prefix.

## Conclusion

Aim for Javascript runtime errors and don't rely on Typescript only solutions.

We have learn about `Object.freeze` for objects as well as using `#` for private variables and method for classes.

## Resources

- [MDN on Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
- [MDN on Private Fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
