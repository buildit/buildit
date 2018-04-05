const gulp = require('gulp');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const paths = require('../config.json').paths;


function copyModules () {
  return gulp.src(paths.scripts.modules)
    .pipe(gulp.dest(paths.scripts.dest));
}

function bundle () {
  return gulp.src(paths.scripts.main)
    .pipe(sourcemaps.init())
    .pipe(rollup({
      plugins: [babel()]
    }, {
      format: 'umd'
    }))
    .pipe(rename('bundle.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest));
}

module.exports = {
  bundle,
  copyModules
};
