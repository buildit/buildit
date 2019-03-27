const Metalsmith = require("metalsmith");
let ms = Metalsmith(__dirname);
const fsMetadata = require("metalsmith-fs-metadata");
const pathNoIndex = require("./lib/metalsmith-path-noindex");
const buildInfo = require("./lib/metalsmith-build-info");
const envInfo = require("./lib/metalsmith-env-info");
const collections = require("metalsmith-collections");
const frontmatterFileLoader = require("metalsmith-frontmatter-file-loader");
const frontmatterRenderer = require("metalsmith-frontmatter-renderer");
const inPlace = require("metalsmith-in-place");
const layouts = require("metalsmith-layouts");
const beautify = require("metalsmith-beautify");
const drafts = require("metalsmith-drafts");
const htmlMinifierOptimise = require("./lib/metalsmith-html-minifier-optimise");
const mapsiteCurrentenv = require("./lib/metalsmith-mapsite-currentenv");
const jobListings = require("./lib/metalsmith-job-listings");
const gravityPaths = require("@buildit/gravity-ui-web/build-api");
const fs = require("fs");

ms.source("./pages")
  .destination("./dist")
  .clean(false)
  .metadata({
    gravitySvgContents: fs.readFileSync(
      gravityPaths.distPath(gravityPaths.distSvgSymbolsFilename),
      "utf8"
    )
  })
  .use(
    fsMetadata({
      config: "./config/site.json"
    })
  )
  .use(buildInfo())
  .use(envInfo())
  .use(jobListings())
  .use(
    collections({
      colMainNav: {
        sortBy: (a, b) => {
          let aNum, bNum;

          aNum = Number(a["colMainNav-index"]);
          bNum = Number(b["colMainNav-index"]);

          // Test for NaN
          if (aNum != aNum && bNum != bNum) return 0;
          if (aNum != aNum) return 1;
          if (bNum != bNum) return -1;

          // Normal comparison, want lower numbers first
          if (aNum > bNum) return 1;
          if (bNum > aNum) return -1;
          return 0;
        }
      }
    })
  )
  .use(
    pathNoIndex()
  )
  .use(
    inPlace({
      suppressNoFilesError: true
    })
  )
  .use(
    frontmatterFileLoader({
      key: "blocks-md",
      suppressNoFilesError: true
    })
  )
  .use(
    frontmatterRenderer({
      key: "blocks-md",
      out: "blocks",
      suppressNoFilesError: true,
      options: {
        html: true
      }
    })
  )
  .use(
    frontmatterFileLoader({
      key: "blocks-njk",
      suppressNoFilesError: true
    })
  )
  .use(
    frontmatterRenderer({
      key: "blocks-njk",
      out: "blocks",
      ext: "njk",
      suppressNoFilesError: true
    })
  )
  .use(layouts())
  .use(
    beautify({
      preserve_newlines: false
    })
  )
  .use(drafts())
  .use(
    htmlMinifierOptimise({
      minifierOptions: {
        removeComments: false
      }
    })
  )
  .use(
    mapsiteCurrentenv({
      omitIndex: true
    })
  )
  .build(function(err) {
    if (err) throw err;
    console.log("Metalsmith build complete!");
  });
