// run metalsmith (static site generator)
const config = require("../config.json");
const paths = config.paths;
const envs = require("./envs.js");
const fs = require("fs");
const path = require("path");

const gulp = require("gulp");
const gulpsmith = require("gulpsmith");
const frontMatter = require("gulp-front-matter");
const filter = require("gulp-filter");
const assign = require("lodash.assign");
const handlebars = require("handlebars");
const handlebarsLayouts = require("handlebars-layouts");
const markdownHelper = require("helper-markdown");

const htmlMinifier = require("metalsmith-html-minifier");
const markdown = require("metalsmith-markdown");
const layouts = require("metalsmith-layouts");
const pageTitles = require("metalsmith-page-titles");
const permalinks = require("metalsmith-permalinks");
const sitemap = require("metalsmith-mapsite");
const debug = require("metalsmith-debug");
const discoverPartials = require("metalsmith-discover-partials");
const collections = require("metalsmith-collections");
const drafts = require("metalsmith-drafts");
const gravityAssets = require("./gravity-assets.js");
const jobListings = require("./metalsmith-job-listings.js");
const flourishShapes = require("../src/flourishes/shapes.json");

const presentationSvgTemplate = fs.readFileSync(
  path.join(
    "./",
    paths.templates.src,
    paths.templates.partials,
    "presentation-svg.hbs"
  ),
  "UTF-8"
);
const flourishTemplate = handlebars.compile(presentationSvgTemplate);

function metalsmith() {
  // config for the site environment we're building
  const siteEnv = envs.getCurrentEnvInfo();
  console.log("Current env:\n", siteEnv);

  // filter out files with front matter
  const fmFilter = filter("**/*.{html,md,txt}", { restore: true });

  // register Handlebars helpers
  handlebars.registerHelper("moment", require("helper-moment"));
  handlebars.registerHelper(handlebarsLayouts(handlebars));
  handlebars.registerHelper("markdown", markdownHelper);
  handlebars.registerHelper("compare", function(a, b, options) {
    if (a !== b) {
      return options.fn(this);
    }
    return null;
  });
  handlebars.registerHelper("flourishShapes", function(name) {
    const template = flourishTemplate(flourishShapes[name]);
    return new handlebars.SafeString(template);
  });

  // register special partials
  gravityAssets.registerSvgSymbolsAsPartial(handlebars);

  return (
    gulp
      .src(paths.pages.src)
      .pipe(fmFilter)
      // grab files with front matter and assign them as a property so metalsmith will find it
      .pipe(
        frontMatter({
          property: "frontMatter"
        })
      )
      .on("data", function(file) {
        assign(file, file.frontMatter);
        delete file.frontMatter;
      })
      // remove the filter (back to everything in /src) and let metalsmith do its thing
      .pipe(fmFilter.restore)
      .pipe(
        gulpsmith()
          .metadata({
            site: {
              title: config.title,
              url: siteEnv.url
            },
            build: {
              excludeRobots: siteEnv.excludeRobots
            },

            // Defaults for Twitter card meta tags
            // (See: https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started)
            twitterCard: "summary",
            twitterSite: "@Buildit_tech",

            // Defaults for OpenGraph Protocol (OGP) meta tags
            // (See: http://ogp.me/)
            ogType: "website",
            ogImage: "builidt-default-sharing-img.png",
            ogImageAlt: "buildit @ wipro digital"
          })
          .use(jobListings())
          .use(
            collections({
              locations: `locations/*.md`
            })
          )
          .use(drafts())
          .use(pageTitles())
          .use(markdown())
          .use(
            permalinks({
              pattern: ":page-url",
              relative: false
            })
          )
          .use(
            discoverPartials({
              directory: `${paths.templates.src}${paths.templates.partials}`
            })
          )
          .use(
            layouts({
              directory: `${paths.templates.src}`
            })
          )
          .use(
            sitemap({
              hostname: siteEnv.url,
              omitIndex: true
            })
          )
          .use(htmlMinifier())
          .use(debug())
      )
      .pipe(gulp.dest(paths.pages.dest))
  );
}

module.exports = {
  build: metalsmith
};
