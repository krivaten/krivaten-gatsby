---
templateKey: blog-post
title: "Part 1: What Is Accessibility?"
date: 2017-03-17T00:00:00.000Z
description: >-
  Publishing accessible code is something developers would be wise to know how
  to do. Disagree? Allow me to make my case for why this is important.
featuredimage: ../assets/a11y.png
tags:
  - ember
  - a11y
---

_This is part of a series on writing accessible Ember apps. Got questions? Hit me up on [Twitter](https://twitter.com/krivaten)._

I love writing Ember apps, and have been doing so from the time I was first thrown in to a project in June of 2013. Since those stressful few months where I Googled every possible question about Javascript and Ember, the framework has greatly matured. Nowadays, it’s an outstanding collection of tools that, as of writing, provide an excellent set of conventions for creating, organizing, testing, and deploying _ambitious_ applications.

Throughout the life of the various applications I’ve had the pleasure to work on, the term _accessibility_ was something I never put any thought in to. Additionally, I believed that writing semantic HTML on static websites had it’s benefits, but in Single Page Applications (SPAs), that were not crawlable by search engines, it didn’t matter.

However, in June of 2016 I was placed on a team that was given the goal of making a large Ember application accessibility compliant. Knowing basically nothing about the topic, I dove in to learning about it, so that I could contribute something of value. During that time, there was a few things I learned:

1.  Writing accessible apps is important because it doesn’t only impact if and how _blind_ people can use your app. But rather it impacts millions of people and spans various disabilities related to everything from vision and colorblindness to motor and mental impairments. As a result it should impact our design, our language, our planning, and our implementation of features.
2.  In _most_ cases, by writing semantic HTML we can address ~80% of the challenges that someone using Assistive Technology will face (Statistic my own, from experience).
3.  There is astoundingly little content explaining how to do this well, and how to utilize great frameworks, like Ember, to do some of the heavy lifting for uninformed developers.

Over several months, and after looking over several issues in the app that I was working on, I started to develop my own little set of Ember components to solve problems I found throughout our code. Some of these components are what we will be recreating in the following posts.

In this series (Which will likely grow with time), my effort will be to provide real examples of how to leverage the power of Ember to build your app in such a way that it provides people with disabilities the information they need to use it well.

While much like SEO, this task may never be _truly_ complete, it my hope that along the way, we can learn to build great things together. But before we jump in to the code, I want to take a few minutes to shed some general knowledge about accessibility.

## Bad Markup Breaks Your App

Just like bad Javascript can render your app unusable, bad HTML can do the exact same thing. Here is a contrived example of what I mean:

```hbs
<div class="bath-form-toggle">
  <i class="fa fa-bath" {{action 'toggleBathForm'}}></i>
</div>
{{#if bathFormVisible}}
  <div class="bath-form">
    <h3>Schedule Your Bath Now</h3>
    {{input placeholder='Name' value=bathRequest.name}}
    {{input placeholder='Days since last bath' value=bathRequest.daysSinceLastBath}}

    <button class="btn btn-primary" {{action 'scheduleBath'}}>
      Schedule Bath
    </button>
  </div>
{{/if}}
```

If we rendered the above HTML in a browser, chances are we would able to use it without any difficulty, however there are a number of issues that someone using a Screen Reader (A type of assistive technology) will encounter:

- They will not see the icon with the class `fa-bath`, and as a result will have no idea that they could click on it to display a form.
- They would not know that there is a form on the page.
- Depending on the screen reader they are using, even if they were able to find the input fields, they may not know what they were for.

While we could say more, it should go without saying, that if you have code like this in your application, your app is broken.

People with various mental, visual, and motor impairments use the internet everyday and perhaps even _your_ application. These individuals may have partial blindness, color blindness, dyslexia, glaucoma or a variety of other challenges that they face. But this also includes people with motor hindrances such as paralyzation, Cerebral Palsy, and Parkinson's disease to name a few.

Upon reading that last paragraph, you may be thinking to yourself, “Yeah, but there isn’t that many people affected by those impairments to justify me changing how I code”. But according to figures released by the [Census Bureau](http://www.census.gov/newsroom/releases/archives/facts_for_features_special_editions/cb12-ff16.html) in 2012, roughly 8 million Americans have some type of vision difficulty alone. That’s about the same number of people using a crappy version of IE, however unlike those strange people, those with impairments can’t simply upgrade their eyes to solve the problem. Plus we aren’t even including those with mental or motor disabilities.

But not to worry, there is hope! The good news is that modern computers and mobile devices are equipped to do a lot of the hard work for us, so long as outstanding developers, like you (And maybe me), make the effort to unlock their potential.

## How People With Impairments Use the Web

For people who have conditions that limit their ability to use a computer, there is a number of tools, called Assistive Technology (AT), that is available to help them. The most popular AT, which we mentioned above, is called a _screen reader_. This is software that comes installed on your operating system, or as a third party application, that reads the focused content of a computer screen to the user, thereby allowing them to navigate and use the machine.

While browsing the web, this technology relies _heavily_ on the _quality_ of HTML markup to know what area the software is currently focused on and what other areas are available to the user.

For example, with good markup, a screen reader will know what area of the page is the navigation menu, which is the main content, which is a list of posts, which is the sign up form, which is the page title, and so on. This allows a person to use special keyboard commands to quickly navigate around a page to get to the information they want and have the computer read the content back to them as they need.

Thankfully, screen readers are written to look at valid HTML, and with a little extra help, know how to read and present that content to whoever may be listening.

There are _many_ different types of AT that we simply do not have the time to cover here. But typically, if your application is usable by someone using a screen reader, then it is most likely usable by someone using a different tool.

## Let’s Make Ember Apps Great

As we’ve shown above, there is a large number of people with impairments that make it more difficult for them to do simple things that many of us take for granted, such as browsing the web. Wouldn’t it be great if, by putting in a little extra thought and effort, you could make it much easier for these people to use what you’ve built?

In this series, my goal is to review some of the tools and tactics of how to make an application more accessible. We will start with the basics to give you an introduction, but will quickly jump in to discussing some helpful addons and building some accessible components that will follow recommended best practices for tackling common challenges.

I hope to see you in the [next post](/blog/2017-03-18-accessibility-primer/).
