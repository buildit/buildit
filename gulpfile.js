
// Gulp Config
// ===========
'use strict';

// REQUIRE
// -------
    var gulp    =   require('gulp'),
    browserSync = 	require('browser-sync').create(),

    // CSS
    csslint     =   require('gulp-csslint'),

    // JS
    concat      = 	require('gulp-concat'),
    uglify      = 	require('gulp-uglify'),
    sourcemaps  = 	require('gulp-sourcemaps'),
    jshint      =   require('gulp-jshint'),
    stylish     =   require('jshint-stylish'),

    // UTIL
    plumber     =   require('gulp-plumber'),
    bump        =   require('gulp-bump');

// OTHER PLUGINS
// -------------
// var connect = require('gulp-connect'); -- a simple web server


// ENVIRONMENT
// -----------
// To change the environment use: NODE_ENV=production gulp
// Sets the server environment to 'production' | 'development' (default)
var env = process.env.NODE_ENV || 'development';


// TASKS
// -----

// HTML
gulp.task('html', function(){
	return gulp.src('./src/*.html')
	.pipe(gulp.dest('./dist/'));
});


// CSS
// Lint task - note normalize ignored as this causes errors
gulp.task('css-lint', function() {
  gulp.src(['./src/components/*.css'])
  .pipe(plumber())
  .pipe(csslint())
  .pipe(csslint.reporter('compact'))
  .pipe(csslint.reporter('fail'));
});

// css-lint removed
gulp.task('css', function(){
	return gulp.src('./src/components/*.css')
    .pipe(plumber())
	.pipe(gulp.dest('./dist/components/'));
});


// JS
// LINT the JS
gulp.task('js-hint', function() {
  return gulp.src('./src/components/*.js')
  .pipe(plumber())
  .pipe(jshint())
  .pipe(jshint.reporter(stylish,{ verbose: true }))
  .pipe(jshint.reporter('fail'));
});


// Output JS files
gulp.task('js',['js-hint'], function() {

    // If environment is in 'development' (default) run source maps and do not minify
    // Else If environment is in 'production' concat and minify
    if(env === 'development'){

        return gulp.src('./src/components/*.js')
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/components'));

    } else if (env === 'production'){

        return gulp.src('./src/components/*.js')
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/components'));
    }

});

// Additional assets move
gulp.task('assets', function(){
	return gulp.src('./src/assets/**')
	.pipe(gulp.dest('./dist/assets'));
});

gulp.task('themes', function(){
	return gulp.src('./src/themes/**')
	.pipe(gulp.dest('./dist/themes'));
});


// Browser-sync watch
browserSync.watch("./dist/*.html").on("change", browserSync.reload);
browserSync.watch("./dist/components/*.css").on("change", browserSync.reload);
browserSync.watch("./dist/components/*.js").on("change", browserSync.reload);


// SERVE
gulp.task('serve', ['html','css', 'assets','themes'], function () {

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

});



// DEFAULT GULP TASK
gulp.task('default', [
	'serve'
    ]);
