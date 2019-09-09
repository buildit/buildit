---
layout: basic-page.njk
title: Buildit’s design system, Gravity
collection:
  - colStories
  - colArticles
date: "2018-06-15T12:00:00.000Z"
article-index: 0
description: We have created a nascent design system and its name is Gravity. It supports our Buildit @ Wipro Digital website and our internal projects. 
canonicalUrl: https://medium.com/buildit/introducing-buildits-gravity-design-system-44c3fe7a1d26
blocks-njk:
  main: layouts/partials/articles/main.njk
image:
  src: images/articles/gravity.png
  alt: Buildit's Gravity Design System
ogType: article
section: stories
---
This is the story of how Gravity came to be and where it is headed next.

## The motivation
Buildit has had a website and a small number of internal web applications for some time. All of them had been designed and built independently and consequently looked and behaved quite differently from each other. There was, therefore, a clear case for unifying their UI code to create consistency and reduce the amount of redundant code that needed to be maintained.

Furthermore, Buildit is a consultancy and, in case you hadn’t already noticed, we have been [working with design systems for some time now](https://medium.com/buildit/our-atomic-journey-so-far-b333c98b1d3f). We have helped our clients create everything from living style guides to full-blown design systems. Unfortunately, much of our work is covered by NDAs so we can’t publicly share details of what we’ve done.

However, by “practicing what we preach” we can:
- Create a case study we can share widely and thereby increase our design system credibility with clients
- Test new techniques and ideas on our own time, without putting client work at risk
- Create an environment for new and junior colleagues to learn about and explore design systems

## The beginnings
Work on our design system began in earnest in May 2017. There were a number of us who were in between client engagements and therefore had some spare time to work on this internal project.

We conducted some research and workshops to get a handle on what shape our design system should take to best serve its consumers.

## Tech stack research
Buildit already had three projects that could potentially benefit from a design system: The Buildit website and two internal web apps.

<figure><img src="/images/articles/ibgds-01.png" alt="Some of the questions from our questionnaire"><figcaption>Some of the questions from our questionnaire</figcaption></figure>

We began by sending out a developer questionnaire, inspired by [Brad Frost’s Frontend Guidelines Questions](http://bradfrost.com/blog/post/frontend-guidelines-questions/), to those 3 teams. The results were interesting:
- The website used [Pug templates](https://pugjs.org/api/getting-started.html) to creates static HTML. Styling was done in [LESS](http://lesscss.org/) and made use of the [Semantic UI](https://semantic-ui.com/) framework.
- One of the apps was written in [React.js](https://reactjs.org/) and had its styling code written in [SASS](http://sass-lang.com/).
- The other app was written in [Angular](https://angular.io/). It’s styling was also written in SASS but built on [Bootstrap](https://getbootstrap.com/).

They also differed in terms of their build tools, testing and coding conventions.

Thankfully though, all 3 teams indicated that they’d be willing to migrate towards a common UI library provided by the design system.

Based on these insights and some intense debate, we eventually settled on the following approach for our UI library:
- We’d **build our own from scratch** rather than theming an off-the-shelf one like Bootstrap or [Prime Faces](https://www.primefaces.org/). This was because we realised that the hands-on experience we’d gain by doing so was more valuable to us than quicker time to market or a more comprehensive set of components.
- We’d initially only provide **CSS (with SASS source code)** as this could be used by all projects, regardless of their choice of JS framework or build tools.
- We’d be opinionated about the HTML elements and attributes that should be used for components because we wanted to encourage good semantics and accessibility. We’d therefore use CSS element and attribute selectors as much as possible.
- We’d **use [BEMIT](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) conventions** to organise our SASS code and name our class names.

## Choosing a name
“Buildit design system” is a bit of a mouthful. Not to mention dull. We decided early on that we wanted to give our design system a name. To get inspiration we enlisted the help of all of Buildit by creating an online suggestion form with two questions:
- What should we call the design system?
- Why should it be called that?

![Screenshot of Buildit's Slack channel](/images/articles/ibgds-02.png)

That form was then shared on a Buildit-wide Slack channel. We received a good number of responses from fellow Buildsters around the world. Here are a few interesting and amusing suggestions that were rejected:
- “Amnesty”, because it’s your get out of design hell free card when you implement it correctly
- “Pangu”, the creator of all things in Chinese mythology
- “Designy McDesignFace”
- “Designsystemit”

The one we liked best and ultimately chose was, of course, “Gravity”. Curiously, it was the only name to be suggested twice — independently as far as we know. Once by Simon Copsey and again by Greg “Hap” Pearman. Simon’s reason for suggesting “Gravity” was what ultimately swayed our decision though:

> It’s a natural force for bringing things closer together, similar to what we want to do with design + engineering.

The naming exercise turned out to be quite fun. An unexpected benefit was that many people in Buildit became aware of Gravity and also felt at least somewhat involved.

## Design principles
Successful design systems have a set of design principles to guide their work and decision making. Naturally, we wanted a set of our own.

We began by looking at other design systems’ principles and collating them in a table to look for commonalities.

<figure><img src="/images/articles/ibgds-03.png" alt="Excerpt from our big design system principles comparison table"><figcaption>Excerpt from our big design system principles comparison table</figcaption></figure>


Of the design systems we looked at, the most common principles centered around:

- Re-use
- UI simplicity
- UI usability
- UI consistency
- UI aesthetics

Inspired by what others were doing, we eventually came up with this initial set of principles for Gravity:

- **Be useful**
- **Don’t Repeat Yourself**
- **Be universal**
- **Be robust**
- **Embrace each medium**
- **Keep it tidy**

We subsequently found that, while these were all good aspirations, some of them were weak as principles. Eventually we changed them, but we’ll cover that later in our story…

## UI inventory

We then conducted UI inventories of our website and apps. Unsurprisingly, each app had a very different look and feel from the others.

<figure><img src="/images/articles/ibgds-04.jpg" alt="The team reviewing and collating components from the various UI inventories"><figcaption>The team reviewing and collating components from the various UI inventories</figcaption></figure>

Nonetheless, when we began to collate all the components, we did find some repetition of the same kinds of components. However, organising and naming the components proved to be highly contentious.

The output of this exercise was a list of components that Gravity would eventually need to provide so that our website and apps could migrate to it.

## The void

With our research done, we were raring to go. We set up a git repository for our UI library, set up a PatternLab build to generate a live pattern library and then… we stalled.

<figure><img src="/images/articles/ibgds-05.jpg" alt="Nothing but tumbleweed (Photo credit: Jez Arnold)"><figcaption>Nothing but tumbleweed (Photo credit: <a href="https://commons.wikimedia.org/wiki/File:Tumbleweed_rolling.jpg">Jez Arnold</a>)</figcaption></figure>

Buildit is a consultancy. We make our money by helping our clients with digital transformation projects. We don’t make and sell our own products.

While we are intentionally given some amount of “bench time” between client projects to learn or support internal activities, paid client work will always take priority.

That’s what happened. We’d been using our bench time to get Gravity started but hadn’t secured any official funding from our leadership. Eventually, everyone involved was assigned to client projects and work on Gravity ground to a halt.

No surprise there. Many people have written about [the need to treat a design system as a product](https://articles.uie.com/a-design-system-isnt-a-project-its-a-product-serving-products/), i.e. something that is continuously developed and maintained. That’s never going to happen without proper funding.

## The resurrection

In early December 2017, an internal project was kicked off to refresh the [Buildit website](https://buildit.wiprodigital.com/). Based on our experience with Gravity and also some other internal projects that people had done “on the side”, we insisted that this had to be run properly, just as though it was a client project. That meant that the team would be assigned to work on the website for a certain amount of time and could not be snatched away for other things.

Even though we were building a website, part of that was designing and developing a set of UI components. We therefore picked up Gravity’s mostly empty UI library and pattern library and fleshed them out just enough to build the website. To be honest, even if we hadn’t had Gravity, we still would have built a pattern library, because *that’s just how you make websites*.

<figure><img src="/images/articles/ibgds-06.jpg" alt="The relationship between the code for Gravity’s pattern library, UI library and Buildit’s website"><figcaption>The relationship between the code for Gravity’s pattern library, UI library and Buildit’s website</figcaption></figure>

In terms of design, we sketched on paper and whiteboards, tested some navigation flows with a clickable wireframe prototype in Balsamiq and did some visual design explorations in Sketch and Illustrator. However, whatever artefacts we produced in those tools were ephemeral, rough drafts. **As soon as we felt our ideas had matured enough, we implemented them in HTML & CSS within our pattern library and then iterated and refined them in there.**

It was a conscious decision to get into the final medium as early as possible and “design in the browser”. We firmly believe that this approach…
- Is **lean**, since it eliminates the burden of keeping design artefacts in sync with the code
- Allows us to **make more informed design decisions**, since we inspect and evolve our UI within an actual browser and therefore can test not just visual appearance, but also accessibility, performance, progressive enhancement, interactive behaviours and more
- **Encourages consistency.** Working within our pattern library (where we had used Atomic Design to organise our components) made it easy to find and re-use existing components rather than adding redundant variations.
- **Makes our design more systematic.** Applying far-reaching changes, such as altering our colour palette or playing with the typographic scale, was trivially easy to accomplish — often as simple as changing the value of a SASS variable. Likewise, being able to zoom in on an individual component to make a very localised change and then zoom out to see the wider impact of that change on the overall look and feel helped us assess and maintain consistency and coherence in our designs as we went along.

A consequence of this approach is that we do not have a complete or up-to-date representation of our components to use in design tools like Sketch. As it stands, we don’t feel the need to make one (and then have the burden of keeping it up to date).

And so, as a by-product of creating our website, we were able to also create and release an initial version of Gravity’s UI library. Finally, Gravity was taking shape! We now had a set of working, coherent, documented UI components that were in active use:

- Gravity’s pattern library
- Gravity’s UI library on NPM
- Gravity’s UI library source code, docs and issues

## The present

Gravity now has enough substance that we’re finally comfortable to tell the world about it. However, we still consider Gravity to be a *nascent* design system.

<figure><img src="/images/articles/ibgds-07.jpg" alt=""><figcaption>Viewing the page header component within Gravity’s pattern library</figcaption></figure>

## Developing a roadmap

There’s a lot of documentation still to write. There are bugs to fix, things to enhance and, as we support projects beyond our website, there will be more components to add. Furthermore, in [Brad Frost’s analogy](http://bradfrost.com/blog/post/the-workshop-and-the-storefront/), what we have so far is mostly a “workshop”, but we’re still lacking a nice style guide website to act as Gravity’s “storefront”.

To that end, we have already begun building up a [backlog of ideas, enhancements and issues on Github](https://github.com/orgs/buildit/projects/4). With a bit of refinement and prioritisation that should provide us with a decent road map.

## Refining our principles

While designing and building our UI components, we found that our initial set of design principles weren’t always helpful. We had hoped they would guide us when faced with tough decisions. For example, consider having to make a trade-off between better aesthetics or reduced code complexity for a UI component. Ideally, you want both. If that’s not feasible though, you need to prioritise one over the other — a good set of principles should inform that sort of decision in a consistent way.

On closer inspection, we concluded that our initial design principles had the following issues:

- Some were guidelines or best practices, but not opinionated enough to be a principle. For example, “Be useful”. Well duh! When would you ever not want to be useful?
- Others overlapped a bit. “Don’t Repeat Yourself” and “Keep it tidy” for instance.

Jared Spool has some great advice for [creating design principles](https://articles.uie.com/creating-design-principles/), and one of his tests stood out to us in particular:

> Is it Something You Might Reverse in a Future Release?

“Be useful” certainly fails that test!

We therefore set about refining our design principles and eventually ended up with the following insight: Gravity needed clearly articulated **goals**, **principles** and **guidelines**. Furthermore, there was a relationship between them:

![Goals, principles and guidelines pyramid](/images/articles/ibgds-08.png)
- Principles should help us achieve the goals.
- Guidelines should support or embody the principles.
- While goals are fairly broad and abstract, guidelines are quite specific and concrete. Principles are somewhere in the middle.

The more we thought about it, the more we realised that our principles could extend well beyond just the design aspects. They could and should influence how we maintain Gravity, how we approach technical aspects and more. We therefore dropped the “design” bit and now simply have Gravity’s *principles*.

<figure><img src="/images/articles/ibgds-09.jpg" alt="Members of the Gravity team discussing the revised principles"><figcaption>Members of the Gravity team discussing the revised principles</figcaption></figure>

This model helped us better organise our ideas and we ended up with:

### Goals:
- **Education** — Help Buildsters gain and refine experience of design systems
- **Living case study** — Continuously showcase Buildit’s design system expertise to clients and the wider Wipro organisation
- **Low maintenance** — We are not a product company. Therefore, funding for an in-house design system will always be a tough sell, so let’s make our lives as easy as we can
- **Consistent Buildit look and feel** — A basic raison d’être of any design system

### Principles:
- **Inclusive** — Everything about Gravity, from the UI designs and components it provides to the way in which it is run and maintained should strive to be inclusive. That means removing barriers to entry for using or contributing to Gravity itself. That also means enabling products to be accessible to the broadest possible audience.
- **Lean** — Less is often more. Whether it’s reducing waste while working on projects, writing terse code, designing focussed UIs or just avoiding fluffy language when communicating, leanness is something we value at Buildit. Gravity should embody and support that as much as possible.
- **Robust** — There is a lot we cannot control when it comes to digital products. We can’t decide what device, operating system, browser or settings people use when interacting with our products. Neither can we predict what the future might hold. And yet, the products we build need to embrace that uncertainty and handle all the diverse use-cases gracefully and reliably. Robustness is therefore an important principle for us to consider in everything we do for Gravity.
- **Considered** — Everything about Gravity — be it design, tech or process — should exist for a reason. We should always be able to explain why something is the way it is. Wherever possible we should use data and research to drive our decisions. Failing that we should tap the experience and know-how of relevant experts. Finally, if something does boil down to a subjective decision, then we should note that and be prepared to revise it later if new information allows us to make a more informed decision.
- **Progressive** — Gravity is an opportunity for us to constantly try new things. New design directions. New technologies. New approaches towards designing and building user interfaces. We should take full advantage of this and strive to be a leader rather than a follower on all fronts.

The work we have done to date mostly adheres to those principles. Some of the principles are a bit more aspirational right now. In any case, everyone who’s worked on Gravity is bought into these principles, so they are what we will follow from now on. That being said, as Jared Spool advocates, they are not set in stone forever — if the need arises, we will adapt and evolve our principles.

## Securing funding

Perhaps most importantly, with Buildit’s refreshed website now live, we need to find new ways to fund continued work on Gravity.

Some new internal web projects are being worked on and they have agreed to use and, where needed, contribute back to Gravity. However, we know that longer-term Gravity cannot be entirely dependent on the generosity of other projects. It needs its own funding.

To that end, we are beginning to raise awareness of Gravity and its benefits within our organisation (this very article is a part of that effort!). We are also exploring other approaches and means to get our work sponsored, including scaling Gravity to serve other parts of Wipro beyond just Buildit.

All going well, we will have plenty more stories to tell about Gravity in the future. Watch this space!