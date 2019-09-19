const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');

const envs = require('./envs.js');

const optimise = envs.shouldOptimise();

module.exports = () => gulpIf(
  optimise,
  imagemin([
    imageminMozjpeg({ quality: 85 }),
    imageminPngquant({ quality: [0.65, 0.8] }),
    imageminSvgo({ plugins: [{ removeViewBox: false }] }),
  ]),
);
