module.export = (function () {
  var gulp = require('gulp');
  var less = require('gulp-less');
  var lint = require('gulp-jslint-simple');
  var concat = require('gulp-concat');

  var del = require('del');
  var jsLintOptions = {
    maxerr: 10000,
    unparam: true,
    white: true
  };

  gulp.task('styles:remove', function (cb) {
    del(['dist/css'], cb);
  });

  gulp.task('scripts:remove', function (cb){
    del(['dist/js'],cb);
  });

  gulp.task('styles', ['styles:remove'], function () {
    return gulp.src('./app/less/**/*.less')
      .pipe(less())
      .pipe(concat('style.css'))
      .pipe(gulp.dest('./dist/css/'));
    });

  gulp.task('lint', ['styles'], function () {
    return gulp.src('./app/js/**/*.js')
      .pipe(lint.run(jsLintOptions))
      .pipe(lint.report({
          reporter: require('jshint-stylish').reporter
      }));
  });

  gulp.task('default', ['lint', 'scripts:remove'], function () {
    return gulp.src('./app/js/*.js')
      .pipe(concat('gulp-example.js'))
      .pipe(gulp.dest('./dist/js/'));
  });

  return gulp;
})();
