const lazypipe = require('lazypipe');
const gulpIf = require('gulp-if');
const filter = require('gulp-filter');
const clone = require('gulp-clone');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');

const envs = require('./envs.js');

const optimise = envs.shouldOptimise();

/**
 * Returns a lazypipe that, when intialised, will (optionally)
 * create WebP copies of JPGs and PNGs.
 *
 * If optimisations are turned on for the current environment, all
 * incoming images will additionally be run through imagemin to
 * compress them.
 */
module.exports = (createWebp = false) => {
  let imagePipe = lazypipe()
    .pipe(
      gulpIf,
      optimise,
      imagemin([
        imageminMozjpeg({ quality: 85 }),
        imageminPngquant({ quality: [0.65, 0.8] }),
        imageminSvgo({ plugins: [{ removeViewBox: false }] }),
      ]),
    );

  if (createWebp) {
    // Additionally generate WebP copies of the source
    // JPG and PNG images, before running them through
    // the usual optimisations
    const cloneSink = clone.sink();

    imagePipe = lazypipe()
      .pipe(() => cloneSink) // make a copy of input files
      .pipe(filter, '**/*.{jpg,jpeg,png,tif,tiff}')
      .pipe(webp, {
        quality: 65,
        autoFilter: optimise,
        method: optimise ? 6 : 4, // Higher value takes longer, but compresses better
      }) // convert suitable files to WebP
      .pipe(() => cloneSink.tap()) // add back copies of original input files
      .pipe(imagePipe); // Now optimise
  }


  return imagePipe();
};
