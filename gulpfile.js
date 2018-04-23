const gulp = require("gulp");

const concat = require("gulp-concat");
const csso = require("gulp-csso");
const gulpIf = require("gulp-if");
const hash = require("gulp-hash");
const sass = require("gulp-sass");
const size = require("gulp-size");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");

// internal gulp plugins
const metalsmith = require("./gulp/metalsmith");
const browserSync = require("./gulp/browsersync");
const scripts = require("./gulp/scripts");

// non-gulp plugins
const del = require("del");
const eyeglass = require("eyeglass");

// config
const config = require("./config.json");
const paths = config.paths;

// Placeholder for the environment sniffing variable
const PRODUCTION = false;

const sassOptions = {
  eyeglass: {}
};

// Compile all required styles
// If in PRODUCTION perform some magic
function styles(done) {
  gulp
    .src(paths.styles.src)
    .pipe(sass(eyeglass(sassOptions)).on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(
      csso({
        restructure: PRODUCTION,
        debug: !PRODUCTION
      })
    )
    .pipe(gulp.dest(paths.styles.dest));
  done();
}

// Grab static assets (fonts, etc.) and move them to the build folder
// No file mangling should be done in this directory
function assets() {
  return gulp
    .src(paths.assets.src, { dot: true })
    .pipe(gulp.dest(paths.assets.dest))
    .pipe(size());
}

function clean(done) {
  del([`${paths.pages.dest}/**/*`]);
  done();
}

function watch(done) {
  gulp.watch(
    paths.scripts.modules,
    gulp.series(scripts.copyModules, scripts.bundle, browserSync.reload)
  );
  gulp.watch(paths.styles.src, gulp.series(styles, browserSync.reloadCSS));
  gulp.watch(
    paths.uncompressed.src,
    gulp.series(scripts.imageOptim, browserSync.reload)
  );
  gulp.watch(paths.assets.src, gulp.series(assets, browserSync.reload));
  gulp.watch(
    [paths.pages.src, paths.templates.src],
    gulp.series(metalsmith.build, browserSync.reload)
  );
  done();
}

// registering main tasks
gulp.task(
  "build",

  gulp.parallel(
    assets,
    scripts.imageOptim,
    styles,
    scripts.copyModules,
    scripts.bundle,
    metalsmith.build
  )
);

gulp.task("default", gulp.series("build", browserSync.initTask, watch));

gulp.task("clean", clean);

gulp.task("image-optim", scripts.imageOptim);
