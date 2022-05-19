---
author: Shivan Sivakumaran
title: Sorting Who Wins in Weightlifting
date: 2022-05-11
summary: In this problem, we look into sorting using multiple variables
categories: ["Programming"]
tags: ["weightlifting", "sorting", "python", "django"]
draft: true
cover:
  image:
  alt:
  caption:
  relative: true
  hidden: true
---

Weightlifting is a sport that consists of two lifts, the snatch and clean and jerk. An athlete is given three attempts at each lift. The sum of the best of each lift determines the total. The person with the greatest total wins.

## The Project

This is related to my project where I try and make Weightlifting Results in New Zealand easier to navigate on the web.

[Here is the source code](https://github.com/WeightliftingNZ/lifter-api).

[Here is the live link](https://lifter.shivan.xyz).

## Some Assumptions

Before we continue, I want to make some assumptions.

1. You like programming.
2. You are vaguely familiar with Python and Django.
3. You may not have familiarity with Weightlifting.

## The Problem

Simple, right?

But what happens if two athletes lift the same?

The old rule used to be if the athletes lifted the same weight, it would be the lightest of the two. Now, it's the person who lifted the weights first.

The older rule would have been easier to implement.

This makes an interesting sorting problem. If you have the lifts, you can actually work out who lifts the total first.

## The Approach

It can be quite overwhelming with the number of lifts and the variables to consider. Do we need to re-mock the sequences the lifts took place?

Fortunately, there are short cuts we can take.

Let's break this problem down in to a list of rules:

1. Obviously, the highest total wins.
2. If this isn't the case, we need to break this tie. For the athletes who have made the same total, the athlete with the smallest clean and jerk wins. This is because the smaller clean and jerk is attempted first, and thus makes this total first.
3. If the clean and jerks are also the same, the athlete with the lowest lottery number is the victor, since the this athlete would have lifted this weight first.

## The Implementation

If the athlete "bombed" (this is when they did not make a total e.g. did not make a single snatch attempt), their total is zero and they do not place.

We need to make a query to the database to request the right data to sort. The athlete will be compared to the lifts in the same session and weight category.

We can create a custom property for the `Lift` model.

Just to get you up to speed, a Django model is a representation of our data (e.g. `Lift` for an athlete's lift). So far there are four models to consider:

- The `Competition` model represents the competition.
- Competitions are composed of sessions, represented by the `Session` model with a foreign key relationship (one-to-many). A competition can have many sessions, but a session can only be owned by one competition.
- A session are composed of lifts, represented by the `Lift` model. This also shares a foreign key relationship (one-to-many), as only one instance of an athlete's lift is owned by a session (and in turn a competition).
- An `Athlete` model is stand alone, but this has a foreign key relationship with the `Lift` model. An athlete can have many lifts, but a lift can only have one athlete. However, an athlete can only be in a competition once. So extra validation is added to ensure an Athlete cannot have two lifts in the same competition.

Validating if the athlete is present more than once in a competition:

```python
class Lift(model.Model):
    ...
    def clean(self, *args, **kwargs):
    # need to check if athlete is newly created or an update
    # this validation does not need to run if it is an update
    # 1. check athlete not duplicated in a competition
        sessions = Session.objects.filter(competition=self.session.competition)
        for session in sessions:
            if Lift.objects.filter(
                session=session.reference_id, athlete=self.athlete
            ).exists():
                raise ValidationError(_(f"{self.athlete} already in competition."))
    ...
        super().clean(*args, **kwargs)

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
    ...
```

This is a bit of digression. We are focusing on athlete placings!

We create a property in the model:

```python
@cached_property
def placing(self) -> str:
    ...
```

The decorator `@cached_property` is provided by Django and is best used over `@property` if a query is involved. Using a property allows us to perform 'extra steps' on top of data on our model without having to create new data on top of our model.

In this case, lifts are event driven. In other words, we can determine placing from the lifts with the rules we created above. So we can use the lifts in the session to determine the placing.

An easy step is to exclude athletes who have "bombed". "Bombing" in a competition is not making a total (e.g they might have not made a single snatch attempt). Athletes who "bomb" do not receive a placing.

```python
if self.total_lifted == 0:
    return "-"
```

The return `"-"` means no placing.

After all that, we first need to query our database and access lifts in the session and are of the same weight category. At the moment, sessions can have multiple weight categories (however, another implementation would be needed if the same weight category was present in multiple sessions - this is a note to my future self!).

```python
query = Lift.object.filter(
    session=self.session, weight_category=self.weight_category
)
```

We can now extra the relevant data out of our query. And this is based on the rules we mentioned before.

```python
lifts = [
    {
        "reference_id": q.reference_id,
        "best_cnj_weight": q.best_cnj_weight,
        "total_lifted": q.total_lifted,
        "lottery_number": q.lottery_number,
    }
    for q in query
    if q.total_lifted > 0  # ensures sorted lifts have a total
]
```

`best_cnj_weight` and `total_lifted` are also specially defined properties that can be derived from the lift raw data.

We can now implement Python's `sorted()` function, which takes the parameters: `sorted(*, key=None, reverse=False)`. The first argument is a iterable, in this case, queried lifts.

The `key` argument is what we will use to incorporate our elaborate ordering using our above rules. this argument takes a callable, such as a function. Common place is to incorporate a `lambda`.

In this case, I create a function that returns an order list of the priorities to sort. Remember, it's total, then lowest clean and jerk, then who gets the lift first, and finally the lottery number. Prefixing with `-` reverses the sort (i.e descending).

```python
def sort_lift_key(lift: dict[str, str | int]) -> tuple[int, int, int, int]:
    """This gives the keys for sorting
    Args:
        lift (dict[str, str | int]): this contains the lift data
    Returns:
        tuple[int, int, int, int]: the keys to be used in the sorted parameter
    """
    keys = []
    # total
    keys.append(-lift["total_lifted"])
    # lowest cnj
    keys.append(lift["best_cnj_weight"][1])
    # least attempts
    keys.append(lift["best_cnj_weight"][0])
    # lott number
    keys.append(lift["lottery_number"])
    return tuple(keys)
```

We can sort the list. We can also extract the lift's `reference_id`. For the lift, we are concerned about we can find out the index, which is also the placing on that particular lift.

I have created a special function `ranking_suffix`, which gives the suffix (e.g. `1` turns in to `1st`, 2 is `2nd` and so on).

```python
sorted_lifts = sorted(lifts, key=sort_lift_key)
sorted_lifts_ids = [lift["reference_id"] for lift in sorted_lifts]
return ranking_suffix(sorted_lifts_ids.index(self.reference_id) + 1)
```

We can now put this together:

```python
class Lift(models.Model):
...
@cached_property
def placing(self) -> str:
"""Returns the placing of the athlete
e.g. 1st, 11th and '-' if no total (i.e. 0) is made
Returns:
str: placing (e.g. '1st', '11th' '-')
"""
if self.total_lifted == 0:
return "-"

        query = Lift.objects.filter(
            session=self.session, weight_category=self.weight_category
        )
        lifts = [
            {
                "reference_id": q.reference_id,
                "best_cnj_weight": q.best_cnj_weight,
                "total_lifted": q.total_lifted,
                "lottery_number": q.lottery_number,
            }
            for q in query
            if q.total_lifted > 0  # ensures sorted lifts have a total
        ]

        def sort_lift_key(lift: dict[str, str | int]) -> tuple[int, int, int, int]:
            """This gives the keys for sorting
            Args:
                lift (dict[str, str | int]): this contains the lift data
            Returns:
                tuple[int, int, int, int]: the keys to be used in the sorted parameter
            """
            keys = []
            # total
            keys.append(-lift["total_lifted"])
            # lowest cnj
            keys.append(lift["best_cnj_weight"][1])
            # least attempts
            keys.append(lift["best_cnj_weight"][0])
            # lott number
            keys.append(lift["lottery_number"])
            return tuple(keys)

        sorted_lifts = sorted(lifts, key=sort_lift_key)
        sorted_lifts_ids = [lift["reference_id"] for lift in sorted_lifts]
        return ranking_suffix(sorted_lifts_ids.index(self.reference_id) + 1)
```

## Testing

We can stop here. We have something that works. But it is always a good idea to test code.


```python
```
