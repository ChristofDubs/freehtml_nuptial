// var gulp = require('gulp'),
//     gutil = require('gulp-util'),
//     sass = require('gulp-sass'),
//     connect = require('gulp-connect'),
//     uglify = require('gulp-uglify'),
//     concat = require('gulp-concat'),
//     rename = require('gulp-rename'),
//     order = require('gulp-order');

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const connect = require('gulp-connect');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const order = require('gulp-order');
const gutil = require('gulp-util');

// var jsSources = ['js/*.js'],
//     sassSources = ['sass/*.scss'],
//     htmlSources = ['**/*.html'],
//     outputCSSDir = 'css',
//     outputJSDir = 'js',
//     outputDir = 'dist';

const jsSources = ['js/*.js'];
const sassSources = ['sass/*.scss'];
const htmlSources = ['**/*.html'];
const outputCSSDir = 'css';
const outputJSDir = 'js';
const outputDir = 'dist';

// gulp.task('sass', function() {
//   gulp.src(sassSources)
//   .pipe(sass({outputStyle: 'expanded'}))
//     .on('error', gutil.log)
//   .pipe(gulp.dest(outputCSSDir))
//   .pipe(connect.reload())
// });

function sassTask() {
  return gulp.src(sassSources)
    .pipe(sass({ outputStyle: 'expanded' }).on('error', gutil.log))
    .pipe(gulp.dest(outputCSSDir))
    .pipe(connect.reload());
}

// gulp.task('js', function() {
// 	gulp
// 		.src(jsSources)
// 		.pipe(order([
// 			'js/jquery.min.js',
// 			'js/jquery.easing.1.3.js',
// 			'js/bootstrap.min.js',
// 			'js/jquery.waypoints.min.js',
// 			'js/sticky.js',
// 			'js/jquery.stellar.min.js',
// 			'js/hoverIntent.js',
// 			'js/superfish.js',
// 			'js/jquery.magnific-popup.min.js',
// 			'js/magnific-popup-options.js',
// 			'js/google_map.js',
// 			'js/main.js'
// 		], {base: './'}))
// 		.pipe(concat('scripts.js'))
// 		.pipe(gulp.dest(outputDir))
// 		.pipe(uglify({mangle: false}))
// 		.pipe(rename('scripts.min.js'))
// 		.pipe(gulp.dest(outputDir))
// 		.pipe(connect.reload())
// });

function jsTask() {
  return gulp.src(jsSources)
    .pipe(order([
      'js/jquery.min.js',
      'js/jquery.easing.1.3.js',
      'js/bootstrap.min.js',
      'js/jquery.waypoints.min.js',
      'js/sticky.js',
      'js/jquery.stellar.min.js',
      'js/hoverIntent.js',
      'js/superfish.js',
      'js/jquery.magnific-popup.min.js',
      'js/magnific-popup-options.js',
      'js/google_map.js',
      'js/main.js'
    ], { base: './' }))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(outputDir))
    .pipe(uglify({ mangle: false }))
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload());
}

// gulp.task('watch', function() {
//   gulp.watch(jsSources, ['js']);
//   gulp.watch(sassSources, ['sass']);
//   gulp.watch(htmlSources, ['html']);
// });

function watchTask() {
  gulp.watch(jsSources, jsTask);
  gulp.watch(sassSources, sassTask);
  gulp.watch(htmlSources, htmlTask);
}

// gulp.task('connect', function() {
//   connect.server({
//     root: '.',
//     livereload: true
//   })
// });

function connectTask() {
  connect.server({
    root: '.',
    livereload: true
  });
}

// gulp.task('html', function() {
//   gulp.src(htmlSources)
//   .pipe(connect.reload())
// });

function htmlTask() {
  return gulp.src(htmlSources)
    .pipe(connect.reload());
}

// gulp.task('default', ['html', 'js', 'sass', 'connect', 'watch']);

gulp.task('sass', sassTask);
gulp.task('js', jsTask);
gulp.task('watch', watchTask);
gulp.task('connect', connectTask);
gulp.task('html', htmlTask);

gulp.task('default', gulp.series('html', 'js', 'sass', 'connect', 'watch'));