// run metalsmith (static site generator)
const config = require("../config.json");
const paths = config.paths;

const gulp = require("gulp");
const gulpsmith = require("gulpsmith");
const frontMatter = require("gulp-front-matter");
const filter = require("gulp-filter");
const assign = require("lodash.assign");
const handlebars = require("handlebars");
const handlebarsLayouts = require("handlebars-layouts");

const htmlMinifier = require("metalsmith-html-minifier");
const markdown = require("metalsmith-markdown");
const layouts = require("metalsmith-layouts");
const pageTitles = require("metalsmith-page-titles");
const permalinks = require("metalsmith-permalinks");
const sitemap = require("metalsmith-mapsite");
const debug = require("metalsmith-debug");
const discoverPartials = require("metalsmith-discover-partials");

const gravityAssets = require("./gravity-assets.js");

function metalsmith() {
  // filter out files with front matter
  const fmFilter = filter("**/*.{html,md,htb}", { restore: true });

  // register Handlebars helpers
  handlebars.registerHelper("moment", require("helper-moment"));
  handlebars.registerHelper(handlebarsLayouts(handlebars));

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
              title: config.title
            }
          })
          .use(pageTitles())
          .use(markdown())
          .use(permalinks(":page-url"))
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
              hostname: `https:${config.URL}`,
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
