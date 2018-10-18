var gulp = require('gulp'),
    config = require('../../gulp.config'),
    browserSync = require('browser-sync'),
    serve = require('../serve');

gulp.task('serve-build', ['inject'], function () {
    serve(true /*isDev*/);
});
