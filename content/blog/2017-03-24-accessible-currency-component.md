---
templateKey: blog-post
title: "Part 8: Building an Accessible Currency Component"
date: 2017-03-24T00:00:00.000Z
description: >-
  Assistive technology could use a helping hand when it comes to reading
  currency like humans do. This Ember component will help us do just that.
featuredimage: ../assets/a11y.png
tags:
  - ember
  - a11y
---

_This is part of a series on writing accessible Ember apps. Feel free to start at the [beginning](/blog/2017-03-17-what-is-accessibility/) to get caught up. Want to see these components in action? Then be sure to check out the [Ember Twiddle](https://ember-twiddle.com/8b5dc1fc195ff15212323cc294160c85?fullScreen=true) or the [GitHub Repo](https://github.com/krivaten/accessible-app)! Got questions? Hit me up on [Twitter](https://twitter.com/krivaten)._

In our last post we made a neat little component for displaying numbers that will be read nicely by assistive technology. In this post, where going to be extending the same component to make one that will do the same thing for currencies.

You may be wondering why we may need this component, and the simple answer is that we tend to read currency differently than we read other numbers. For example, most people would read the number 12.35 as "twelve point thirty five" or "twelve point three five". However, we will read the currency \$12.35 as "twelve dollars and thirty five cents". See the difference? Great.

## Our Component

Because we've already done most of the hard work in the previous post, this one will be much simpler. Here is the final piece of code:

```js
//
// app/components/ui-currency.js
//
import Ember from "ember";
import UiNum from "twiddle/components/ui-num";
import { numToWords } from "twiddle/utils/numbers";

const { get, computed } = Ember;

export default UiNum.extend({
  classNames: ["ui-currency"],

  number: null,
  currencySymbol: "$",

  splitAmount: computed("number", function () {
    let number = get(this, "number") || "0";
    return parseFloat(number).toFixed(2).split(".");
  }),
  formattedAmount: computed("number", function () {
    let splitAmount = get(this, "splitAmount");
    let currencySymbol = get(this, "currencySymbol");

    splitAmount[0] = splitAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${currencySymbol}${splitAmount.join(".")}`;
  }),

  label: computed("number", function () {
    let splitAmount = get(this, "splitAmount");
    let result = [];

    splitAmount.forEach(item => {
      result.push(item && item !== "00" ? numToWords(item) : null);
    });

    let [dollars, cents] = result;

    if (dollars && cents) {
      return `${dollars} dollars and ${cents} cents`;
    } else {
      return `${dollars} dollars`;
    }
  })
});
```

For example uses of this component, check out the [Ember Twiddle](https://ember-twiddle.com/8b5dc1fc195ff15212323cc294160c85?fileTreeShown=false&numColumns=0&route=%2Finputs) for this series. But you should also take a moment to review a few notes about the code:

### Formatted Amount

Here we're making sure the number looks like a currency, and allow for a custom `currencySymbol` if one is desired. Overall, this is all pretty straight forward.

### Label

In this computed property, we're doing some checks on the values of the dollars and cents to determine the language that is placed in the `aria-label`. Remember in our last post when we said that making the `numToWords` function only handle integers was for a reason? This was the reason. Because it gives us more control over the presentation.

## Examples

Here is a couple example uses of our new `ui-currency` component.

It can take simple whole values:

```hbs
{{ui-currency '12'}}
```

Which will be rendered as:

```html
<span aria-label="twelve dollars" id="ember438" class="ui-num ui-currency ember-view">
  $12.00
</span>
```

But it can also take large complex values:

```hbs
{{ui-currency '831241.87'}}
```

Which will be rendered as:

```html
<span
  aria-label="eight hundred thirty-one thousand two hundred forty-one dollars and eighty-seven cents"
  id="ember440"
  class="ui-num ui-currency ember-view"
>
  $831,241.87
</span>
```

## Conclusion

With a little modification we took our `ui-num` component and turned it in to something even more useful that could be used any place we need to display currency.

One of the great benefits of Ember is that we get so much out of the box for free. Then, with a little tweaking we can produce accessible output that can be used and enjoyed by everyone.
