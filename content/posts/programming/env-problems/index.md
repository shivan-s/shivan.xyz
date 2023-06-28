---
author: Shivan Sivakumaran
title: Environment Variables can be Tricky
date: 2023-06-28
summary: Having secure passwords is key as well as storing them in your .env file. Here is a little tricky case that we had to deal with.
categories: ["programming"]
tags: ["programming", "env", "secrets", "docker"]
draft: false
cover:
  image: env.jpg
  alt: Shivan infront of words "env" and dollar sign
  caption: Environment variables
  relative: false
  hidden: false
---

Special characters may not act in the way you intend in the context of environment variables.

Here is an example of gotcha we had to experience.

The situation involved generating random passwords with special characters like `$`. [Terraform has a service that does this](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/password).

The random passwords were stored in a `.env` file.

Here is a [video showing](https://youtu.be/ySSnZ2YCzjQ) a play around with this project.

{{<youtube ySSnZ2YCzjQ>}}

[Here is the link to the project on GitHub.](https://github.com/shivan-s/env-problems)

The remedy was to use Terraform's ability to generate override special character and to exclude the special characters that caused the problems like `$`.

I hope you found this useful. Happy for any feedback if necessary. Thanks for reading.
