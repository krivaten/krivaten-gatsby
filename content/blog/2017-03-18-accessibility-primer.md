---
templateKey: blog-post
title: "Part 2: A Primer on Accessibility"
date: 2017-03-18T00:00:00.000Z
description: >-
  Hopefully you now understand how important writing accessible code can be for
  some people. So here is a basic introduction in how to do that HTML.
featuredimage: ../assets/a11y.png
tags:
  - ember
  - a11y
---

_This is part of a series on writing accessible Ember apps. Feel free to start at the [beginning](/blog/2017-03-17-what-is-accessibility/) to get caught up. Got questions? Hit me up on [Twitter](https://twitter.com/krivaten)._

In the first post of this series, I did my best to convince readers that producing accessible markup is something that we should consider when building our applications. If you’re on this page, I hope it is because I made a decent case.

But before we dive in to some code, I would like to provide a bit of a _primer_ on the technology built in to modern web browsers and HTML that allow impaired users to explore the internet, as well as provide some basic markup examples of this technology.

## Tools for the Modern Web

In HTML, we use any assortment of tags to render things like paragraphs, lists, headers, and so on. We then add attributes to these tags that can change the way the element looks or acts. When we decide to enter the world of accessibility, we will need to reach for another tool belt in HTML called ARIA attributes.

ARIA (Accessible Rich Internet Applications) defines and offers an assortment of different HTML standards and attributes that make web content more accessible to people using Assistive Technology (AT).

These attributes can be used for such things as:

- Telling a screen reader to ignore content that may not be relevant to a visually impaired user.
- Providing a user with a more thorough description of an element’s content, that may not need to be presented to someone without disabilities.
- Notifying a user when a menu is expanded or not.
- Alerting a user to content that has changed or been added to the page.
- And much more!

All this can be done while keeping the look and feel of the page the same. But under the hood, it is providing an abundance of benefits to people who may have difficulty using a computer. While implementing such usability will require a little more work your part, it will hopefully force you to plan ahead in how you will write more semantic HTML, which is a benefit to everyone.

## ARIA Attributes

There are around [thirty-five different ARIA attributes](https://www.w3.org/TR/wai-aria/states_and_properties) that are currently available for use. While each one of them serves a specific purpose, for the _most_ part you will only use around fifteen on a regular basis. So let’s take a couple moments to learn about a few attributes, the categories they fall under, and some example implementations.

### role

The `role` attribute informs Assistive Technology about how it should see, treat, and interact with an element.

Though a very important set of attributes, [Role Categorizations](https://www.w3.org/TR/wai-aria/roles#roles_categorization_header) often go underused. However, providing the ability to know how AT should treat an element can be very helpful for software like screen readers. While HTML5 has greatly expanded our abilities here, being able to say that a particular element is a [note](https://www.w3.org/TR/wai-aria/roles#note) , [timer](https://www.w3.org/TR/wai-aria/roles#timer) , [banner](https://www.w3.org/TR/wai-aria/roles#banner) , or [tooltip](https://www.w3.org/TR/wai-aria/roles#tooltip) , and so on, is even more useful.

```html
<ul class="nav nav-pills" role="tablist">
  <li class="active" role="tab">
    <a href="#" id="first-tab" class="active" aria-controls="first-tab">First Tab</a>
  </li>
  <li role="tab">
    <a href="#" id="second-tab" aria-controls="second-tab">Second Tab</a>
  </li>
</ul>

<div id="first-panel" aria-labelledby="first-tab" role="tabpanel" class="panel panel-default">
  <div class="panel-body">
    First Tab content
  </div>
</div>

<div id="second-panel" aria-labelledby="second-tab" role="tabpanel" class="panel panel-default">
  <div class="panel-body">
    Second Tab content
  </div>
</div>
```

[Read roles documentation](https://www.w3.org/TR/wai-aria/roles#roles_categorization_header)

### aria-hidden

By using `aria-hidden` we are able to declare that the element and its contents should be ignored by Assistive Technology.

This is called a [Widget Attribute](https://www.w3.org/TR/wai-aria/states_and_properties#attrs_widgets), which are most often used to provide a user with the finer details of an element. Being the largest category of attributes, there are several others that you will likely find yourself using, including: [aria-checked](https://www.w3.org/TR/wai-aria/states_and_properties#aria-checked), [aria-selected](https://www.w3.org/TR/wai-aria/states_and_properties#aria-selected), [aria-disabled](https://www.w3.org/TR/wai-aria/states_and_properties#aria-disabled), [aria-invalid](https://www.w3.org/TR/wai-aria/states_and_properties#aria-invalid), [aria-pressed](https://www.w3.org/TR/wai-aria/states_and_properties#aria-pressed) , and [aria-required](https://www.w3.org/TR/wai-aria/states_and_properties#aria-required) to name a few.

```html
<ul class="list-group">
  <li class="list-group-item">This line will be read</li>
  <li class="list-group-item" aria-hidden="true">This line will be ignored</li>
</ul>
```

[Read aria-hidden documentation](https://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden)

### aria-label

With `aria-label` you provide a recognizable label for an element that serves as an alternative to its content when it may not be intuitive to an impaired user.

Note: Though this is another [Widget Attribute](https://www.w3.org/TR/wai-aria/states_and_properties#attrs_widgets) , I feel it is worth bringing up because it is one I find myself using a lot.

```html
<p>I am the coolest guy at this party.</p>

<button class="btn btn-secondary" aria-label="Disagree">
  <span aria-hidden="true" class="fa fa-times"></span>
</button>
<button class="btn btn-primary" aria-label="Agree">
  <span aria-hidden="true" class="fa fa-check"></span>
</button>
```

[Read aria-label documentation](https://www.w3.org/TR/wai-aria/states_and_properties#aria-label)

### aria-labelledby

The `aria-labelledby` attribute identifies elements that serve as the label for an another element. By populating it with one or more IDs of existing elements on the page, a label containing the essential information about an object will be presented to Assistive Technologies.

This is referred to as a [Relationship Attribute](https://www.w3.org/TR/wai-aria/states_and_properties#attrs_relationships), which defines the connection between elements for Assistive Technology. Although a relatively small category, it contains other incredibly useful attributes such as: [aria-describedby](https://www.w3.org/TR/wai-aria/states_and_properties#aria-describedby), [aria-owns](https://www.w3.org/TR/wai-aria/states_and_properties#aria-owns), and [aria-controls](https://www.w3.org/TR/wai-aria/states_and_properties#aria-controls)

```html
<h1 id="title">Home Page</h1>
<section aria-labelledby="title main-label">
  <h1 id="main-label">Main Content</h1>
  <p>
    The attribute will use the two ids provided to create an intuitive label for this section.
  </p>
</section>
```

[Read aria-labelledby documentation](https://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby)

### aria-live

`aria-live` is a powerful attribute that informs the element that its contents may be updated and that those updates should be read to the user when they occur.

This belongs to the category of [Live Region Attributes](https://www.w3.org/TR/wai-aria/states_and_properties#attrs_liveregions) which tells Assistive Technology how to process updates to the element’s content. The remaining attributes in the category further define how the updates should be presented to the user and include: [aria-atomic](https://www.w3.org/TR/wai-aria/states_and_properties#aria-atomic), [aria-relevant](https://www.w3.org/TR/wai-aria/states_and_properties#aria-relevant), and [aria-busy](https://www.w3.org/TR/wai-aria/states_and_properties#aria-busy).

```html
<div
  class="“alert"
  alert-danger”
  aria-live="“polite”"
  aria-relevant="“additions"
  removals”
  aria-atomic="“true”"
  role="“alert”"
>
  Invalid user name
</div>
```

[Read aria-live documentation](https://www.w3.org/TR/wai-aria/states_and_properties#aria-live)

## Checking Your Work

When you start playing around with some of these attributes in your HTML, you will want to check to see how they are impacting the output in Assistive Technology. To do that you will want to use some of the software that is likely already on your computer!

If you are on a Mac, OSX comes preinstalled with [Apple VoiceOver](https://help.apple.com/voiceover/info/guide/10.12), which is free and easy to use. If you are on Windows, you can use [Narrator](https://support.microsoft.com/en-us/help/17173/windows-10-hear-text-read-aloud), which also comes with the operating system.

Some other popular screen readers that you may want to check out are [NVDA](http://www.nvaccess.org/), [ZoomText](http://www.zoomtext.com/products/zoomtext-magnifierreader/) , and [JAWS](http://www.freedomscientific.com/Products/Blindness/JAWS).

Plus, if you are on [Chrome](https://www.google.com/chrome/), some helpful plugins you can look in to are [WAVE](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh), [Accessibility Developer Tools](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb), and [Tota11y](http://khan.github.io/tota11y/).

While that can be a lot to check out at once, just know that my current workflow is not nearly that exhaustive. I typically use WAVE or Tota11y to check for suggestions in Chrome, but then spin up Voiceover and use Safari to actually listen to the output.

## What’s Coming Up

Accessibility is not something that should be an afterthought in your development process. Rather it is best placed at the forefront of your mind as you start working on a task. Why? Because going back later to make your code accessible is time consuming and could require a lot of refactoring.

In the next post, we will take a few minutes to explain how the rest of the posts in this series will go, but also introduce some outstanding tools to help us out. So [keep reading](/blog/2017-03-19-getting-ready-accessibility/)!

### Resources

- [Accessibility on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility) - A great series of articles that you could read through in under an hour to get a good hold on accessibility.
- [Accessibility on W3C](https://www.w3.org/TR/wai-aria/) - The more exhaustive resource on accessibility, but with some really useful step by step instructions on how to tackle certain scenarios.
- [WAI-ARIA](https://www.w3.org/WAI/intro/aria) - Another great guide on getting started with Accessibility.
