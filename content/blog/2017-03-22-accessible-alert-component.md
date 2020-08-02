---
templateKey: blog-post
title: "Part 6: Buidling an Accessible Alert Component in Ember"
date: 2017-03-22T00:00:00.000Z
description: >-
  An overview of an Ember component designed to be an accessible alert that both
  users and assistive technology can be aware of.
featuredimage: ../assets/a11y.png
tags:
  - ember
  - a11y
---

_This is part of a series on writing accessible Ember apps. Feel free to start at the [beginning](/blog/2017-03-17-what-is-accessibility/) to get caught up. Want to see these components in action? Then be sure to check out the [Ember Twiddle](https://ember-twiddle.com/8b5dc1fc195ff15212323cc294160c85?fullScreen=true) or the [GitHub Repo](https://github.com/krivaten/accessible-app)! Got questions? Hit me up on [Twitter](https://twitter.com/krivaten)._

In an application, there will be the need to notify users of updates and other important information. This could include letting someone know that a form is invalid, that a task is complete, that a message has been received from the server, or many other things.

Presenting this information is one task, but letting assistive technology know that these messages are present or have been updated is quite another.

That’s why this post is going to describe a small alert component that will do that work for us.

## Our Component

While a potentially tricky component, the code required to make this happen is relatively small. In it, we will be using the `aria-live`, `aria-atomic`, and `role` attributes. Here is the final code:

```js
//
// app/components/ui-alert.js
//
import Ember from "ember";
import hbs from "htmlbars-inline-precompile";

const { Component } = Ember;

export default Component.extend({
  classNames: ["alert-container"],
  attributeBindings: ["role", "live:aria-live", "atomic:aria-atomic"],
  layout: hbs`
    {{#if message}}
      <div class="alert alert-{{type}}">
        {{#if title}}
          <strong class={{if titleHidden 'sr-only'}}>{{title}}</strong>
        {{/if}}
        {{message}}
      </div>
    {{/if}}
  `,

  type: "info",
  title: null,
  titleHidden: false,
  message: null,
  role: "alert",
  live: "polite",
  atomic: "true"
});
```

For example uses of this component, check out the [Ember Twiddle](https://ember-twiddle.com/8b5dc1fc195ff15212323cc294160c85?fullScreen=true) for this series. But you should also take a moment to review a few notes about the code:

### Container is always present

Once we render our alert component to the page, any time we decide to update the `message`, it will prompt the assistive technology to present that updated content to the user.

### Only Visible With Content

Another thing about this component is that it can sit empty in our templates, and won’t actually be _visible_ until we provide a value for the `message` property.

### Provide a Title

It is helpful to provide a title for your alert so that the message you present to users has some context. Keep in mind that the if the user can’t _see_ the message, they may not be expecting it, and as a result might be confused if the screen just starts telling them something out of nowhere. This title will be visible by default, but that is customizable as well.

## Example

Here is an example use of the component to show what it will output. It will generate a standard alert with a message (We will assume that `alertMessage` is populated with something):

```hbs
{{ui-alert type='danger' title='Scary Fact' message=alertMessage}}
```

And will be rendered as:

```html
<div aria-atomic="true" aria-live="polite" role="alert" id="ember472" class="alert-container ember-view">
  <div class="alert alert-danger">
    <strong>Scary Alert:</strong>
    You are probably within eight feet of a spider
  </div>
</div>
```

## Conclusion

I hope you are starting to see a pattern that producing accessible markup doesn’t have to mean writing a metric ton of code. But rather, it can be done with just a few lines of finesse in the components we would need to write anyway.

Next up, we’re going to look at a fun little challenge that _will_ require more code. That challenge is creating a component that will present numbers nicely, but also generate helpful `aria-labels` so that screen readers can read those values in a way that is easy for a user to understand. So [keep going](/blog/2017-03-23-accessible-numbers-component/)!
