'use strict';
var gulp    =   require('gulp'),
  browserSync = 	require('browser-sync').create(),
  // CSS
  csslint     =   require('gulp-csslint'),
  // JS
  watchify = require('watchify'),
  browserify = require('browserify'),
  concat      = 	require('gulp-concat'),
  uglify      = 	require('gulp-uglify'),
  sourcemaps  = 	require('gulp-sourcemaps'),
  jshint      =   require('gulp-jshint'),
  stylish     =   require('jshint-stylish'),
  // UTIL
  plumber     =   require('gulp-plumber'),
  bump        =   require('gulp-bump'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  gutil = require('gulp-util'),
  assign = require('lodash.assign'),
  del = require('del');


// ENVIRONMENT
// -----------
// To change the environment use: NODE_ENV=production gulp
// Sets the server environment to 'production' | 'development' (default)
var env = process.env.NODE_ENV || 'development';


// HTML
gulp.task('html', function(){
	return gulp.src('./src/*.html')
	.pipe(gulp.dest('./dist/'));
});


// CSS
gulp.task('css-lint', function() {
  gulp.src(['./src/components/*.css'])
  .pipe(plumber())
  .pipe(csslint())
  .pipe(csslint.reporter('compact'))
  .pipe(csslint.reporter('fail'));
});

//TODO css-lint removed, too many errors to debug
gulp.task('css', function(){
	return gulp.src('./src/components/*.css')
    .pipe(plumber())
	.pipe(gulp.dest('./dist/components/'));
});


// JS
gulp.task('js-hint', function() {
  return gulp.src('./src/js/**/*.js')
  .pipe(plumber())
  .pipe(jshint())
  .pipe(jshint.reporter(stylish,{ verbose: true }))
  .pipe(jshint.reporter('fail'));
});

// add custom browserify options here
var customOpts = {
  entries: ['./src/js/index.js'],
  debug: true,
  // shim: {
  //   jquery: {
  //     path: './node_modules/jquery/dist/jquery.js',
  //     exports: '$'
  //   }
  }
//
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));
//
// // add transformations here
// b.transform(['browserify-shim']);
//
gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal
//
function bundle() {
  return b.bundle()
  // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('./index.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'));
}

// Additional assets move
gulp.task('assets', function(){
	return gulp.src('./src/assets/**')
	.pipe(gulp.dest('./dist/assets'));
});

//Clean the build folder
/*gulp.task('clean', function () {
  console.log('-> Cleaning build folder');
  del([
    './dist/!**'
  ]);
});*/

gulp.task('themes', function(){
	return gulp.src('./src/themes/**')
	.pipe(gulp.dest('./dist/themes'));
});


// Browser-sync watch
browserSync.watch("./dist/*.html").on("change", browserSync.reload);
browserSync.watch("./dist/components/*.css").on("change", browserSync.reload);
browserSync.watch("./dist/components/*.js").on("change", browserSync.reload);


// SERVE
gulp.task('serve', ['html','css', 'assets','themes', 'js'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: './dist/',
        },
        port: 8000,
        ui : {
        	port:8080
        },
        //files: ['index.html','css/*.css','js/*.js']
    });

    // As these files are in a new folder the files option cannot pick up the changes,
    // thus we use gulp to detect the changes in the 'src' folder and then leave it to browserSync
    // to detect the changes in the 'dist' folder. Can use either files option or browserSync.watch.
    gulp.watch('./src/*.html',['html']);
    gulp.watch('./src/components/*.css',['css']);
    gulp.watch('./src/components/*.js',['js']);
    gulp.watch('./src/js/*.js',['js']);

});

gulp.task('build', ['html', 'css', 'assets', 'themes', 'js' ], () => {
  console.log('dist built!')
})

// DEFAULT GULP TASK
gulp.task('default', [
	'serve'
    ]);
