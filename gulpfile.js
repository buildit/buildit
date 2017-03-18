const gulp = require('gulp');
const clean = require('gulp-clean');
const gulpCopy = require('gulp-copy');
const connect = require('gulp-connect');
const watch = require('gulp-watch');

const src = 'src';
const target = 'dist';

gulp.task('serve', () => {
  connect.server({
    root: target,
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch([`${src}/**`], ['build']);
});

gulp.task('clean', () => {
  return gulp.src(target, {read: false})
    .pipe(clean());
});

// Copy everything except CSS
gulp.task('copy-files', () => {
  return gulp.src([`${src}/**`, `!${src}/**/*.css`])
    .pipe(gulp.dest(target));
});

gulp.task('css', () => {
  return gulp.src([`${src}/**/*css`])
    .pipe(gulp.dest(target));
});

gulp.task('build', ['copy-files', 'css']);
gulp.task('default', ['serve', 'watch']);
