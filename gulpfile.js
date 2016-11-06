'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const ejs = require("gulp-ejs");
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

//process sass
gulp.task('sass', function () {
  return gulp.src('./src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());

});

gulp.task('sass:watch', function () {
  gulp.watch('./src/css/*.scss', ['sass']);
});
//process images
gulp.task('image', function () {
  return gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('image:watch', function () {
  gulp.watch('./src/img/*', ['image', (done)=>{
    browserSync.reload();
    done();
  }]);
});

//process javascript
gulp.task('js', function () {
  return gulp.src('./src/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('js:watch', function () {
  gulp.watch('./src/js/*.js', ['js', (done)=>{
    browserSync.reload();
    done();
  }]);
});
//process fonts
gulp.task('fonts', function () {
  return gulp.src('./src/fonts/**')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('fonts:watch', function () {
  gulp.watch('./src/fonts/**', ['fonts', (done)=>{
    browserSync.reload();
    done();
  }]);
});


//process html
gulp.task('html', function () {
  return gulp.src('./src/*.ejs')
    .pipe(ejs({
      appData:require('./appdata.json')
    },{ext:'.html'}).on('error', gutil.log))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('html:watch', function () {
  gulp.watch('./src/*.ejs', ['html', (done)=>{
    browserSync.reload();
    done();
  }]);
});
//serve
gulp.task('serve', function () {
  browserSync.init({
    server: {
        baseDir: "./dist"
    }
  });
});

gulp.task('watch',['sass:watch','image:watch','js:watch','html:watch','fonts:watch'])
gulp.task('process',['sass','image','js','html','fonts'])
gulp.task('default',['process','watch'])
gulp.task('serve',['serve','process','watch'])

