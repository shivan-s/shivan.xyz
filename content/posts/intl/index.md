---
title: Displaying Numbers and Lists
date: 2026-05-16
summary: A cool module for displaying lists and numbers
draft: false
---

<script>
	import YouTube from "YouTube"
	import Figure from "Figure"
	import BlockQuote from "BlockQuote"
    import ExampleNumber from "./ExampleNumber.svelte"
    import ExampleList from "./ExampleList.svelte"
    import ExampleRange from "./ExampleRange.svelte"
</script>

<YouTube id="6mCRZHmndoo" />

I've displaying numbers like this:

```svelte
<p>{num}</p>
```

And I've been displaying my lists like this:

```svelte
<p>{list.join(',')}</p>
```

For numbers, it's fine if the number is small (under 1,000). What happens if the number is huge? What's easier to read, `1000000000` or `1,000,000,000`? The latter for most.

What about different locales? In Hindi, `1,00,00,00,000`. In Russian, `1 000 000 000`.

We could write out own code the render out numbers specific to locales. Before I discuss a better alternative.

What about out lists example. Does this look good? `apples, bannanas, cherry`. What about the `and` at the end? `applies, bannanas and cherry`. What about a situation when I don't want a `and` but an `or`? Again, what about different locales?

Should we write our own code the deal with these examples. We could. But why not explore the beter alternative I teased a sentence or two ago.

Introducing the [ECMAScript Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)!

## Numbers

Starting with displaying numbers, you could even wrap this code in a function to use throughout your application. You can even supply a locale if you are using a library for this.

```ts
// utils.ts

function displayNum(n: number): string {
	const locale = getLocale(); // Probably using `AsyncLocalStorage`
	const fmt = new Intl.NumberFormat(locale);
	return fmt.format(n);
}
```

As a bonus, what happens when you use `Infinity`?

```ts
displayNum(Infinity); // '∞';
```

How about potential `NaN`s? Some would not pass the type checker, but let's force the runtime.

```ts
displayNum(null); // '0';

displayNum(undefined); // 'NaN';

displayNum('Not a number'); // 'NaN';

displayNum(NaN); // 'NaN';
```

You have options to santise the input or throw an exception.

```ts
// utils.ts

function displayNum(n: number | string): string {
	const locale = getLocale(); // Probably using `AsyncLocalStorage`
	const fmt = new Intl.NumberFormat(locale);
	const parsedN = parseInt(n); // [!code ++]
	if (isNaN(parsedN)) throw Error('Not a Number!'); // [!code ++]
	return fmt.format(n); // [!code --]
	return fmt.format(parsedN); // [!code ++]
}
```

Forgetting about the function we creatd shall we try different locales?

```ts
new Intl.NumberFormat('ru-RU').format(1_000_000); //  '1 000 0000'

new Intl.NumberFormat('hi-IN').format(1_000_000); // '10,00,000'

new Intl.NumberFormat('es-ES').format(1_000_000); // '1.000.000'
```

Pretty cool? I do think locales are important to represent. Not only does it promote a sense of cultural competency; it's nice to cater to your users - and the internet is a global place.

<ExampleNumber />

### Currency and Units

As part of the `NumberFormat`, there is also monetary currency representation; and this also takes the locale to account.

For instance, if you are using the `en-US` locale, it will display `$` for `USD`. For another locale, with the same currency, will display the currency more explicitly.

Here are some example:

```ts
new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD' }).format(1_000_000); // '$1,000,000.00'

new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'AUD' }).format(1_000_000); // 'A$1,000,000.00'

new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'USD' }).format(1_000_000); // 'US$1,000,000.00'

new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(1_000_000); // '$1,000,000.00'
```

A continuation on this is that we can also represent units.

```ts
new Intl.NumberFormat('en-NZ', { style: 'unit', unit: 'megabyte', unitDisplay: 'long' }).format(
	100
); // '100 megabytes'

new Intl.NumberFormat('en-NZ', { style: 'unit', unit: 'megabyte', unitDisplay: 'short' }).format(
	100
); // '100 MB'
```

## Lists

Let's look at lists. You could turn this into a function but there is added complexity dealing with different options. I won't show them in this example.

Here is our list from the above example.

```ts
const list = ['apples', 'bananas', 'cherries'];
```

The syntax is very similiar to the `NumberFormat` module. You can supply a locale, in this case, I will use New Zealand English, (`en-NZ`).

In its simplest sense:

```ts
new Intl.ListFormat('en-NZ').format(list); // 'apples, bananas and cherries'
```

Here is an interactive examples with the different options provided:

<ExampleList />

## Bonus Ranges

We are not limited to numbers and lists, we can also provide ranges. Here, I show an example of ranges with dates.

```ts
// ...
new Intl.DateTimeFormat(locale, { dateStyle }).formatRange(startDate, endDate);
```

<ExampleRange />

## Conclusion & Further Reading

Here we demonstrate better ways of displaying numbers and lists. We also are able to take advantage of internationalisation to display numbers and lists for the appropriate locale.

- [MDN Documentation on `Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)!
