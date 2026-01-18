---
title: Animations
date: 2025-08-30
summary: Animations
draft: false
cover:
  image: demo-4.gif
  alt: Buttons are clicked resulting in instant movement of the cards
  caption: A way to provide good user experience
---

<script>
    import YouTube from "YouTube"
    import Figure from "Figure"
    import SelectGif from "./select.gif"
    import Demo1 from "./demo-1.gif"
    import Demo2 from "./demo-2.gif"
    import Demo3 from "./demo-3.gif"
    import ServerClient from "./server-client.png"
    import Demo4 from "./demo-4.gif"
    import Demo5 from "./demo-5.gif"
    import Demo6 from "./demo-6.gif"
</script>

I gave a talk including this project at a Junior Developer meetup in my local area on the 21st August 2025. Here are some useful links:

- [Link to the project](https://github.com/shivan-s/color-sort)
- [Presentation](https://shivan-s.github.io/color-sort/)

Here is a video summary.

<YouTube id="F2AvpvQjXtc" />

Since reading _[Designing Interface Animation](https://rosenfeldmedia.com/books/designing-interface-animation/)_ by [Val Head](https://valhead.com/). I've tried incorating it in my work; I've even gone as far to spread is as gospel (e.g. this post, work product demo and even a talk).

As an aside, this talk by Ken Kunz at [Svelte Summit](https://www.sveltesociety.dev/events) was how I discovered this book.

<YouTube id="3yuQQ0JeRgQ" />

Understandably, when we are bulding features as developers we want to focus on the list of priorities first:

1. Does it solve the users' problem?
1. Is it reliable?
1. Is the delivery on time?
1. ...
1. Animations

Animations may seem like the lowest priority item and least important. But just the reason people buy a car based on it's colour, animation has it's place.

In this article I'll show an example of animation, but I will also touch on two topics that are close to my heart:

- **progressive enhancement/gradual degredation**: situation where javascript is not available (e.g. slow connection), can you show at least some content?
- **optimistic updates**: providing immediate responsiveness to an action

Before, we dive deeper, I want to say that I am a mere mortal. I am still in the process of improving - I am on that journey with you. I also share a lot of opinion so I might be wrong.

## Why is Animation Important?

Contrary to popular belief, the sole purpose of animations isn't only to make things look cool. Animations serve an important purpose in your web application.

Distilling what Head said in her book, animations:

- reduces users' cognitive load with visual cues
- are oppourtunity to show case your brand
- as a developer, show you deeply care about your product

## By Example

Here is an example of a small program where we alter the order of colours (apologies for missing the 'u') on an "admin" interface and this affects what is present in the selection box as well as the order.

<Figure src={SelectGif} alt="A header of 'color' with a select box showing colours in Te Reo Māori" caption="Colo(u)rs as a select box for 'public' use" />

<Figure src={Demo1} alt="Two columns of colours; the left is inactive and the right is active colors. The 'promote' button is clicked which causes the order to change and a colour is deactivated when the 'deactivate' is clicked. The movement is instant with a page refresh" caption="Admin interface for activating/deactivating colours as well as the order" />

You can immediately see some shortfalls. Notice how there is a page refresh on every click the buttons clicks for changing activating/deactivating colours as well as promoting and demoting.

Also, it can be quite hard to tell what has changed because of this page refresh. Let's run through improvements step by step.

### Starting with Form Enhancement

We can utilise AJAX built into svelte form our form actions. Each button is encapsulated in a `<form>` tag, this allows transition of data between client and server - such as telling the system to promote a colour or turn a colour off.

In addition, we can add some loading text to indicate to the user that their click had a response and we are loading the change in state.

<Figure src={Demo2} alt="Buttons are clicked causing text with 'Loading' to appear at the top and then dissapear as soon the action has taken place" caption="We now have a loading response" />

### Adding Motion

Even with the loading state, once the data has been updated, the change is dramatic and still difficult to tell what is going on.

Let's add some motion.

<Figure src={Demo3} alt="Buttons are clicked and a loader is displayed, followed by the cards moving to a location" caption="We now have motion" />

### Optimistic Updates

It's nice to have the motion. It communicates what is happening to the user, which helps with cognitive load. A shortfall is that the user isn't _instant_. We do have a loader (with the loader text), but we can add optimistic update.

<Figure src={ServerClient} alt="'Server' in the left box with 'Client' in the right box with two arrows pointing between each other" caption="The basic relationship of the web. We aim to run code on the server as much as we can, but we get better interactivity running code on the client" />

As an aside, I lean towards server side rendering. We get progressive enhancement, which we will see later, but it means less code runs on the client. This is considerate for users who have poor connections, or weaker machines.

Despite mentioning poor connection, this can make server side rendering a challenge too. We have to wait for the server to send us updates. However, with optimistic updates we can show changes to users immediately for those who can support it - which is the benefit of running code on the client.

<Figure src={Demo4} alt="Buttons are clicked resulting in instant movement of the cards" caption="Instant movements"/>

### Animate Responsibly

Hopefully, you can see that animations are good. However, animations are not suitable for everyone. Some users may get vertigo and would prefer to have motions reduced or turned off.

In this scenario, I have enabled reduced motion.

<Figure src={Demo5} alt="Buttons are clicked the cards move without animated motion" caption="No animations"/>

### Progressive Enhancement

Like what we did for users who prefer reduced motion, we want to account for users who may not have javascript enabled. It's not possible to make the user experience the same for everone - this is the challenge of building applicaiton on the web. We can at least provide the best experience that the situation is constrained.

<Figure src={Demo6} alt="Button is clicked and initial is a normal page refresh form action; the next click contains the usual AJAX request" caption="We provide base functionality" />

## Conclusion

Animations are the extra cherry on top for an application. This on top of optimistic updates are a great way to improve the user experience as well as show that you care as a developer.

On the other hand, it's important to animate responsibly as animations aren't for everyone. And on top of this, it's important to provide at least the base functionality when there is progressive degredation - such as loss of javascript.

I hope you found this useful for your developer journey, as it's not the skill of animation that is important, but your willingness to use it in building application for people.
