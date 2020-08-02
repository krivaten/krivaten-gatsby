---
templateKey: "blog-post"
title: "Ember Addons You Should Be Using"
date: 2016-05-16
description: "I've been using Ember for a few years now, and addons have become a powerful asset to the framework. Here's a list of ten awesome addons I consistently use."
tags:
  - ember
  - addons
---

When you first start a new application in Ember, it's exciting to feel like you're getting a fresh start. It's natural to want to dump all the best addons into your app the moment you run `ember new runs-with-scissors`. But of course the question arises, "What are the best addons?". I'm glad you asked, because this post contains my answer to that question.

## The Best Ember Addons

At the time of writing, I've just started a little passion project my wife and I have been talking about for awhile. Having used Ember for a few years now, I enjoy coding in it far more than any other existing framework. During my time, I've come across a pretty solid list of addons that I can't forget to install in every app.

Here's ten to get you started:

### 1. [Ember Truth Helpers](https://github.com/jmurphyau/ember-truth-helpers)

**What It Is**: A set of Ember helpers to use in your templates that reduce the need for computed properties in your `.js` files, especially if those properties are solely used to determine the results of things like _if_ or _unless_ blocks.

**Use It If**: You want to reduce the number of computed properties you write in your `.js` files that are solely used to determine the result of `if` and `unless` blocks.

### 2. [Ember Route Action Helper](https://github.com/DockYard/ember-route-action-helper)

**What It Does**: Allows you to call actions in your `route` files, instead of needing to invoke them from actions on your controller. This keeps your codebase cleaner and allows you to easily manipulate data in it's proper place, according to the new hotness that is _Data Down Actions Up_.

**Use It If**: You despise writing actions in your controller (Especially since they will be gone soon), just to pass them up to your `route` file.

### 3. [Ember Composable Helpers](https://github.com/DockYard/ember-composable-helpers)

**What It Is**: Another great set of Ember helpers that allow you to do more declarative templating, and like Truth Helpers, help you reduce the amount of Javascript you need to write to do simple tasks. You will mostly use these helpers in closure actions to do things like _toggle_, _increment_, or _decrement_ properties. But you can also use them to _chain_ actions and give you far more power in regards to how your templates iterate through arrays.

**Use It If**: You don't want to write another action that only contains `this.toggleProperty('isRedundant');`.

### 4. [Ember One Way Controls](https://github.com/DockYard/ember-one-way-controls)

**What It Is**: A library that allows you to use native form inputs instead of Ember's which are two-way bound. These allow you to be more compliant with the _Data Down Actions Up_ way of coding, but also give you some pretty cool power by allowing you to customize what happens when the input gets updated.

**Use It If**: You want to use native form fields while also increasing the amount of control you have over them.

### 5. [Ember CLI Mirage](https://github.com/samselikoff/ember-cli-mirage)

**What It Is**: A powerful library that allows you to mock out data structures for development and testing. This is great if you want to get your models just right before you build out the API or want to write Ember tests using data that actually reflects what you will see in your app.

**Use It If**: You want to mock out realistic data and test your app with realistic data.

### 6. [Ember Simple Auth](https://github.com/simplabs/ember-simple-auth)

**What It Is**: A library for managing your user sessions on the front end. Though it may take some time to get up and running the first time around, it is a powerful tool that helps keep your users logged in, even if they leave your app and come back, as well as lock down pages of your app that require an authenticated user, or vice-versa.

**Use It If**: Your app has a sign-in page.

### 7. [Ember CLI Autoprefixer](https://github.com/kimroen/ember-cli-autoprefixer)

**What It Is**: An excellent tool that does away with the need to either add all those frustrating vendor prefixes, or write mixins that do it for you. With this addon, you can tell it what browsers and versions to add prefixes for, so you can just write your styles without needing to worry about them.

**Use It If**: Your app has contains a stylesheet.

### 8. [Liquid Fire](https://github.com/ember-animation/liquid-fire)

**What It Is**: An outstanding animation library, made just for Ember, that utilizes the powerful Velocity.js. Coming packaged with a selection of default animations, it also gives you the power you to add your own and customize them to suit your needs. The addon uses a series of custom template helpers that allow you to determine when an animation should run as well as animate between pages.

**Use It If**: You want your app to feel more polished and smooth by using animation.

### 9. [Ember Moment](https://github.com/stefanpenner/ember-moment)

**What It Is**: An Ember port of the Moment.js library, which is the de facto way to work with dates and times in Javascript. It offers many methods for formatting and manipulating data so that you can accurately and consistently display it in whatever format you want.

**Use It If**: Your app plans on displaying dates.

### 10. [Ember CP Validations](https://github.com/offirgolan/ember-cp-validations)

**What It Is**: A validation library that uses beautiful computed properties instead of ugly observers to determine the validity of both Models and Objects in your app. Inspired by how Ruby on Rails handles validation, it is a very clean and customizable way of tackling a very complicated task.

**Use It If**: You want to perform front end validation in your app, without relying _solely_ on the back end to do it for you.

## Fin

In this post, we've listed out ten incredibly useful Ember addons you should strongly consider installing in to your app, especially if you are just starting one. I hope it has proven useful and that there was at least something beneficial in it for you.

Cheers!
