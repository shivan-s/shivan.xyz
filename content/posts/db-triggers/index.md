---
title: Database Triggers OLD and NEW
date: 2026-05-27
summary: Looking into Database Triggers
draft: false
# cover:
#   image:
#   alt:
#   caption:
# audio:
#   src
#   caption:
---

<script>
	import YouTube from "YouTube"
	import Figure from "Figure"
	import BlockQuote from "BlockQuote"
	import Highlight from "Highlight"
</script>

Here is some behaviour of `NEW` and `OLD` depending on if the trigger was an insert or update.

I have defined table, a trigger and a trigger function in a single migration as shown below. We use [`dbmate`](https://github.com/amacneil/dbmate) for migrations. We are also using postgres 14.23.

<Highlight directive="info">
    I have a <a href="https://github.com/shivan-s/db-playground" target="_blank">repository here to run database locally</a>.
</Highlight>

```sql
-- migrate:up
CREATE TABLE dances (
    id SERIAL PRIMARY KEY,
    dance_name TEXT NOT NULL,
    is_latin_safe BOOLEAN DEFAULT false NOT NULL,
    is_latin_unsafe BOOLEAN DEFAULT false
);

CREATE FUNCTION update_dances () RETURNS trigger AS $$
BEGIN
    IF NEW.id IS NULL THEN
        RAISE NOTICE 'NEW ID is null';
    ELSE
        RAISE NOTICE 'NEW ID is %', NEW.id;
    END IF;
    IF NEW.dance_name IS NULL THEN
        RAISE NOTICE 'NEW dance_name is null';
    ELSE
        RAISE NOTICE 'NEW dance_name is %', NEW.dance_name;
    END IF;
    IF NEW.is_latin_safe IS NULL THEN
        RAISE NOTICE 'NEW is_latin_safe is null';
    ELSE
        RAISE NOTICE 'NEW is_latin_safe is %', NEW.is_latin_safe;
    END IF;
    IF NEW.is_latin_unsafe IS NULL THEN
        RAISE NOTICE 'NEW is_latin_unsafe is null';
    ELSE
        RAISE NOTICE 'NEW is_latin_unsafe is %', NEW.is_latin_unsafe;
    END IF;
    IF OLD.id IS NULL THEN
        RAISE NOTICE 'OLD ID is null';
    ELSE
        RAISE NOTICE 'OLD ID is %', OLD.id;
    END IF;
    IF OLD.dance_name IS NULL THEN
        RAISE NOTICE 'OLD dance_name is null';
    ELSE
        RAISE NOTICE 'OLD dance_name is %', OLD.dance_name;
    END IF;
    IF OLD.is_latin_safe IS NULL THEN
        RAISE NOTICE 'OLD is_latin_safe is null';
    ELSE
        RAISE NOTICE 'OLD is_latin_safe is %', OLD.is_latin_safe;
    END IF;
    IF OLD.is_latin_unsafe IS NULL THEN
        RAISE NOTICE 'OLD is_latin_unsafe is null';
    ELSE
        RAISE NOTICE 'OLD is_latin_unsafe is %', OLD.is_latin_unsafe;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql ;

CREATE TRIGGER update_dances_trigger BEFORE INSERT OR UPDATE ON dances
FOR EACH ROW EXECUTE FUNCTION update_dances () ;

-- migrate:down

DROP TABLE dances ;
DROP FUNCTION update_dances ;
```

I run the following commands.

First, I add my favorite dance style:

```sql
INSERT INTO dances(dance_name) values('salsa');
-- NOTICE:  NEW ID is 1
-- NOTICE:  NEW dance_name is salsa
-- NOTICE:  NEW is_latin_safe is f
-- NOTICE:  NEW is_latin_unsafe is f
-- NOTICE:  OLD ID is null
-- NOTICE:  OLD dance_name is null
-- NOTICE:  OLD is_latin_safe is null
-- NOTICE:  OLD is_latin_unsafe is null
-- INSERT 0 1
```

My second favourite:

```sql
INSERT INTO dances(dance_name, is_latin_safe, is_latin_unsafe) values('bachataa', 't', 't');
-- NOTICE:  NEW ID is 2
-- NOTICE:  NEW dance_name is bachataa
-- NOTICE:  NEW is_latin_safe is t
-- NOTICE:  NEW is_latin_unsafe is t
-- NOTICE:  OLD ID is null
-- NOTICE:  OLD dance_name is null
-- NOTICE:  OLD is_latin_safe is null
-- NOTICE:  OLD is_latin_unsafe is null
-- INSERT 0 1
```

We make some updates:

```sql
UPDATE dances SET dance_name = 'bachata' WHERE dance_name = 'bachataa';
-- NOTICE:  NEW ID is 2
-- NOTICE:  NEW dance_name is bachata
-- NOTICE:  NEW is_latin_safe is t
-- NOTICE:  NEW is_latin_unsafe is t
-- NOTICE:  OLD ID is 2
-- NOTICE:  OLD dance_name is bachataa
-- NOTICE:  OLD is_latin_safe is t
-- NOTICE:  OLD is_latin_unsafe is t
-- UPDATE 1
```

And for completeness:

```sql
UPDATE dances SET is_latin_safe = 't', is_latin_unsafe = 't' WHERE dance_name = 'salsa';
-- NOTICE:  NEW ID is 1
-- NOTICE:  NEW dance_name is salsa
-- NOTICE:  NEW is_latin_safe is t
-- NOTICE:  NEW is_latin_unsafe is t
-- NOTICE:  OLD ID is 1
-- NOTICE:  OLD dance_name is salsa
-- NOTICE:  OLD is_latin_safe is f
-- NOTICE:  OLD is_latin_unsafe is f
-- UPDATE 1
```

We know that `OLD` is `null` on inserts since there is no previous record; but they are present on updates.

It seems `SERIAL` and default values when not set are populated in the trigger.

Hopefully, this demonstrates the behaviour of `OLD` and `NEW` on updates and inserts
