# Build process

The Buildit website uses [Gulp](https://gulpjs.com/) to perform builds. This document explains in more detail what the main tasks do.

**Note:** We consider our use of Gulp an implementation detail of our build process. The recommended command for performing builds is therefore `npm run-script build` (or `npm start` for local development), rather than invoking Gulp directly. Starting builds this way also eliminates the need to have Gulp installed globally on your system.

## Overview
![Block diagram showing the main build scripts, what source files the consume and what output they produce](./website-build-overview.png)

## Metalsmith
_See: [`gulp/metalsmith.js`](../gulp/metalsmith.js)_

We use [Metalsmith](http://www.metalsmith.io/) (via [`gulpsmith`](https://github.com/pjeby/gulpsmith)) to generate our website's HTML pages and some auxilliary files like `sitemap.xml` and `robots.txt`. In broad strokes, this works as follows:

1. All [markdown files](https://daringfireball.net/projects/markdown/syntax) and text files in the `pages/` directory are read in and passed into the pipeline one by one.
1. If the files contain [YAML frontmatter](https://www.npmjs.com/package/front-matter), it is extracted and added to the metadata fields used by Metalsmith
    * The value of the **`layout` field** in the YAML data is expected to be the filename of the [Handlebars template](https://handlebarsjs.com/) (within the `templates/` folder) that should be used to render this page
1. The per-file YAML data is combined with data from a number of Metalsmith plug-ins:
    * Some global metadata about the site, added as the **`site`, `build`, `twitter*` and `og*` fields**
    * A custom plug-in that uses [Buildit's `job-listing library`](https://github.com/buildit/job-listings) to fetch our job ads from [SmartRecruiters](https://www.smartrecruiters.com/), group them by location and make the results available via the **`jobLocations` field**.
    * The [`metalsmith-collections` plug-in](https://github.com/segmentio/metalsmith-collections) to create the **`collections.locations` field** from all the files within `pages/locations`.
    * The [`metalsmith-page-titles`](https://github.com/hellatan/metalsmith-page-titles), which creates the **`pageTitle` field** that is a combination of the page's `title` and the website's title (e.g. "Careers | buildit @ wipro digital")
1. For markdown files, their contents are converted to HTML (which is placed into the **`contents` field**).
1. Finally, the Handlebars template (specified via the `layout` field) is rendered using all the fields as its context data.
    * For example, to render the `pageTitle` field within a template you can use `{{ pageTitle }}`.
    * In effect, this means that all fields that were in a markdown file's YAML frontmatter are available in the corresponding Handlebars template.
1. The output is written to the `dist/` folder.
  

## SASS compilation
_See: [`gulpfile.js`](../gulpfile.js)_

The majority of the website's CSS is imported from [`gravity-ui-sass`](https://github.com/buildit/gravity-ui-sass), the SASS UI library from Buildit's Gravity design system. However, the website does layer on a few of its own, unique components like the flourishes. Rather than use Gravity's pre-compiled CSS file, we therefore import it into the website's own SASS file (`src/sass/style.scss`) and compile from there.

The build also optimises the final CSS output via [CSSO](https://github.com/css/csso). Finally, we use [Critical](https://www.npmjs.com/package/critical) to inline any critical CSS into the HTML pages to improve perceived page load speed.


## JS bundling
_See: [`gulp/scripts.js`](../gulp/scripts.js)_

All site-specific JavaScript (e.g. for hero animation) is written as ES6-style modules in `src/scripts/`. We use [rollup.js](https://rollupjs.org/guide/en) and its [Babel](https://babeljs.io/) plug-in to transpile and bundle the source JS modules into a single [UMD](https://github.com/umdjs/umd) bundle that can be served to web browsers.

**Note:** Some of our JavaScript has dependencies on 3rd party libraries. Currently, these are not embedded into our bundle, so we load CDN-hosted versions of those scripts directly from our HTML.


## Image optimisation
_See: [`gulpfile.js`](../gulpfile.js)_

Any source JPEG, PNG and SVG image files located in `static/images/` are optimised via [`imagemin`](https://github.com/imagemin/imagemin) with three different libraries, one for each file type: `moz-jpeg`, `pngquant` and `svgo`. The compressed images are then written to the `dist/images/` output directory.

**Note:** GIF files are not further optimised. They get copied to the build ouptut as-is, along with non-image assets.


## Asset copying
_See: [`gulpfile.js`](../gulpfile.js)_

Any files under `static/` (except for JPEG, PNG and SVG files in `static/images/`) are copied as-is to the build output directory, `dist/`.
