const gulp = require('gulp');
const favicons = require('gulp-favicons');
const jsonEditor = require('gulp-json-editor');
const rename = require('gulp-rename');
const filter = require('gulp-filter');
const gravityParticles = require('@buildit/gravity-particles');

const gulpConfig = require('../config/gulp.json');
const siteConfig = require('../config/site.json').site;

// eslint-disable-next-line prefer-destructuring
const paths = gulpConfig.paths;

function generateFavicons() {
  const manifestFilter = filter('manifest.json', { restore: true });

  // We don't need Apple touch icons in a bazillion sizes.
  // (See: https://webhint.io/docs/user-guide/hints/hint-apple-touch-icons
  // for the rationale why)
  // Sadly, the favicon generator can't be configured not to
  // generate all possible sizes, but we can at least omit the
  // ones we don't need using this filter.
  const redundantIconFilter = filter(['**', '!apple-touch-icon-*']);

  return gulp.src(paths.favicons.src)
    .pipe(favicons({
      appName: siteConfig.title,
      appShortName: siteConfig.shortTitle,
      appDescription: siteConfig.description,
      lang: siteConfig.lang,
      background: gravityParticles.colorSchemes.tealWhite.groupB.accent,
      theme_color: gravityParticles.colorSchemes.tealWhite.groupB.accent,
      display: 'browser',
      start_url: '/',
      icons: {
        appleStartup: false,
        coast: false,
        firefox: false,
        yandex: false,
      },
    }))
    // Rename and alter the web manifest
    .pipe(manifestFilter)
    .pipe(rename('site.webmanifest'))
    .pipe(jsonEditor({
      background_color: gravityParticles.colorSchemes.tealWhite.groupA.neutral,
    }))
    .pipe(manifestFilter.restore)
    // end of web manifest specific steps
    .pipe(redundantIconFilter)
    .pipe(gulp.dest(paths.favicons.dest));
}

module.exports = {
  generateFavicons,
};
