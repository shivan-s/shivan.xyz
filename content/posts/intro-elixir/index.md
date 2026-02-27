---
title: Intro Elixir
date: 2026-01-04
summary: summary
---

On December 2025, I embarked on _every_ programmer's annual tradition of partaking in [Advent of Code (AoC)](https://adventofcode.com/2025) after missing this for the last few years.

Since I have had a job that involves programming, I haven't had time nor energy to tackle problems after work. This was probably because I had high expectations.

This year, however, I made the goal of learning a new language with AoC. And I also made it a point just to parse the files, not get all the starts.

This year I chose [Elixir](https://elixir-lang.org) as the language to learn.

Some reasons behind it:

1. It's a functional language, so it must be different to what I use day-to-day which is TypeScript/JavaScript.
2. It appears more approachable than Haskell in the functional paradigm.

## About

Elixir was created by [@josevalim](https://github.com/josevalim) in ~2012.

It's build on top of [BEAM](<https://en.wikipedia.org/wiki/BEAM_(Erlang_virtual_machine)>) - which is the runtime for Erlang.

A key feature I wanted to look into was: immutability.

## Tooling

There is an LSP and formatter to use and install: [`elixir-ls`](https://elixir-lsp.github.io/elixir-ls/).

Here are the list of tools:

- `mix` is a build tool
- `elixir` to compile scripts (`.exs`; `.ex` compiles)
- `iex` for REPL

## Syntax

### Pipe Operator `|>`

Most operations from code involve, taking data in, process it, and send it out.

Similar to Javascript method chaining when we process data.

```ts
> const nums = [1, 2, 3, 4]
> const nums2 = nums.map((x)=> x + 1).filter((x)=> x % 2 == 0)
[2, 4]
> const nums3 = nums2.reverse() // Oops!
[4, 2]
```

```elixir
> nums = [1, 2, 3, 4]
> nums2 = list |> Enum.map(fn x -> x + 1 end) |> Enum.filter(fn x -> rem(x, 2) == 0 end)
[2, 4]
> nums3 = num2 |> Enum.reverse()
[4, 2]
```

The pipe operator is like a syntactic sugar to add to the first argument.

For example you can either do:

```elixir
> list = [1, 2, 3, 4]
> Enum.map(list, fn n -> Integer.to_string(n) end)
["1", "2", "3", "4"]
# Or
> list |> Enum.map(fn n -> n |> Integer.toString() end)
# Or even
> list |> Enum.map(&Integer.toString\\1)
```

### Function do no need `return`

Take a look at Javascript, we need to return explicitly.

```ts
function divideOrNull(num: number, dem: number): number | null {
	if (b === 0) {
		return null;
	}
	return a / b;
}
```

We can also show the documentation annotation for functions, and on top of that, we see a case for pattern matching.

```elixir
@type MaybeFloat :: Float | None
@spec divideOrNull(Integer, Integer) :: MaybeFloat
def divideOrNull(a, b) do
    case b do
        0 -> None
        _ -> a / b
    end
end
```

### Lists are Linked lists

```ts
> const l = [1, 2, 3, 4]
> const [head, ...rest] = l
> head
1
> rest
[2, 3, 4]
```

```elixir
> l = [1, 2, 3, 4]
> [head | tail] = l
[1, 2, 3, 4]
> head
1
> tail
[2, 3, 4]
```

### No `for` or `while` loops

This achieved using Enum's `map`, `reduce`.

```js
let i = 0;
let total = 0;
const nums = [1, 2, 3, 4];
while (i < nums.length) {
	total += nums[i];
	i++;
}

// or
total2 = 0;
for (j = 0; i <= nums.length; j++) {
	total2 += nums[j];
}
```

```elixir
nums = [1, 2, 3, 4]
nums |> Enum.reduce(0, fn x, acc -> acc + x end)

```

### Immutable

Variables are rebound. Think of variables being names rather than an address pointing to memory. Every time an assignment is made, a label is created for a new space in memory.

```python
x = 1
if True:
    x = 2
print(x) # 2
```

```js
let x = 1;
if (true) {
	x = 2;
}
console.log(x); // 2
```

```js
const x = 1;
if (true) {
	const x = 2;
	console.log(x); // 2
}
console.log(x); // 1
```

```elixir
x = 1

if 1 do
  x = 2
  x |> IO.inspect(label: "inner") # inner: 2
end

x |> IO.inspect(label: "outer") # outer: 1
```
