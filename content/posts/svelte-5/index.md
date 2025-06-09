---
author: Shivan Sivakumaran
title: Upgrading from Svelte 5 to Svelte 4
date: 2025-06-09
summary: Svelte 5 Simplified
tags: ["programming", "svelte", "upgrading"]
draft: false
cover:
  hidden: true
---

## An Ode to Upgrading

Upgrading is important, but why is it so difficult?

In the realm of business, businesses have requirements. Normally these are building new features for users or fixing existing bugs. Rarely do they directly involve refactoring nor do they involve upgrading your svelte packages.

Another requirement is stability. If your site goes down, then how can people use your product?

Upgrading can often introduce unwanted instability, where you could be taking those risks introducing new features and fixing bugs in your code instead.

Upgrading often involves change in process - new technologies involve new techniques in how they will be used. This is especially the case with svelte 4 to svelte 5.

Despite back compatibility, if you are wanting to go down the svelte 5 path, there are new things to learn like runes, snippet syntax and so on. If you have a team that usually sticks to the status quo, then you are introducing many headaches. Change can be difficult to deal with when you have important work to do.

I like to think of this as short-term stability.

If you pick the short-term stability path, then what you may notice is a slow decay of the codebase.

Strange bugs. Loss of security updates. Mismatch in online documentation. All of these lead to a poor developer experience.

Ironically, this makes it harder to develop new features. Team members can burnout and move on, taking their knowledge with them. This slows down development in the longer term.

{{<figure src="/decay.jpg" alt="Graph with 'time' as x-axis and 'Cumulative Function' as the y-axis. One line shows a hockey curve labelled 'bad design' sloping up and then flattening off sooner than another line labelled 'good design' which curves up less at the start of the previous line then goes higher a bit later on" caption="My rendition of a graph found in 'Refactoring' by Martin Fowler">}}

'Design' in this case can relate to updated packages.

Additionally, updated packages tend to perform better. For example, the bundle size of svelte 5 is smaller than 4. You are sending less data over the wire for the same functionality.

So with a little convincing and trying, I'd encourage you to convince those around you and those whom you work for that staying up-to-date is important. This is, of course, easier said than done, but keep fighting the good fight. And you work with reasonable people, then you will be successful - just don't give up hope.

## Svelte 5

[Svelte](https://svelte.dev) 5 was released back in [October 2024](https://svelte.dev/blog/svelte-5-is-alive), during a [Svelte Summit](https://www.sveltesociety.dev/events) video stream.

The initial attempts involved running the migration script as provided in the
[migration guide](https://svelte.dev/docs/svelte/v5-migration-guide).

```bash
npx sv migrate
```

However, this led to too many changes (imagine reviewing that PR!) coupled with bugs and a plethora of testing that had to be done. So these attempts were abandoned for higher priority work.

However, a longer sprint has given us breathing room to focus some time on this upgrade.

Also, we changed our approach: we kept it simple and just changed the version in our `package.json` from `^4.0.0` to `^5.0.0`, and then ran `npm i`.

From there, it's just dominos.

Some packages needed upgrading too. These were mainly our linters and formatting libraries that most would use - [eslint](https://eslint.org/), [prettier](https://prettier.io/), [svelte-check](https://svelte.dev/docs/cli/sv-check).

We also had other third party libraries that required updating too.

We also had some conventions that needed changing to be more inline with svelte 5. This included no bare `<td>`s and `<tr>`s. These had to be wrapped in `<thead>` or `<tbody>` [Here is the rationale](https://github.com/sveltejs/svelte/issues/9785#issuecomment-1901259379).

Another issue was self-closing HTML tags, which is no longer acceptable in svelte 5. [Here is a discussion on the matter](https://github.com/sveltejs/svelte/issues/11052).

A strategy we try to adopt is small pull requests (PRs) and many deploys rather than long standing feature branches ([Trunk-based Development](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development)).

So a lot of the above issues can be solved with separate full requests. For example, we were able to upgrade prettier from version 2 to version 3. This involved some formatting changes also that could go in. The same with our `<td>` and `<tr>` issue as well as the self-closing HTML tags.

By splitting our PRs, this makes reviews a lot easier and we experience less deployment pain.

The svelte team have done an amazing job making svelte 4 compatible with svelte 5. That means we don't have to swap to svelte 5 syntax straight away. We can leave most of our code as is - and keep the PR smaller too.

This allows us to migrate to svelte 5 and then in future features and refactorings; we can slowly migrate to the new svelte 5 syntax.

Additionally, the make the transition easier for our team members, we wrote a PR that shows the common svelte 4 to 5 changes. And with some of these changes, I will run through below.

**NOTE**: Be warned that this may be out of date. So always use the [svelte](https://svelte.dev) documentation as a source of truth.

## Runes

### $state()

[More information](https://svelte.dev/docs/svelte/$state).

A simple example where input will change the text on screen. In others words, changing state reactively. More complicated, the `name` becomes a state proxy.

Old:

```svelte
<script>
	let name = 'world';
</script>

<input bind:value={name} />
<p>Hello {name}!</p>
```

New:

```svelte
<script>
	let name = $state('world');
</script>

<input bind:value={name} />
<p>Hello {name}!</p>
```

### $derived()

[More information](https://svelte.dev/docs/svelte/$derived).

We have to had `$:` to declare a reactive variable, else `nameToDisplay` won't update when `name` changes.

Old:

```svelte
<script>
	let name = "world";
	$: nameToDisplay = `${name}!`
</script>

<input bind:value={name} />
<p>Hello, {nameToDisplay}</p>
```

New:

```svelte
<script>
	let name = $state('world');
	let nameToDisplay = $derived(`${name}!`)
</script>

<input bind:value={name} />
<p>Hello, {nameToDisplay}</p>
```

### $derived.by()

[More information](https://svelte.dev/docs/svelte/$derived#$derived.by).

This is similar to [`$derived()`](<#$derived()>); however, a difference is that this will take more complicated functions.

### $effect()

[More information](https://svelte.dev/docs/svelte/$effect).

The preference is to use [`$derived()`](<#$derived()>), but here is a simple example if we want to trigger a side effect (e.g. logging).

Old:

```svelte
<script>
	let name = 'world'
	$: {
		console.log("Name changed: ", name)
	}
</script>

<input bind:value={name} />
<p>Hello, {name}</p>
```

New:

```svelte
<script>
	let name = $state('world')
	$effect(()=> console.log("Name changed: ", name))
</script>

<input bind:value={name} />
<p>Hello, {name}</p>
```

### $props() and $bindable()

This is for component declaration of props as well as in `+page.svelte` files.

Old:

```svelte
<script lang="ts">
	export let name: string
	export let value: string
</script>

<p>{name}</p>
<input type="text" bind:value />
```

New:

```svelte
<script lang="ts">
	interface Props {
		name: string
		value: string
	}
	let { name, value = bindable() }: Props = $props()
</script>

<p>{name}</p>
<input type="text" bind:value />
```

### @render and children

This takes over the `<slot />`, which is used in components and layout files.

Old:

```svelte
<script>
</script>

<button>
	<slot />
</button>
```

New:

```svelte
<script>
	let { children } = $props()
</script>

<button>
	{@render children?.()}
</button>
```

## Reflections and Conclusion

What did I learn from this?

In future, instead of spending an entire week to do a years worth of updating, I will try and update packages more frequently.

I also learnt that when you do update, it makes you a better developer. I started reading documentation more about our packages as well as changelogs to see the benefits of updating packages beyond what was required.

Keeping your application up to date is important. Svelte 5 offers plenty of benefits, but the migration process does involve some work.

Going back to the start of this post, I found this talk at the recent Svelte Summit quite inspirational.

{{<youtube V-5nr6BhZPA>}}

A key takeaway from that video is that all problems usually stem from communication. It's likely everyone in the business wants the best for the product. Despite this shared goal, we all have different ideas on how to get there.

Updating may not be the first thing that comes to mind, but it's still part of the road in making your application great.

Good luck and even if you aren't migrating the svelte 5, I hope you found value in this post.
