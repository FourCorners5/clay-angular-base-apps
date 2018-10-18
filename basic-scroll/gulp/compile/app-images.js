var gulp = require('gulp'),
    config = require('../../gulp.config'),
    imagemin = require('gulp-imagemin'),
    del = require('del');

gulp.task('clean:app-images', function() {
    return del(config.compile + config.appImages);
});

gulp.task('app-images', ['clean:app-images'], function() {
    return gulp
        .src(config.src + config.appImages + '**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(config.compile + config.appImages));
});
