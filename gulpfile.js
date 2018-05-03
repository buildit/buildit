const gulp = require("gulp");

const concat = require("gulp-concat");
const csso = require("gulp-csso");
const gulpIf = require("gulp-if");
const hash = require("gulp-hash");
const sass = require("gulp-sass");
const size = require("gulp-size");

const critical = require("critical").stream;
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const imageminSvgo = require("imagemin-svgo");

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
const envs = require("./gulp/envs.js");

// Placeholder for the environment sniffing variable
const PRODUCTION = false;

const optimise = envs.shouldOptimise();

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

function imageOptim() {
  return gulp
    .src(paths.images.src)
    .pipe(
      gulpIf(
        optimise,
        imagemin([
          imageminMozjpeg({ quality: 85 }),
          imageminPngquant({ quality: "65-80" }),
          imageminSvgo({ plugins: [{ removeViewBox: false }] })
        ])
      )
    )
    .pipe(gulp.dest(paths.images.dest));
}

function watch(done) {
  gulp.watch(
    paths.scripts.modules,
    gulp.series(scripts.bundle, browserSync.reload)
  );
  gulp.watch(
    paths.styles.src,
    gulp.series(styles, criticalCss, browserSync.reloadCSS)
  );
  gulp.watch(paths.images.src, gulp.series(imageOptim, browserSync.reload));
  gulp.watch(paths.assets.src, gulp.series(assets, browserSync.reload));
  gulp.watch(
    [paths.pages.src, paths.templates.src],
    gulp.series(metalsmith.build, criticalCss, browserSync.reload)
  );
  done();
}

function criticalCss() {
  return gulp
    .src("dist/**/*.html")
    .pipe(
      gulpIf(
        optimise,
        critical({
          base: "dist/",
          inline: true,
          css: ["dist/styles/style.css"],
          ignore: ["@font-face", /url\(/]
        })
      )
    )
    .on("error", function(err) {
      console.error(err.message);
    })
    .pipe(gulp.dest("dist"));
}

// registering main tasks
gulp.task(
  "build",

  gulp.series(
    gulp.parallel(assets, imageOptim, styles, scripts.bundle),
    metalsmith.build,
    criticalCss
  )
);

gulp.task("default", gulp.series("build", browserSync.initTask, watch));

gulp.task("clean", clean);
