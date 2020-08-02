---
templateKey: blog-post
title: "Part 4: Buidling an Accessible Icon Component in Ember"
date: 2017-03-20T00:00:00.000Z
description: Using the power of Ember to create a simple and accessible icon component.
featuredimage: ../assets/a11y.png
tags:
  - ember
  - a11y
---

_This is part of a series on writing accessible Ember apps. Feel free to start at the [beginning](/blog/2017-03-17-what-is-accessibility/) to get caught up. Want to see these components in action? Then be sure to check out the [Ember Twiddle](https://ember-twiddle.com/8b5dc1fc195ff15212323cc294160c85?fullScreen=true) or the [GitHub Repo](https://github.com/krivaten/accessible-app)! Got questions? Hit me up on [Twitter](https://twitter.com/krivaten)._

To start off our creation of accessible components, we’re going to begin with one that is dead simple, but also sets the stage for many others in the series. That component is for a simple icon.

You may be asking, “Why is this important?” and that is a fair question. Reason being, icon fonts are tools that are present in basically every applications, and quite often they are implemented in such a way that can cause confusion to someone using a screen reader.

You’re likely familiar with seeing something that looks like this:

```html
<i class="“fa" fa-trash”></i>
```

The problem with this approach is that, depending on the font, screen readers will read the unicode character out loud that has been added via the `content` attribute in icon font’s CSS. This can be confusing to someone who cannot see the icon that is represented by that unicode character on the screen.

So we will write a simple icon component that prevents this behavior from happening. But in addition, we will provide the ability for this component to add an `aria-label` attribute which will be presented in place of the unicode character as an option.

## Our Component

We’re going to keep this component short and sweet, but still highly useful. We’ll be using the `aria-label` and `aria-hidden` attributes to help make them more accessible, and with that said, here is the final code:

```js
//
// app/components/ui-icon.js
//
import Ember from "ember";

const { Component, get, computed } = Ember;

const UiIcon = Component.extend({
  tagName: "span",
  classNameBindings: ["prefix", "iconClass"],
  attributeBindings: ["label:aria-label", "_ariaHidden:aria-hidden"],

  label: null,
  prefix: "fa",
  icon: null,

  _ariaHidden: computed("label", function () {
    return get(this, "label") ? undefined : "true";
  }),

  iconClass: computed("icon", function () {
    const prefix = get(this, "prefix");
    const icon = get(this, "icon");

    if (!icon) {
      return;
    }

    return icon.indexOf(`${prefix}-`) > -1 ? icon : `${prefix}-${icon}`;
  })
});

UiIcon.reopenClass({
  positionalParams: ["icon"]
});

export default UiIcon;
```

For example uses of this component, check out the [Ember Twiddle](https://ember-twiddle.com/8b5dc1fc195ff15212323cc294160c85?fullScreen=true) for this series. But you should also take a moment to review a few notes about the code:

### No Template

Because this component only needs to render an empty `span` element, we don’t need to provide a template for it. So rather than clutter our code with an empty file, we can safely remove our `ui-icon.hbs` without any side effects.

### Positional Params

A nice little hidden gem in Ember is the ability to use something called [positionalParams](http://emberjs.com/api/classes/Ember.Component.html#property_positionalParams) in components. This allows us to pass values in to our components, like arguments in a function, and based on their _position_ in the declaration, Ember will automatically assign them to properties within the component for us!

For example, based on our component above {% raw %}{{ui-icon ‘time’}}{% endraw %} would be the same as writing {% raw %}{{ui-icon icon=‘time’}}{% endraw %}. Why is this useful? Because you can get away with writing less code, and that’s a win!

### Prefix

If you’re using an icon font library, chances are all your icon classes will have a _prefix_. In Font Awesome for example, every icon is prefixed with `fa-`. In an effort to reduce code yet again, this component will add the prefix for us.

### Auto Hide

A nice little feature of this component, is that it will automatically add the `aria-hidden=“true”` attribute, if no label is passed in. This again just takes out some of the heavy lifting that would have to be done manually.

## Examples

Here are a few example uses of the component to see what it will output.

This will generate an icon that will be ignored by screen readers:

```hbs
{{ui-icon 'awesome'}}
```

And will be rendered as:

```html
<span class="fa fa-awesome" aria-hidden="true"></span>
```

This will generate an icon whose label will be read by screen readers:

```hbs
{{ui-icon 'beautiful' label='This test will be read'}}
```

And will be rendered as:

```html
<span class="fa fa-beautiful" aria-label="This text will be read"></span>
```

## Conclusion

Within just a few minutes we’ve been able to create a very useful component that could likely be used throughout your app. While simple and small in size, it can easily become a staple to the code you write.

Next, we’re going to be building another simple yet powerful component for our arsenal, and it is none other than the standard [form input](/blog/2017-03-21-accessible-input-component/).
