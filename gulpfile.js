const gulp = require('gulp');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const connect = require('gulp-connect');
const open = require('gulp-open');
const pug = require('gulp-pug');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const less = require('gulp-less');
const gulpIf = require('gulp-if');

const sourcemaps = require('gulp-sourcemaps');

const src = 'src';
const target = 'dist';

let PRODUCTION = false;

// Web server
gulp.task('serve', () => {
  connect.server({
    root: target,
    livereload: true
  });
  gulp.src('').pipe(open({ uri: 'http://localhost:8080' }));
});

// File watcher
gulp.task('watch', () => {
  gulp.watch([`${src}/**`, `!${src}/**/*.css`, `!${src}/**/*.js`, `!${src}/**/*.pug`], { ignoreInitial: false }, ['copy-assets']);
  gulp.watch([`${src}/**/*.pug`], { ignoreInitial: false }, ['compile-html']);
  gulp.watch([`${src}/js/*.js`], { ignoreInitial: false }, ['js']);
  gulp.watch([`${src}/**/*.less`], { ignoreInitial: false }, ['less']);
  gulp.watch([`${src}/**/*.css`], { ignoreInitial: false }, ['css']);
});

// Clean the output directory
gulp.task('clean', () => {
  return gulp.src(target, { read: false })
    .pipe(clean());
});

// Copy all assets except our JS, CSS and Pug templates
gulp.task('copy-assets', () => {
  return gulp.src([`${src}/**`, `!${src}/**/*.css`, `!${src}/**/*.js`, `!${src}/**/*.pug`, `!${src}/includes`, `!${src}/components`])
    .pipe(gulp.dest(target))
    .pipe(connect.reload());
});

// Compile HTML from Pug templates
gulp.task('compile-html', () => {
  return gulp.src([`${src}/**/*.pug`, `!${src}/layout.pug`, `!${src}/includes/**/*.pug`])
    .pipe(pug({}))
    .pipe(gulp.dest(`${target}`))
    .pipe(connect.reload());
});

// Bundle vendor JS
gulp.task('vendor', () => {
  const files = [
    'assets/library/jquery.min.js',
    'assets/library/promise.min.js',
    'assets/library/fetch.js',
    'components/visibility.min.js',
    'components/transition.min.js',
    'components/sidebar.min.js'
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
gulp.task('less', () => {
  return gulp.src('./src/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('./src/components/'));
});

gulp.task('css', ['less'], () => {
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
    'transition.css',
    'sidebar.css',
    'main.css'
  ];

  return gulp.src([
    ...(files.map(item => `${src}/components/${item}`)),
    `${src}/components/*-buildit.css`,
    `${src}/components/buildit.css`])
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest(target))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(target))
    .pipe(connect.reload());
});

gulp.task('build', ['copy-assets', 'compile-html', 'vendor', 'js', 'css']);
gulp.task('default', ['build', 'serve', 'watch']);
