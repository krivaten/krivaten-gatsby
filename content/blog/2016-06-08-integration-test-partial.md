---
templateKey: blog-post
title: Writing an Integration Test for a Partial
date: 2016-06-08T00:00:00.000Z
description: >-
  Do you have a standalone template that you want to have test coverage for?
  Here is a simple method for writing an integration test for a partial in
  Ember.
tags:
  - ember
  - tdd
---

As soon as you start getting used to **test driven development** (**TDD**) in **Ember**, you will inevitably come across a case/test that leaves you scratching your head asking, "How do I test for _this_?".

Earlier this week I came across one of those scenarios when I challenged myself to write an **integration test** for a **partial**. The code wasn't something I wanted or needed to wrap in to a component, so I wanted to find a way to make this work.

If you are new to Ember, a **partial** is a template that you can render _anywhere_ in your app that uses the same context that it gets rendered in to. You can do this by adding the following in to any existing template:

```hbs
{{partial 'path/to/template'}}
```

### Why Partials?

In **Ember**, **partials** are not likely going to be something you find yourself using very often, especially since **components** are typically recommended wherever you would find yourself using one. The case that lead to me writing this post was with a large **partial** that will eventually become a **component**, but not quite yet. However, I did still want some basic test coverage in the meantime.

A **partial** differs from a **component** in that its contents get injected _straight_ into a template as if you were just pasting them in.

They aren't wrapped in a containing element like a **component**, don't have a **javascript** file tied to them like a **component**, and just serve as a reusable chunk of **HTML**. In fact, _any_ template in your app, can be used as a **partial** if you find yourself just needing to reuse its contents.

### Why not an Acceptance Test?

Before we get to writing our **integration test**, you might be thinking to yourself, "Meh, I'll just write an **acceptance** test." But as you likely already know, by writing an **integration test**, we are able to test more things, and faster. So why unnecessarily slow down your test suite if you don't need to?

Plus, when you see how much easier it is to write an **integration test** for this, you'll be happy. Promise.

### Setting Up Our Partial

Alright, let's get started. For our example **partial**, we're just going to make a simple _user badge_ **template** that we will be able to use throughout our app. Here goes...

```hb
<div class="badge">
  {{#if user.avatar}}
    <img class="badge__avatar" src={{user.avatar}}/>
  {{/if}}
  <div class="badge__content">
    <h2 class="badge__title">
      {{if user.name user.name 'No Name'}}
    </h2>
    {{#if user.bio}}
      <p class="badge__details">
        {{user.bio}}
      </p>
    {{/if}}
  </div>
</div>
```

### Writing Our Integration Test

There's a couple nice things about integration tests that make testing our **partial** easy.

First of all, using the `hbs` helper, we can render our **partial** just like we would in a template.

Secondly, because a **partial** inherits the context that it gets rendered in to, we are able to test properties by setting them on `this`.

So with all that said, we can quickly test our **partial** with the following code:

```js
import Ember from "ember";
import { expect } from "chai";
import { describeComponent, it } from "ember-mocha";
import hbs from "htmlbars-inline-precompile";

describeComponent(
  "avatar",
  "Integration: AvatarTemplate",
  {
    integration: true
  },
  function () {
    it("renders the avatar", function () {
      // Since a partial assumes the context it is rendered in, we set our properties straight to `this`
      this.set("user", { avatar: "img.jpg" });

      // Now we can render our partial just like we would in any template using the `hbs` helper
      this.render(hbs`{{partial 'avatar'}}`);

      // Then add expectations as necessary
      expect(this.$(".badge__avatar")).to.have.length(1);
      expect(this.$(".badge__details")).to.have.length(0);
      expect(this.$(".badge__avatar").attr("src")).to.eq("img.jpg");
      expect(this.$(".badge__title").text().trim()).to.eq("No Name");
    });

    it("renders the name", function () {
      this.set("user", { name: "Kris Van Houten" });
      this.render(hbs`{{partial 'avatar'}}`);

      expect(this.$(".badge__avatar")).to.have.length(0);
      expect(this.$(".badge__details")).to.have.length(0);
      expect(this.$(".badge__title").text().trim()).to.eq("Kris Van Houten");
    });

    it("renders the bio", function () {
      this.set("user", { bio: "I code." });
      this.render(hbs`{{partial 'avatar'}}`);

      expect(this.$(".badge__avatar")).to.have.length(0);
      expect(this.$(".badge__details")).to.have.length(1);
      expect(this.$(".badge__title").text().trim()).to.eq("No Name");
      expect(this.$(".badge__details").text().trim()).to.eq("I code.");
    });
  }
);
```

### So Simple

As you can see, though it might not be well documented, it's actually _really simple_ to test **partials** in your **Ember** app without needing to add any dependencies along the way. Let me know if you found this useful by hitting me up on Twitter.
