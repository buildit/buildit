const { Readable } = require('stream');
const Vinyl = require('vinyl');
const gulp = require('gulp');
const favicons = require('favicons');
const jsonEditor = require('gulp-json-editor');
const rename = require('gulp-rename');
const filter = require('gulp-filter');
const gravityParticles = require('@buildit/gravity-particles');

const optimiseImages = require('./image-optim-pipe');
const gulpConfig = require('../config/gulp.json');
const siteConfig = require('../config/site.json').site;

const { paths } = gulpConfig;


class FaviconSourceStream extends Readable {
  constructor(sourceFiles, config) {
    super({
      objectMode: true,
    });

    this._reading = false;
    this._sourceFiles = sourceFiles;
    this._config = config;
  }

  async _nextFavicons() {
    if (!this._favicons) {
      try {
        // Run Favicons directly (so that we pass in an array of multiple
        // images, which is not supported by gulp-favicons)
        const { images, files } = await favicons(
          this._sourceFiles,
          this._config,
        );

        this._favicons = images.concat(files).map(file => new Vinyl({
          path: file.name,
          contents: Buffer.isBuffer(file.contents)
            ? file.contents
            : Buffer.from(file.contents),
        }));
      } catch (err) {
        this.destroy(err);
      }
    }

    if (this._favicons.length === 0) {
      // We've pushed all icons to the stream
      this.push(null);
    } else if (this.push(this._favicons.pop())) {
      this._nextFavicons();
    } else {
      this._reading = false;
    }
  }

  _read() {
    if (!this._reading) {
      this._reading = true;
      this._nextFavicons();
    }
  }
}


function generateFavicons() {
  const manifestFilter = filter('manifest.json', { restore: true });

  // We don't need Apple touch icons in a bazillion sizes.
  // (See: https://webhint.io/docs/user-guide/hints/hint-apple-touch-icons
  // for the rationale why)
  // Sadly, the favicon generator can't be configured not to
  // generate all possible sizes, but we can at least omit the
  // ones we don't need using this filter.
  const redundantIconFilter = filter(['**', '!apple-touch-icon-*']);

  return new FaviconSourceStream(
    paths.favicons.src,
    {
      appName: siteConfig.title,
      appShortName: siteConfig.shortTitle,
      appDescription: siteConfig.description,
      lang: siteConfig.lang,
      background: gravityParticles.colorSchemes.tealWhite.groupB.accent,
      theme_color: gravityParticles.colorSchemes.tealWhite.groupB.accent,
      display: 'browser',
      start_url: '/',
      // logging: true,
      icons: {
        appleStartup: false,
        coast: false,
        firefox: false,
        yandex: false,
      },
    },
  )
    // Rename and alter the web manifest
    .pipe(manifestFilter)
    .pipe(rename('site.webmanifest'))
    .pipe(jsonEditor({
      background_color: gravityParticles.colorSchemes.tealWhite.groupA.neutral,
    }))
    .pipe(manifestFilter.restore)
    // end of web manifest specific steps
    .pipe(redundantIconFilter)
    .pipe(optimiseImages())
    .pipe(gulp.dest(paths.favicons.dest));
}

module.exports = {
  generateFavicons,
};
