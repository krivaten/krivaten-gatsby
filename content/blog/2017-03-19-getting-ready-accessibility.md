---
templateKey: blog-post
title: "Part 3: Getting Our Apps Ready for Accessibility"
date: 2017-03-19T00:00:00.000Z
description: >-
  A post about what is to follow and some helpful tools to help you on your way
  towards writing accessible code.
featuredimage: ../assets/a11y.png
tags:
  - ember
  - a11y
---

_This is part of a series on writing accessible Ember apps. Feel free to start at the [beginning](/blog/2017-03-17-what-is-accessibility/) to get caught up. Got questions? Hit me up on [Twitter](https://twitter.com/krivaten)._

For this series, I’m not going to walk you through the process of writing an entire app, because that’s not what we are doing. However, I do want to use this small post to talk about how the following posts will be structured as well as highlight some tool that will make your job easier.

## Expectations

In the following posts, I will not waste your time by incrementally building up a component, only to reveal the final code at the end (Ain’t nobody got time for that!). Rather, I will give a brief introduction explaining why I have found a component necessary and/or helpful and then show the final code.

_Note: I didn't write these components to be feature rich, but rather to show how to present their contents with accessibility in mind. So take them and feel free to reshape them to serve your needs!_

Following that, and depending on the need, I will call out things that I think are important to understand, and also show a few example uses.

Finally, all the components are available on an [Ember Twiddle](https://ember-twiddle.com/8b5dc1fc195ff15212323cc294160c85?fullScreen=true) so you can dig around and improve at your leisure.

_Be sure to check out the [GitHub Repo](https://github.com/krivaten/accessible-app) to see both of these addons in action!_

## A Few Extras

At this point, I would be remiss if I didn’t call out a couple incredibly helpful addons that will save you time and frustration as you work towards building accessible Ember apps. There are:

### [Ember A11Y](https://github.com/ember-a11y/ember-a11y)

This addon is a must if you are working on an Ember application. Because of the nature of single page applications (SPAs), when we click on a link and the content is updated, screen readers and other assistive technologies (AT) will not present that content to the user unless we tell it to.

That is where the Ember A11Y addon comes in. Once implemented, it will set the browser’s _focus_ on the correct outlet whenever it is rendered to, prompting AT to present that information to the user.

### [Ember A11Y Testing](https://github.com/ember-a11y/ember-a11y-testing)

This is an addon I have been playing with a bit lately and have found it incredibly valuable. If you write tests (Ahem… you should be), then this gem should be in your arsenal. It uses [Deque Labs’ aXe-core](https://github.com/dequelabs/axe-core) engine to provide you with improvements you could make to your code that will make it more accessible.

You could use it in acceptance, integration, and unit tests to run a check on the presented markup, and fail the test if it finds any issues. The really nice thing about the engine is that it even provides links to short articles explaining the problems it finds, educating your teams along the way.

The first time I dropped it in an app, I wondered why I hadn’t done so before.

## Ready? Go!

Alright, with all that said, I think we’re _finally_ ready to start laying down some code. It only took three posts to get this far! We’re going to start off small, by building something simple. An [icon component](/blog/2017-03-20-accessible-icon-component/).
