---
title: Logging in SvelteKit
date: 2026-05-14
summary: An example of logging in SvelteKit as well as the wonders of AsyncLocalStorage
draft: false
cover:
  image: 'cover.gif'
  alt: Text appearing in the screen representing logs; there is a stream with a 'requestId' that is grouped together with the same request even with multiple users
  caption: Logging with context and structures is useful
---

<script>
	import YouTube from "YouTube"
	import Figure from "Figure"
	import BlockQuote from "BlockQuote"
    import Numbers from "./numbers.gif"
    import Terminal from "./cover.gif"
    import Scopes from "./scopes.png"
    import Streams from "./streams.gif"
    import Two from "./two.gif"
</script>

`console` logs and having a general intuition of what goes on in your application will only take you so far. There comes a stage where you need to have good observability of your application while in production. Logging is one of those tools that can help you along the way, especially structured logging.

## What is Structured Logging?

Contrast this with logging with interpolated strings. For example:

```ts
console.info('UserId:', userId);

// or a little bit better

console.info('User', { userId });
```

In our logs this will print out `UserId: <user>`, in the first case. This indeed gives us our `userId` value, but this would be hard to correlate with multiple logs coming in with multiple requests.

We could search by string and fancy regex. However, a better way would be through using metadata. We essentially store important values as key-value pairs like JSON. In our example here, we would want to save the `userId` as a searchable and contextual attribute. This is the crux of structured logging.

Not only this, we also want the ability to log what we need; log with a single module; place our logs where we want to depending on our environment (be it local development, staging or production).

It might also be worth talking about logging levels. Not only do we want context, we want the ability to filter based on severity. This allows us to have verbose logs without sacrificing a good signal-to-noise ratio.

| Level | Description                                                                 |
| ----- | --------------------------------------------------------------------------- |
| trace | Low importance, want to see everything                                      |
| debug | Low importance, good to debug variables etc.                                |
| info  | Useful and minimum default for production, e.g. User logged in successfully |
| warn  | Useful problems to know about, e.g. API almost reaching limit               |
| error | An error is affecting user experience, e.g. Unable to fulfill order         |
| fatal | Application is unusable e.g. DB connection lost, OOM                        |

We can tweak our log levels depending on how much visibility we want. Normally we have it set to `info`, but might drop it down to `debug` in case we need in-prod debugging.

I plan to walk through this using a neat [library called LogLayer](https://loglayer.dev/) along with [SvelteKit as my web framework](https://svelte.dev/docs/kit/introduction).

### Why `LogLayer`?

One requirement is consolidation. One module to call and ability to flush logs to a specific location. `LogLayer` provides this as well as integrations with other third party services like [Sentry](https://sentry.io).

I've also added `Simple Pretty Terminal`, which you will see shortly.

## A Walkthrough Example

[The code for this project can be found here](https://github.com/shivan-s/logging-example).

I set up SvelteKit in typical fashion, and install `LogLayer` as recommended by the documentation as well as the `Simple Pretty Terminal` add-on.

I create a simple page that returns a random number.

<Figure src={Numbers} alt="Random numbers changing below a quote of 'a'" caption="A request is fired causing numbers to change" />

Let's start with setting up our logging with [`AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage).

Quickly, what's `AsyncLocalStorage`? A problem we might encounter is "passing arguments hell" - we declare our log with context at the middleware and then pass this as arguments to subsequent functions. We want this context to pass into other logs related to the request (and **not** mix this with other user requests).

```ts
// This will get old very fast...

// ...

function someProcedure(log: Log) {
	log.info('logging...');
	// ...
}

export function load({ locals }) {
	locals.log('...');
	someProcedure(locals.log);
}
```

`AsyncLocalStorage` gives us the capability to store our logging function with context and then retrieve with any related functions within its call stack.

Here is an implementation, thanks to the documentation provided by `Loglayer`.

```ts
// async-local-storage.ts
import type { ILogLayer } from 'loglayer';
import { AsyncLocalStorage } from 'node:async_hooks';

export const asyncLocalStorage = new AsyncLocalStorage<{ logger: ILogLayer }>();
```

We declare our loggers.

```ts
// loggers.ts
import { asyncLocalStorage } from './async-local-storage';
import { getSimplePrettyTerminal, neon } from '@loglayer/transport-simple-pretty-terminal';
import { LogLayer, type ILogLayer } from 'loglayer';

export function createLogger(): LogLayer {
	return new LogLayer({
		transport: [
			getSimplePrettyTerminal({
				runtime: 'node',
				theme: neon
			})
		]
	});
}

export const defaultLogger = createLogger();

export function getLogger(): ILogLayer {
	const store = asyncLocalStorage.getStore();
	if (!store) {
		return defaultLogger;
	}
	return store.logger;
}
```

When we create our logger using `createLogger`, we can also declare other configurations. One is `transports`, which is where we want our logs to go. In development, we get nicely printed logs thanks to the `Simple Pretty Terminal` transport. We can also provide other transports like one for Sentry integration. We can even determine which transport are active (for example in `dev === true`, we can keep the terminal transport active, while turning off Sentry and vice versa in production).

<Figure src={Terminal} alt="Text appearing in the screen representing logs; there is a stream with a 'requestId' that is grouped together with the same request even with multiple users" caption="A Colourful Terminal!" />

We declare a `defaultLogger` and finally a `getLogger`. `getLogger` can be called anywhere on the server. It will look at the store of the `AsyncLocalStorage` and if the logger is present (which will contain all the context) - in the case of functions inside a request context, otherwise it will use the `defaultLogger`, which has no context.

<Figure src={Scopes} alt="Text in a terminal with different levels of severity, warn, error, fatal and info. The info has metadata while the others, warn, error, and fatal do not" caption="Notice the presence and absence of metadata" />

To make more sense of this, let's define our logging in the middleware; which is the `hooks.server.ts` in SvelteKit.

```ts
// hooks.server.ts
import { clock } from '$lib/clock';
import { asyncLocalStorage, getLogger, createLogger } from '$lib/server/logging';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const logHandle: Handle = async ({ event, resolve }) => {
	const requestId = clock.value; // Custom implementation that adds one on every value call
	const url = event.url.pathname;
	event.locals.requestId = requestId;
	const method = event.request.method;

	const log = createLogger();
	log.withContext({ requestId });
	event.locals.log = log;

	return asyncLocalStorage.run({ logger: log }, async () => {
		const response = await resolve(event);
		const status = response.status;
		log.info(`${method} ${status} ${url}`);
		return response;
	});
};

export const handle = sequence(logHandle);
```

We create a `requestId` that we can attach to the `locals`. This serves to identify all calls related to this request (we can even display this on the error page so users can provide this as a session ID to help with debugging).

We create our logger and attach context. In our example, it's just the `requestId`, but can also include other information like the user etc.

The `clock.value` is a singleton that is a custom class that increments a value every time a value is "called".

The implementation of our `asyncLocalStorage` wraps our call for the response; in effect, all functions that are called from load functions or actions will fall under this context. So, when we call `getLogger()`, it will perform a lookup for the store and will retrieve the logger instance. This means we don't have to pass out log through everywhere, which is pretty neat!

If there is no logger in the store, which would be the case if we called `getLogger()` outside the request context, we get our `defaultLogger`, which has no context set from the request in the `hooks.server.ts` file.

## The Implementation

```ts
// +page.server.ts
import { getLogger } from '$lib/server/logging';
import type { PageServerLoad } from './$types';

function generateNumber() {
	const log = getLogger();
	const number = Math.round(Math.random() * 1_000_000);
	log.withMetadata({ number }).info('Generating Number');
	return number;
}

export const load: PageServerLoad = async ({ locals, url }) => {
	const name = url.searchParams.get('name');
	const log = locals.log.withPrefix('[Load]').withContext({ name });
	log.info('Start of load');
	const number = generateNumber() ?? 0;
	log.info('End of Load');
	return { number, name };
};
```

This is the `+page.server.ts` code; this code is polled by the client. Here we have to result of the page and logging.

<Figure src={Two} alt="Two sets of numbers are constantly changing" caption="Two numbers changing" />

And here is the logging.

<Figure src={Streams} alt="Streaming logs showing the requests with random numbers and the name corresponding to a and b" caption="Logs" />

## Quick Aside

As an aside to this, some things that utilise `AsyncLocalStorage` is [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) with it's `getLocale()`, which provides the user's locale information and this can be used in any request context without passing parameters around.

Also, something cool I discovered is [SvelteKit's `getRequestEvent()`](https://svelte.dev/docs/kit/$app-server#getRequestEvent). This allows us to get the `event` from any function called within a request context. One use case is getting user information.

```ts
function getUser(): UserObj {
	const event = getRequestEvent();
	const user = event.locals.user;
	return user;
}
```

## Conclusion

Structured logging is useful for observing an application in production. It's important to have the ability to call this with one module as well as attaching context to related logs.

`AsyncLocalStorage` helps to prevent passing arguments around since we can call a store within the request context.
