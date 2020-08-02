---
templateKey: blog-post
title: "Part 7: Buidling an Accessible Numbers Component in Ember"
date: 2017-03-23T00:00:00.000Z
description: >-
  Assistive technology could use a helping hand when it comes to reading numbers
  like humans do. This Ember component will help do just that.
featuredimage: ../assets/a11y.png
tags:
  - ember
  - a11y
---

_This is part of a series on writing accessible Ember apps. Feel free to start at the [beginning](/blog/2017-03-17-what-is-accessibility/) to get caught up. Want to see these components in action? Then be sure to check out the [Ember Twiddle](https://ember-twiddle.com/8b5dc1fc195ff15212323cc294160c85?fullScreen=true) or the [GitHub Repo](https://github.com/krivaten/accessible-app)! Got questions? Hit me up on [Twitter](https://twitter.com/krivaten)._

When it comes to numbers, assistive technology could use a bit of a helping hand. If you have a number like 4,235, most screen readers will read that as "four two three five", while in your head you most likely read "four-thousand two-hundred thirty-five". So when a computer presents a series of single digits back to a user that is actually a larger, multi-digit number, it can be both frustrating and confusing.

On previous applications I've worked on, we had custom components that would take a number, such as _98254.29_, and convert it to a string that looked more like _98,254.29_.

In this post we're going to be building something similar. But instead of just converting a number to something that _looks_ easier to read on the screen, we're going to generate an `aria-label` that will read the value back to us in the same way we read it to ourselves.

## Our Utility

Because this is something we may want to use elsewhere, we're going to create a utility to do the language parsing portion for us. Here is the final code for that:

```js
//
// app/utils/numbers.js
//

const TEN = 10;
const ONE_HUNDRED = 100;
const ONE_THOUSAND = 1000;
const ONE_MILLION = 1000000;
const ONE_BILLION = 1000000000;
const ONE_TRILLION = 1000000000000;
const ONE_QUADRILLION = 1000000000000000;
const MAX = 9007199254740992;
const LESS_THAN_TWENTY = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen"
];
const TENTHS_LESS_THAN_HUNDRED = [
  "zero",
  "ten",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety"
];

export function numToWords(number) {
  let num = parseInt(number, 10);
  if (!isFinite(num)) {
    throw new TypeError("Not a finite number: " + number + " (" + typeof number + ")");
  }
  return generateWords(num);
}

function isFinite(value) {
  return !(typeof value !== "number" || value !== value || value === Infinity || value === -Infinity);
}

function generateWords(number) {
  let remainder;
  let word;
  let words = arguments[1];

  // We’re done
  if (number === 0) {
    return !words ? "zero" : words.join(" ").replace(/,$/, "");
  }

  // First run
  if (!words) {
    words = [];
  }

  // If negative, prepend “minus”
  if (number < 0) {
    words.push("minus");
    number = Math.abs(number);
  }

  if (number < 20) {
    remainder = 0;
    word = LESS_THAN_TWENTY[number];
  } else if (number < ONE_HUNDRED) {
    remainder = number % TEN;
    word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
    // In case of remainder, we need to handle it here to be able to add the “-”
    if (remainder) {
      word += "-" + LESS_THAN_TWENTY[remainder];
      remainder = 0;
    }
  } else if (number < ONE_THOUSAND) {
    remainder = number % ONE_HUNDRED;
    word = generateWords(Math.floor(number / ONE_HUNDRED)) + " hundred";
  } else if (number < ONE_MILLION) {
    remainder = number % ONE_THOUSAND;
    word = generateWords(Math.floor(number / ONE_THOUSAND)) + " thousand";
  } else if (number < ONE_BILLION) {
    remainder = number % ONE_MILLION;
    word = generateWords(Math.floor(number / ONE_MILLION)) + " million";
  } else if (number < ONE_TRILLION) {
    remainder = number % ONE_BILLION;
    word = generateWords(Math.floor(number / ONE_BILLION)) + " billion";
  } else if (number < ONE_QUADRILLION) {
    remainder = number % ONE_TRILLION;
    word = generateWords(Math.floor(number / ONE_TRILLION)) + " trillion";
  } else if (number <= MAX) {
    remainder = number % ONE_QUADRILLION;
    word = generateWords(Math.floor(number / ONE_QUADRILLION)) + " quadrillion";
  }

  words.push(word);
  return generateWords(remainder, words);
}
```

Note: I give credit for the below snippet to [this comment on Stack Overflow](http://stackoverflow.com/a/30524915). I just cleaned it up a bit and bent it to my will.

We could spend quite a bit of time on this code alone, but for the sake of brevity I will simply say that we will be calling `numToWords` and passing in an integer. The function will then take this number and return a human readable string as the value.

## Our Component

While our utility is a decent size, our component, on the other hand, will actually be relatively small. Here is the whole thing:

```js
//
// app/components/ui-num.js
//

import Ember from "ember";
import hbs from "htmlbars-inline-precompile";
import { numToWords } from "twiddle/utils/numbers";

const { Component, computed, get } = Ember;

const UiNum = Component.extend({
  classNames: ["ui-num"],
  tagName: "span",
  attributeBindings: ["label:aria-label"],
  layout: hbs`{{formattedAmount}}`,

  number: null,

  splitAmount: computed("number", function () {
    let number = String(get(this, "number")) || "0";
    return number.split(".");
  }),

  formattedAmount: computed("splitAmount", function () {
    let splitAmount = get(this, "splitAmount");

    splitAmount[0] = splitAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return splitAmount.join(".");
  }),

  label: computed("splitAmount", function () {
    let splitAmount = get(this, "splitAmount");
    let result = [];

    splitAmount.forEach(item => result.push(numToWords(item)));

    return result.join(" point ");
  })
});

UiNum.reopenClass({
  positionalParams: ["number"]
});

export default UiNum;
```

For example uses of this component, check out the [Ember Twiddle](https://ember-twiddle.com/8b5dc1fc195ff15212323cc294160c85?fullScreen=true) for this series. But you should also take a moment to review a few notes about the code:

### Split Amount

Our `numToWords` utility only works with integers, meaning no floats here. This is by design, because we want to have control over how the _decimal_ is read in the value. This will become even more clear in our next post.

### Formatted Amount

This is just a simplified method of making numbers _look pretty_ on the screen. But really all it is doing is adding commas to the left side of the number.

### Label

Here is where we call our `numToWords` function, which will populate the `aria-label` attribute. But do take notice that wherever a decimal is in the number, we are replacing it with the word 'point'.

## Examples

Here is a couple example uses of our new `ui-num` component.

It can take large numbers such as:

```hbs
{{ui-num 397349573}}
```

Which will be rendered as:

```html
<span
  aria-label="three hundred ninety-seven million three hundred forty-nine thousand five hundred seventy-three"
  id="ember433"
  class="ui-num ember-view"
>
  397,349,573
</span>
```

It can also take decimal values:

```hbs
{{ui-num '42.35'}}
```

Which will be rendered as:

```html
<span aria-label="forty-two point thirty-five" id="ember434" class="ui-num ember-view">
  42.35
</span>
```

## Conclusion

I'll admit, this one is a bit of a beast, and it could be improved further, but the results truly do present so much more nicely than the alternative. People may complain that we are _gumming up_ the DOM with more text (Which is true), but _gummed up_ or not, it is a useful aide that warrants its presence.

Next, we're going to be extending this component do make a another one that is extremely useful. If you ever need to display currency within your app, then you should [check it out](/blog/2017-03-24-accessible-currency-component/)!
