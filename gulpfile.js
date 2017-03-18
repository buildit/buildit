const gulp = require('gulp');
const clean = require('gulp-clean');
const gulpCopy = require('gulp-copy');
const src = 'src';
const target = 'dist';

gulp.task('clean', () => {
  return gulp.src(target, {read: false})
          .pipe(clean());
});

gulp.task('html', () => {
  return gulp.src([`${src}/**`, `!${src}/**/*.css`])
    .pipe(gulp.dest(target));
});

gulp.task('css', () => {
  return gulp.src([`${src}/**/*css`])
    .pipe(gulp.dest(target));
});

gulp.task('default', ['clean', 'build']);
gulp.task('build', ['html', 'css']);
