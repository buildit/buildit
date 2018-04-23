const gulp = require("gulp");
const size = require("gulp-size");
const imagemin = require("gulp-imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const imageminSvgo = require("imagemin-svgo");

// config
const paths = require("../config.json").paths;

function imageOptim() {
  return gulp
    .src(paths.uncompressed.src)
    .pipe(
      imagemin([
        imageminMozjpeg({ quality: 85 }),
        imageminPngquant({ quality: "65-80" }),
        imageminSvgo({ plugins: [{ removeViewBox: false }] })
      ])
    )
    .pipe(gulp.dest(paths.uncompressed.dest));
}

// Copy all images
// If in PRODUCTION perform some magic
function images(done) {
  return gulp
    .src(paths.images.src, { dot: true })
    .pipe(gulp.dest(paths.images.dest))
    .pipe(size());
}

module.exports = {
  imageOptim,
  images
};
