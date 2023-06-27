---
author: Shivan Sivakumaran
title: Become Confident with Database Playground
date: 2023-06-27
summary: Playing around with PostgreSQL
categories: ["programming"]
tags: ["programming", "database", "postgresql", "sql", "db"]
draft: false
cover:
  image: database.jpg
  alt: Face of Shivan in front of letters, "DB"
  caption: A playground for database migrations
  relative: false
  hidden: false
---

Recently, I was put into a situation where I had to make some changes to a shared staging database. Fortunately, this database wasn't used in production by end users, but the idea that I could make changes that could potentially block a collegue's workflow was a looming fear.

In the past, I've had the luxury of working with object relational mapper (ORMs) or SQL builders. Writing pure SQL isn't something I am confident with.

Trepidation inspired me to make this little project. A sandbox for writing pure SQL in migrations in a safe way to alter a database.

On top of this, I have this obsession about not installing too many different tools on my machine. I only deal with PostreSQL and other databases in docker container. Call me crazy, but that's just me.

So I made this project. It does involves a lot of moving parts made by others, but this project packages them up in, I would like to hope, a helpful way.

### Acknowledgements

Let's acknowledge all contributors to these projects:

- [PostgreSQL](https://www.postgresql.org/)
- [dbmate](https://github.com/amacneil/dbmate)
- [Docker](https://www.docker.com/)

These projects are used in this mini-project that I have created.

### Project

[Here is the link to the project on GitHub.](https://github.com/shivan-s/db-playground)

Here is a [video showing](https://youtu.be/J6YMA63oVFk) a play around with this project.

{{<youtube J6YMA63oVFk>}}

### Conclusion

In future, I'd like to share small things I learn to aid in other developers. I hope this is useful to you and please get in touch if you had some feedback or suggestions. Thank you in advance.
