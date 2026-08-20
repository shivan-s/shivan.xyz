---
title: Update/Insert From Another Table
date: 2026-05-27
summary: How to run an update from another table
draft: false
---

We might find ourselves performing multiple updates from another table where the data depends on that particular table.

## Example

Take this example, here we have our tables:

|      | planes            |     |
| ---- | ----------------- | --- |
| int  | `id`              | PK  |
| int  | `manufacturer_id` | FK  |
| text | `model_name`      |     |
| text | `company_name`    |     |

|      | manufacturers     |     |
| ---- | ----------------- | --- |
| int  | `id`              | PK  |
| text | `company_address` |     |

We notice that we want to normalise our data and move the `company_name` into the `manufacturers` table.

We know we can run multiple updates like so:

```sql
ALTER TABLE manufacturers
ADD COLUMN company_name TEXT;

UPDATE manufacturers
SET
    company_name = 'new name';
```

The reason it does not work in this situation is that we are not applying the same name to the `company_name` table. What goes here is dependent on another table. In this situation we use the `FROM` syntax.

```sql
-- We create the column like above

UPDATE manufacturers
SET
    company_name = t.company_name
FROM
    (SELECT
        p.company_name, p.manufacturer_id
    FROM planes p
    ) as t
WHERE manufacturer_id = t.manufacturer_id;

-- For good measure, let's enforce a `company_name`
-- There is good change this could fail based on how poor the data in the `planes` table is...
ALTER TABLE manufacturers
ALTER COLUMN company_name SET NOT NULL,
ADD UNIQUE(company_name);
```

### What about `INSERT`s?

In our hypothetical example, a more common scenario maybe creating another table to normalise. So, imagine the `manufacturers` table did not exist and we had to create it from the data in the `planes` table.

I'll also add a `CHECK` constraint do we don't get bad data; as well as make the `company_name` unique.

The syntax is similiar:

```sql
CREATE TABLE manufacturers  (
    id SERIAL PRIMARY KEY,
    company_name TEXT NOT NULL
                 UNIQUE
                 CHECK (LENGTH(TRIM(company_name)) > 0
                        AND
                        LENGTH(TRIM(company_name)) <= 64
                        )
    -- I'll omit `company_address` for simplicity
);

INSERT INTO manufacturers (company_name)
FROM (
    SELECT
        DISTINCT ON (p.manufacturer_id)
        p.company_name
    FROM planes p
);
```
