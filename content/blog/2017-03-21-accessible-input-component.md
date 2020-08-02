---
templateKey: blog-post
title: "Part 5: Buidling an Accessible Input Component in Ember"
date: 2017-03-21T00:00:00.000Z
description: Using the power of Ember to create a simple and accessible input component.
featuredimage: ../assets/a11y.png
tags:
  - ember
  - a11y
---

_This is part of a series on writing accessible Ember apps. Feel free to start at the [beginning](/blog/2017-03-17-what-is-accessibility/) to get caught up. Want to see these components in action? Then be sure to check out the [Ember Twiddle](https://ember-twiddle.com/8b5dc1fc195ff15212323cc294160c85?fullScreen=true) or the [GitHub Repo](https://github.com/krivaten/accessible-app)! Got questions? Hit me up on [Twitter](https://twitter.com/krivaten)._

Forms are huge buckets of vulnerability when it comes to writing accessible applications and websites. There are so many things that can go wrong with them that we must be sure to test them thoroughly.

One of the areas that we can get in trouble while using Ember is around the form inputs themselves. Specifically around tying inputs to their labels. This is because without labels, assistive technology will not be able to inform users what a particular field is for.

In HTML this can be done one of two ways. First, by explicitly referencing the input’s `id` on the label’s `for` attribute, or by wrapping the input with the label itself:

```html
Method One (Explicit):
<label for="“name”">Your Name</label>
<input id="“name”" />

Method Two (Implicit):
<label>
  Your Name
  <input />
</label>
```

Because Ember provides the `input` and `textarea` helpers, and since these produce their own unique IDs (Unless we pass in our own), it can be tricky to tie an input’s label to itself without using the implicit method (Method two above).

But sometimes you don’t want to rely on this approach. So we’re going to create a component that will do the lifting for us, and even _yell_ at us when we use it wrong. That way, when other developers try using our component, our code will ensure it is used correctly.

## Out Initializer

Before we can write our component, we will need to make a small update to the `Ember.TextSupport` class, so that we can add the `aria-describedby` attribute to our inputs. It's super simple and looks like this:

```js
//
// app/initializers/aria.js
//
import Ember from "ember";

export function initializeAria() {
  Ember.TextSupport.reopen({
    attributeBindings: ["ariaDescribedBy:aria-describedby"]
  });
}

export default {
  name: "aria",
  initialize: initializeAria
};
```

Nothing magical going on here, but a small change necessary to get the output we need. Onward!

## Our Component

This one is a bit more complex than our previous component so take a few moments to process it. As far as ARIA labels are concerned, we’ll only be using the `aria-describedby`, but the rest will be simply using Ember to create the markup we need. Here is the final code:

```js
//
// app/components/ui-input.js
//
import Ember from "ember";
import hbs from "htmlbars-inline-precompile";

const { Component, computed, assert, isPresent, get, guidFor } = Ember;

const LABEL_MSG =
  'You must provide a "label" attribute for all uses of "{{ui-input}}" for impaired users. If you want to hide the label visually, you may also provide the attribute labelHidden=true.';

export default Component.extend({
  classNames: ["form-group"],
  layout: hbs`
    <label for="{{inputId}}" class="{{if labelHidden 'sr-only'}}">
      {{label}}
      {{#if required}}
        <sup class="text-danger">*</sup>
      {{/if}}
    </label>
    {{#if hasBlock}}
      {{yield this}}
    {{else}}
      {{input
        id=inputId
        ariaDescribedBy=(if description descriptionId)
        type=type
        value=value
        placeholder=placeholder
        disabled=disabled
        required=required
        class="form-control"}}
    {{/if}}
    {{#if description}}
      <p id="{{descriptionId}}" class="text-muted {{if descriptionHidden 'sr-only'}}">
        {{description}}
      </p>
    {{/if}}
  `,

  id: null,
  type: "text",
  value: null,
  placeholder: null,
  disabled: null,
  required: null,
  labelHidden: null,

  label: computed({
    set(key, value) {
      assert(LABEL_MSG, isPresent(value));
      return value;
    }
  }),
  containerId: computed("id", function () {
    return get(this, "id") || guidFor(this);
  }),

  inputId: computed("id", function () {
    return `${get(this, "containerId")}-input`;
  }),

  descriptionId: computed("containerId", function () {
    return `${get(this, "containerId")}-description`;
  })
});
```

For example uses of this component, check out the [Ember Twiddle](https://ember-twiddle.com/8b5dc1fc195ff15212323cc294160c85?fullScreen=true) for this series. But you should also take a moment to review a few notes about the code:

### Unique IDs

Notice that the component will either reference a passed in ID or use the guid for the component’s instance as the prefix for the input and description IDs. This ensures that the IDs are both unique and understandable when looking through the DOM.

### Non-Visible Options

We also have the ability to hide both the label and description from the screen if we don’t need to show those on the screen. By doing this, we can keep a nice layout while still providing assistive technology with the information they need.

### Labels are Required

Look at the computed property for the label. What this code does is verify that a label has been provided to the component. If it doesn’t find one, it notifies the user via an informative `assert`.

## Examples

Here are a few example uses of the component to see what it will output.

This will generate a standard input with label:

```hbs`
{{ui-input value=name label='Name'}}

````

And will be rendered as:

```html
<div id="ember440" class="form-group ember-view">
  <label for="ember440-input">
    Name
  </label>
  <input type="text" id="ember440-input" class="form-control ember-text-field ember-view">
</div>
````

This use will generate a standard input with a hidden description:

```hbs
{{ui-input value=name description='I am invisible' descriptionHidden=true label='Secret'}}
```

And will be rendered as:

```html
<div id="ember437" class="form-group ember-view">
  <label for="ember437-input">
    Secret
  </label>
  <input type="text" id="ember437-input" class="form-control ember-text-field ember-view" />
  <p id="ember437-description" class="text-muted sr-only">
    I am invisible
  </p>
</div>
```

## Conclusion

While there is so much that we can do to ensure that our forms are accessible, this component provides a solid baseline for getting us started with accessible forms. It also shows us some advanced tricks in Ember that will do some of the heavy lifting for us.

Next, lets take a step back and create an [alert box](/blog/2017-03-22-accessible-alert-component/) that will automatically present it’s updates to a user.
