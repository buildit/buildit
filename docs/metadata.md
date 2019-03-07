# Metadata

The Buildit website embeds rich meta data in its HTML. This helps search engine bots, social media networks and other tools better understand and surface our content. For example:

* When sharing one of our pages, Facebook, Twitter, Slack and others will display a little card with an image, title and short description.
* When people search for Buildit on Google and other search engines, they _may_ display info cards about the Buildit organisation, its studios and jobs alongside the normal search results.

The rest of this page explains in more detail the relevant standards that we make use of.

## Standard HTML meta tags
The HTML5 spec defines a number of [standard metadata names](https://www.w3.org/TR/2018/SPSD-html5-20180327/document-metadata.html#standard-metadata-names). Currently we only use `description` and `robots`, both of which are broadly supported by search engines. We intentionally do not use `keywords` as [search engines ignore now it](https://yoast.com/meta-keywords/).

## OpenGraph Protocol
All our pages contain [OpenGraph Protocol](http://ogp.me/) (OGP) meta properties within their `<head>` element. Refer to the [`templates/partials/head.hbs` template](../templates/partials/head.hbs) for details.

OGP was originally defined by Facebook and so, obviously, this meta data is used when pages are shared on Facebook. Google, Twitter, Pinterest and others also make use of this data to display rich cards in users' feeds.

Note, even though OGP is sort of based on the [W3C's RDFa standard](https://www.w3.org/TR/rdfa-primer/), only a subset of that spec is supported by services that consume OGP data. Unless the OGP data in in `<meta>` tags within the `<head>`, they will be ignored. It's a pity, but c'est la vie.

## Twitter Cards
Twitter have defined a number of special `<meta>` names in their [Twitter Cards spec](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards.html). For the most part it overlaps with what OGP can do. Thankfully, Twitter will [fall back on certain OGP properties if the equivalent Twitter Card values are not present](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup). In order to avoid redundant repetition of metadata, we therefore only add Twitter Card `<meta>` tags for relevant data that is not already covered by our OGP tags. Refer to the [`templates/partials/head.hbs` template](../templates/partials/head.hbs) for details.

## Schema.org RDFa
[Schema.org](https://schema.org/) is a popular [vocabulary](https://www.w3.org/standards/semanticweb/ontology) for structured metadata. It can be serialised as [HTML5 microdata](https://www.w3.org/TR/microdata/), [RDFa](https://www.w3.org/TR/rdfa-primer/) and/or [JSON-LD](https://json-ld.org/). Major search engines consume this metadata and use it in a variety of ways. For example, [Google's Knowledge Graph sources some of its data from structured metadata on the web](https://yoast.com/google-knowledge-graph/) and that data in turn powers things like cards on search results pages and the answers that Google Assistant can give.

We therefore use Schema.org expressed as RDFa attributes to embed some extra metadata into our page's HTML markup. Examples are:

* In the header & footed Buildit is marked up as a [`schema:Organization`](https://schema.org/Organization) resource.
* Each studio on the locations page has been marked up as a [`schema:Place`](https://schema.org/Place) resource.
* Each job posting on the careers page has been marked up as a [`schema:JobPosting`](https://schema.org/JobPosting).

We chose RDFa because:

* [RDFa is more feature-rich than microdata](http://manu.sporny.org/2012/mythical-differences/). It is also [more widely used](http://events.linkeddata.org/ldow2012/papers/ldow2012-inv-paper-1.pdf) and the spec is more mature. So, between those two the choice was clear: **RDFa**.
* Even though [Google seems to prefer JSON-LD these days](https://developers.google.com/search/docs/guides/sd-policies), they still support RDFa and microdata. JSON-LD is more akin to classic `<meta>` tags - i.e. a blob of structured metadata that doesn't necessarily match content on the page that is visible to users. RDFa on the other hand lets you _augment_ and/or _reuse_ your existing page content and make it machine-friendly. Given our desire to keep things lean and DRY, RDFa felt like a better fit.
    * Note that JSON-LD and RDFa can technically co-exist. So, if we find ourselves adding substantial amounts of "hidden" metadata, it might be better expressed as JSON-LD than RDFa properties in `<meta>` and `<link>` tags.


## What about Microformats?
Old hands may recall [Microformats](http://microformats.org/) (not to be confused with micro-_data_!) - yet another way of embelishing your HTML content with some machine-readable structure. While there are still a number of tools that use it, the community does not seem to e very active these days. Since it doesn't really let us do anything we can't already do via RDFa, there's no point supporting it as well.
