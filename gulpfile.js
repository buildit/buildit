const gulp = require('gulp');
const clean = require('gulp-clean');
const connect = require('gulp-connect');
const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
const watch = require('gulp-watch');
const open = require('gulp-open');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');

const src = 'src';
const target = 'dist';

// Web server
gulp.task('serve', () => {
  connect.server({
    root: target,
    livereload: true
  })
  gulp.src('').pipe(open({uri: 'http://localhost:8080'}));
});

// File watcher
gulp.task('watch', () => {
  gulp.watch([
    `${src}/**`,
    `!${src}/**/*.css`,
    `!${src}/**/*.js`,
    `!${src}/**/*.html`
    ], { ignoreInitial: false }, ['copy-assets']);
  gulp.watch([`${src}/js/*.js`], { ignoreInitial: false }, ['js']);
  gulp.watch([`${src}/**/*.css`], { ignoreInitial: false }, ['css']);
  gulp.watch([`${src}/**/*.html`], { ignoreInitial: false }, ['html']);
});

// Clean the output directory
gulp.task('clean', () => {
  return gulp.src(target, { read: false })
    .pipe(clean());
});

// Copy all assets except our JS and CSS
gulp.task('copy-assets', () => {
  return gulp.src([
      `${src}/**`,
      `!${src}/**/*.css`,
      `!${src}/**/*.js`,
      `!${src}/**/*.html`])
    .pipe(gulp.dest(target))
    .pipe(connect.reload());
});

// Bundle vendor JS
gulp.task('vendor', () => {
  const files = [
    'assets/library/jquery.min.js',
    'components/visibility.min.js',
    'components/transition.min.js'
  ];

  return gulp.src(files.map(item => `${src}/${item}`))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(target));
});

// Minify our JS
gulp.task('js', () => {
  return gulp.src(`${src}/js/*.js`)
    .pipe(uglify())
    .pipe(gulp.dest(`${target}/js`))
    .pipe(connect.reload());
});

// Build the CSS
gulp.task('css', () => {
  // Normally we shouldn't have to do this. For now we have to
  // as the CSS files need cleaning up and there seems to be an issue
  // with the order of inclusion.
  const files = [
    'reset.css',
    'site.css',
    'container.css',
    'grid.css',
    'header.css',
    'image.css',
    'menu.css',
    'divider.css',
    'dropdown.css',
    'segment.css',
    'button.css',
    'list.css',
    'icon.css',
    'transition.css'
  ];

  return gulp.src([
      ...(files.map(item => `${src}/components/${item}`)),
      `${src}/components/*-buildit.css`,
      `${src}/components/buildit.css`])
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest(target))
    .pipe(connect.reload());
});

// Process and minify HTML
gulp.task('html', function() {
  return gulp.src(`${src}/**/*.html`)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(target))
    .pipe(connect.reload());
});

gulp.task('build', ['copy-assets', 'vendor', 'js', 'css', 'html']);
gulp.task('default', ['build', 'serve', 'watch']);
