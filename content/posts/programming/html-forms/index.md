---
author: Shivan Sivakumaran
title: The Cool Thing about HTML Forms
date: 2023-05-25
summary: summary
categories: ["programming"]
tags: ["html"]
draft: true
cover:
  image: image.jpg
  alt: alt text
  caption: caption
  relative: false
  hidden: true
---

Since working with svelte, we have made the move back to using "the platform" - that means more features the browser offers rather than utilising javascript.

A realm where we see this change is with forms and inputs.

Generally, a heavy javascript option would be to bind the values of form inputs into state and then handle it with some kind of API.

```svelte
<script lang="ts">
// +page.svelte
import { someApi } from "../api/someApis";
let someVal: string;
</script>

<input type="text" bind:value={someVal} />
<button on:click={() => someApi(someVal)}>Submit</button>
```

This seems quite simple, but can get complex with multiple inputs, validation, keeping information secret and the list goes on. Here is an example of using form input.

```html
<form method="POST">
  <input type="text" name="someVal" />
  <button>Submit</button>
</form>
```

When we submit in this case, instead of the data being stored in state and we call an API, the browser will submit this data as form data via a POST request for our server to handle. Here is a way to do in svelte.

```typescript
// +page.server.ts
import { Actions } from "./$types"

const actions: Actions = {
  default: ({ request }) => {
    const formData = await request.formData()

    const someVal = formData.get("someVal")

    // perform some more logic...
  }
}
```

We can see the name attribute we provide for the input element reflects in the `formData` object.

### How Cool are HTML forms?

With introduction of HTML5, there are plenty of features of offer flexibility about HTML forms.

#### 1. The inputs can exist outside the `<form>` tags


Here we have inputs outside of the form block. We make sure to provide an `id` attribute for the form and refer to it using `form` attributes for the inputs.

```html
<form id="someForm">
  <button type="submit">Submit</button>
</form>

<input type="text" name="valOne" form="someForm" />
<input type="text" name="valTwo" form="someForm" />
```

#### 2. We can share forms with different actions

In this case, we define `formactions` to fire off different actions.
```html
<form id="someForm" method="GET">
  <input type="text" name="someVal" />
  <button type="submit" formaction="?/actionOne">Submit One</button>
  <button type="submit" formaction="?/actionTwo">Submit Two</button>
</form>
```
