const gulp = require('gulp');

const csso = require('gulp-csso');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass');
const size = require('gulp-size');
const header = require('gulp-header');
const run = require('gulp-run');

const critical = require('critical').stream;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');

// internal gulp plugins

// non-gulp plugins
const del = require('del');
const eyeglass = require('eyeglass');
const chalk = require('chalk');

// config
const gravityBldApi = require('@buildit/gravity-ui-web/build-api');
const scripts = require('./gulp/scripts');
const browserSync = require('./gulp/browsersync');
const favicons = require('./gulp/favicons');
const gulpConfig = require('./config/gulp.json');

// eslint-disable-next-line prefer-destructuring
const paths = gulpConfig.paths;
const envs = require('./gulp/envs.js');
const getBuildInfo = require('./gulp/get-build-info.js');

const optimise = envs.shouldOptimise();

// Output build and env info to aid with debugging
// - especially for Travis CI builds
function printProps(obj) {
  let output = '{\n';
  Object.keys(obj).forEach((key) => {
    output += `  ${chalk.cyan(key)}: ${chalk.magentaBright(obj[key])}\n`;
  });
  output += '}';
  return output;
}

function printBuildInfo() {
  return getBuildInfo().then((buildInfo) => {
    console.log(chalk`

{bold.whiteBright Environment config:}
${printProps(envs.getCurrentEnvInfo())}

{bold.whiteBright Optimisations:} ${
  optimise ? chalk.greenBright('ENABLED') : chalk.redBright('DISABLED')
}

{bold.whiteBright Build info:}
${printProps(buildInfo)}

`);
  });
}

const sassOptions = {
  eyeglass: {},
};

// Compile all required styles
function styles(done) {
  getBuildInfo().then((bldInfo) => {
    gulp
      .src(paths.styles.src)
      .pipe(sass(eyeglass(sassOptions)).on('error', sass.logError))
      .pipe(
        autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false,
        }),
      )
      .pipe(
        csso({
          restructure: optimise,
          debug: !optimise,
        }),
      )
      .pipe(header(`/* ${bldInfo.description} ${bldInfo.commitShortHash} */`))
      .pipe(gulp.dest(paths.styles.dest))
      .on('finish', () => {
        done();
      });
  });
}

// Copy Gravity's debug.css to output, if required by environment config
function copyDebugCss() {
  if (envs.getCurrentEnvInfo().debugCss) {
    return gulp
      .src(gravityBldApi.distPath(gravityBldApi.distCssDebugFilename))
      .pipe(gulp.dest(paths.styles.dest));
  }
  // Need to return a resolving promise so that this Gulp
  // task completes cleanly.
  return Promise.resolve();
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
  del(paths.dest);
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
          imageminPngquant({ quality: [0.65, 0.8] }),
          imageminSvgo({ plugins: [{ removeViewBox: false }] }),
        ]),
      ),
    )
    .pipe(gulp.dest(paths.images.dest));
}

function metalsmithBuild() {
  return run(`npx ./metalsmith.js --env ${envs.currentEnv}`).exec();
}

function watch(done) {
  gulp.watch(
    paths.scripts.modules,
    gulp.series(scripts.bundle, browserSync.reload),
  );
  gulp.watch(
    paths.styles.src,
    // eslint-disable-next-line no-use-before-define
    gulp.series(styles, criticalCss, browserSync.reloadCSS),
  );
  gulp.watch(paths.images.src, gulp.series(imageOptim, browserSync.reload));
  gulp.watch(paths.assets.src, gulp.series(assets, browserSync.reload));
  gulp.watch(
    [
      paths.pages.src,
      paths.layouts.src,
      paths.configs.src,
      paths.content.src,
      'metalsmith.js',
    ],
    gulp.series(
      'clean',
      metalsmithBuild,
      gulp.parallel(assets, imageOptim, styles, scripts.bundle),
      browserSync.reload,
    ),
  );
  gulp.watch(paths.favicons.src, favicons.generateFavicons);
  done();
}

function criticalCss() {
  return gulp
    .src('dist/**/*.html')
    .pipe(
      gulpIf(
        optimise,
        critical({
          base: 'dist/',
          inline: true,
          css: ['dist/styles/style.css'],
          ignore: ['@font-face', /url\(/],
        }),
      ),
    )
    .on('error', (err) => {
      console.error(err.message);
    })
    .pipe(gulp.dest('dist'));
}

gulp.task('clean', clean);

// registering main tasks
gulp.task(
  'build',

  gulp.series(
    'clean',
    printBuildInfo,
    metalsmithBuild,
    gulp.parallel(
      assets,
      imageOptim,
      styles,
      scripts.bundle,
      copyDebugCss,
      favicons.generateFavicons,
    ),
    criticalCss,
  ),
);

gulp.task('default', gulp.series('build', browserSync.initTask, watch));
