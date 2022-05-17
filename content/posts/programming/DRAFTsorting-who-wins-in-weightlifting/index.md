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

[Here is the live link.](https://github.com/WeightliftingNZ/lifter-api)

[Here is the code (frontend).](https://lifter.shivan.xyz)

[Here is the code.](https://lifter.shivan.xyz)

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

We can create a custom property for the Lift model.

```python
query = Lift.object.filter(
    session=self.session, weight_category=self.weight_category
)
```

If the athlete "bombed", in other words they did not make a total (e.g they might have not made a single snatch attempt).

```python
if self.total_lifted == 0:
    return "-"
```

The return `"-"` means no placing.

```python
# models/lifts.py

...

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

We can use pytest to test this as well.
