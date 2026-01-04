---
author: Shivan Sivakumaran
title: API Keys & Crypto
date: 2026-01-02
summary: Playing around with cryptography
category: ["Programming"]
tags: ["cryptographic", "api", "auth"]
draft: false
cover:
  image: keys.png
  alt: A flow chart going from secret to api secret route to token to api protected routes
  caption: The auth flow
  relative: false
  hidden: false
---

In my [naive days](./posts/the-future-of-the-web), I associated the word _crypto_ to mean anything cryptocurrency and/or blockchain related.

I want to assure you that I am now the wiser (and that I cringe at my former self).

A recent work project got be involved in authenticated and authorising [API endpoints](https://en.wikipedia.org/wiki/API). Thanks to this, I have become more acquainted with proper [cryptography](https://en.wikipedia.org/wiki/Cryptography), as well as sparking a bit of fascination on the topic. I also learned about the [crypto](https://nodejs.org/api/crypto.html) module, which is a built-in [NodeJS](https://nodejs.org/en)

I am excited to share with you what I have learned, which pales in comparison to what is out there...

Important Links:
- [Code](https://github.com/shivan-s/keys).

{{<youtube 2gYTxaHh2x0>}}

## The Problem Space

We know the internet is insecure by nature, yet it's the medium we communicate our most important documents and data.

Cryptography has given us the ability to send data "over-the-wire" by secure means.

When it comes to APIs, we need to ensure the consumers of these APIs are:

1. Authenticated - we can identify who the consumers are
2. Authorised - we know who they are and that they have the permissions to access a particular resource.

We are able to do this using an API key, which both identifies who the consumer is as well as determine if they have the adequate privileges to perform a set task.

Perhaps, we are better not sharing the method in which we implement this. Maybe, bad actors can figure our a flaw in our system. And that's the point.

It appears counterintuitive to display our plans, but this is in accordance with [Kerckhoff's Principle](https://en.wikipedia.org/wiki/Kerckhoffs's_principle).

> A cryptosystem should be secure even if the attacker ... knows all details about the system, with the exception of the secret key. In particular the system should be secure when the attacker knows the encryption and decryption algorithms.

The above abstract is from [_Understanding Cryptopgrahy_](https://www.cryptography-textbook.com/).

## The Plan

{{<figure src="/keys.png" alt="A flow chart going from secret to api secret route to token to api protected routes" caption="A brief look">}}

How we will construct this is we have the consumer hold a long-lived API `secret` in a secure location. The `secret` is sent via a `POST` request to a special route `/api/auth`. If the `secret` is valid and true, then we send a short-lived `token` in a form of a JWT (more on this later). This `token` is added to the header of subsequent API calls for validation. When the `token` expires, this process repeats.

Why not use the `secret`? We can, but we want to minimise it's use across the wire. We use the `token`, which is short-lived. Validating `secret`s is computationally expensive. On the other hand, the JWT / `token` is not as computationally expensive to decode. We can encode user details into the `token`. However, this only works if we believe the `token` cannot be tampered with (i.e. bad actors cannot create their own tokens nor can they change the information within).

If the `token` is leaked, the blast radius is reduced by time, as the `token` will eventually expire.

## The Implementation

### Preamble

I will be using Node `v24.x.y` and my beloved [SvelteKit](https://svelte.dev) to demonstrate this in action.

### Generating the `secret`

The most important thing with a secret is that is cannot be replicated easily. That means the generation of the key must be random - in the sense, that what ever we retrieve cannot be easily reproduced by a pattern.

NodeJS's `crypto` can help us with this.

```ts
import crypto from "node:crypto";

// We have choosen a length of 256 to ensure it's hard to generate due to chance
const LENGTH = 256;

// We use hmac, the other option is aes - hmac is more appropriate for secrets (source - trust my internet research...)
const secret = crypto
  .generateKeySync("hmac", { length: LENGTH })
  .export()
  // We encode to `'base64url'` as it's friendlier to send over the wire `'hex'` is another alternative
  .toString("base64url");

console.log(secret); // 2bdb0a7...
```

### Storing the `secret`

In order to verify the `secret`, we will need to store it. It's probably not a good idea to store this in plaintext, since anyone with the database can steal and use these `secret`s as if they were the user in question.

Instead, what we will do is store the `secret` like we do passwords.

This means the user will create a `secret`, be the only viewer of this `secret`, and can only view this `secret` once.

For simplicity, we reach for a library to perform the password derivation for our secret. We don't simply hash the secret, but we add a salt as well as adding computation to prevent brute force attacks.

We use [argon2](https://github.com/ranisalt/node-argon2) as this won a competition for [password hashing](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html). [It's also recommended to use above `scrypt` and `bcrypt`](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).

NOTE: we are using `argon2`; you can also use `scrypt` since at the time of writing, `scrypt` can be used in node with no third-party libraries needed (this might also be the case for `argon2` in the future).

```ts
// ... `secret` generation
// ... `db` code
const hash = await argon2.hash(secret);
const id = crypto.randomUUID(); // We tack on a unique UUID to allows us to link to the hash
const key = Buffer.from(`${id}.${secret}`).toString("base64url"); // We combine the secret with the id as a pair so the user only has one "secret" to deal with
db.create({ id, hash }); // We store the hash on the database

console.log(key); // MDlmMTQyOWQtOTMwNy00ZjE1LWFiMWYtODYwMDczODRhNDlkLnRVX3JjUWplcWo5al83SDMxZjZWWnRSN0pzTWR3T1F0ZlpiUndJWXMzeTA

console.log(hash); // $argon2id$v=19$m=65536,t=3,p=4$IB61PbwS707PTz8venNN5Q$LqkpF9WshMJcnDnd6M1BZI0mJ0+LFtzQQ6gQIURIdVo
```

As you can see above, the client or user will store the `key` in a secure location, while we store the hash. You can see how the hash is prepended with settings for `argon2` parameters. These parameters are the recommended settings to ensure the hashes are hard to crack, but at the same time, it won't bring down the entire server! If we were to change the parameters, existing keys can still be used without needing to be reset.

### Verifying The Secret

We have an endpoint that is used to verify the secret. We don't have the `secret` stored in plaintext so we will need to use the secret provided to determine if what the user is sending is valid.

We create an endpoint for the user to provide their `secret`.

This is how it works:

1. Validate the input to make sure we can get the `id-key` pairing
2. We search the database using the extracted `id`
3. If we find the `id`, we collect the `hash` and perform our verification
4. At any point, if there is a failure (e.g. invalid `id-key` pair, `id` does not exist, or `hash` is invalid, we need to error gracefully).

```ts
// +server.ts
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import * as argon2 from "argon2";
import * as z from "zod";
import { db } from "$lib/db";

// Create schema to validate if the user is sending the `secret` in the correct format
const Schema = z.strictObject({
  secret: z
    .base64url()
    .transform((data) => Buffer.from(data, "base64url").toString("ascii"))
    .pipe(z.string())
    .transform((data) => data.split("."))
    .pipe(z.tuple([z.uuid(), z.base64url()])),
});

export const POST: RequestHandler = async ({ request }) => {
  const fd = await request.formData();
  const result = Schema.safeParse(Object.fromEntries(fd.entries()));
  if (result.success === false) {
    console.info(result.error);
    error(401);
  }
  const [id, secret] = result.data.secret;
  const record = db.find(id);
  if (record === undefined) {
    console.info("Record not found");
    error(401);
  }
  // This is the part that verifies the secret against the hash in a "slow" way making it difficult to brute force
  if (await argon2.verify(record.hash, secret)) {
    /* !!Success!!
     * We need to send the `token` to the user
     */
  }
  console.info("Invalid Key");
  error(401);
};
```

### Generating the Token

The `secret` is long-lived and computationally expensive, so not appropriate for use on every single request. We can compromise and use a short-lived `token`

We are going to use [`JWT`s (JSON Web Tokens)](https://www.jwt.io/introduction#what-is-json-web-token) for this.

```ts
// Other imports
import * as jose from "jose";

// ... Secret has been verified successfully by `argon2`
const payload = { id: id, name: record.name };
const alg = "HS256";
const token = await new jose.SignJWT(payload)
  .setProtectedHeader({ alg })
  .setIssuedAt()
  // We could set the expire time at a shorter interval, 1 hour is quite long
  .setExpirationTime("60min")
  .sign(sign);
console.log(token); // eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImM5YjhjODcyLTY1ZWYtNDkwYS04MjkwLWJmMDUwN2QwOGZlMCIsIm5hbWUiOiJBbm5pZSBQYXJrZXIiLCJpYXQiOjE3NjcwNjgyNzgsImV4cCI6MTc2NzA3MTg3OH0.xlzNKMVUJc28S0yJO4XICDY6cZtFfBwku7T5YV2lzrA
return json({ token }, { status: 200 });
```

When we use tools like [jwt.io](https://jwt.io) and we can examine the contents:

```json
{
  "id": "c9b8c872-65ef-490a-8290-bf0507d08fe0",
  "name": "Annie Parker",
  "iat": 1767068278,
  "exp": 1767071878
}
```

Key feature of JWTs is that they are:

1. Stateless
2. Cannot be tampered with
3. Don't involve significant computation to verify (unlike creating and verifying our `secret`)

Stateless means we can store user information. In the example, we have the name `Annie Parker`, which we can derive from this JWT. We trust this because JWTs are almost impossible to tamper with - you cannot simply change the name into someone else and impersonate them. If this happens, then the JWT is no longer valid.

A downside of JWTs is that they can be a catastrophic if, by accident, they are leaked to bad actors. Due to their stateless nature, holders of the `token`s can easily impersonate users and its difficult to revoke access. We have to either wait until the `token` expires or we can add a protection via a database lookup using an `id` - checking of the `secret` is still valid.

### Verifying the Token

Here is a code snippet that we use at another server endpoint (`+server.ts` file in the case of SvelteKit) to show how a token is verified. This can be easily added to the middleware of the project.

In this example, we ask the user to send the `token` in the request header.

```ts
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import * as z from "zod";
import * as jose from "jose";
import { db } from "$lib/db";
import { sign } from "$lib/auth";

const RequestHeaderSchema = z.object({
  "x-auth": z.string(),
});

const SchemaPayload = z.object({ id: z.uuid(), name: z.string() });

export const GET: RequestHandler = async ({ request }) => {
  const result = RequestHeaderSchema.safeParse(
    Object.fromEntries(request.headers.entries()),
  );
  if (result.success === false) {
    console.info(result.error);
    error(401);
  }
  const jwt = result.data["x-auth"];
  try {
    const { payload } = await jose.jwtVerify(jwt, sign);
    const result = SchemaPayload.safeParse(payload);
    if (result.success === false) {
      console.info("Invalid payload");
      error(401);
    }
    const user = result.data;
    const record = db.find(user.id);
    if (record === undefined) {
      console.info("Record not found");
      error(401);
    }
    return json(user, { status: 200 });
  } catch (err) {
    console.info(err);
    error(401);
  }
};
```

If the token is valid, then we grant access to whatever resource or action to user is requesting. Other than that, if the token is not supplied or it's not valid, we supply a `401` error, which essentially means _I don't know who you are_. Oppose this to a `403`, which is _I know who you are, but you don't have the permissions to access this_.


### In Action

I have turned this into a web-based tool. [The code can be found here](https://github.com/shivan-s/keys).

I can use the web page to create a secret as shown below.

{{<figure src="/secret.png" alt="Screenshot of secret and hash being displayed on a webpage" caption="In the red box we have the generated `secret` for the user to save in a secure place; the green box shows the hash that will be stored as a record in the database.">}}

I use [HTTPie](https://httpie.io/cli) (as an example) to access the endpoint with my secret and in return I receive a token.

NOTE: I am using `localhost:5173` to host my server.

```fish
# I am running this on localhost:5173

> http POST localhost:5173/api/v0/auth --form secret=ZTA3N2QwNjgtOTVlZS00NjExLWI3YjQtNjJmMTRiODgwMGY0LkxJUU1DWF9Kc3JEd2Zzc2IwWHItMFdlaEhxTzlPRFprX2FiS2lCRXR5cW8 --body

{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImUwNzdkMDY4LTk1ZWUtNDYxMS1iN2I0LTYyZjE0Yjg4MDBmNCIsIm5hbWUiOiJKb3NoIEtsZWluIiwiaWF0IjoxNzY3MjQxMzk0LCJleHAiOjE3NjcyNDQ5OTR9.o-uRV070C9mg9kFNdvVuVIT76-2QRh5KZoXev4bRdnc"
}
```

I use the `token` to access other routes. This route returns the `name` and `id`:

```fish
> http GET localhost:5173/api/v0/secret -h x-auth:eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImUwNzdkMDY4LTk1ZWUtNDYxMS1iN2I0LTYyZjE0Yjg4MDBmNCIsIm5hbWUiOiJKb3NoIEtsZWluIiwiaWF0IjoxNzY3MjQxMzk0LCJleHAiOjE3NjcyNDQ5OTR9.o-uRV070C9mg9kFNdvVuVIT76-2QRh5KZoXev4bRdnc --body

{
    "id": "e077d068-95ee-4611-b7b4-62f14b8800f4",
    "name": "Josh Klein"
}
```

## Extra Resources

At the time of writing I am delving into these materials:
- [_The Code Book_](https://simonsingh.net/books/the-code-book/)
- [_Understanding Cryptopgraphy_](https://www.cryptography-textbook.com/)
