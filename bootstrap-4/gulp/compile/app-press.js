var gulp = require('gulp'),
    config = require('../../gulp.config'),
    del = require('del');

gulp.task('clean:app-press', function() {
    return del(config.compile + config.appPress);
});

gulp.task('app-press', ['clean:app-press'], function() {
    return gulp
        .src(config.src + config.appPress + '**/*')
        .pipe(gulp.dest(config.compile + config.appPress));
});
