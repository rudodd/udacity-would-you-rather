'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass')(require('node-sass'));
var concat = require('gulp-concat');

function compileSass() {
   return gulp.src('./src/scss/**/*.scss')
   .pipe(concat('app.scss'))
   .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest('./src/dist/css/'));
};

function watchSass() {
  gulp.watch('./src/scss/**/*.scss', compileSass);
};

gulp.task('sass', compileSass);
gulp.task('watch', watchSass);