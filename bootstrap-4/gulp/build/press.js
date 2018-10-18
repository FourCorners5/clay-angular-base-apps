var gulp = require('gulp'),
    config = require('../../gulp.config'),
    del = require('del');

gulp.task('clean:press', function() {
    return del(config.build + config.appPress);
});

gulp.task('press', ['clean:press'], function() {
    return gulp
        .src(config.src + config.appPress + '**/*')
        .pipe(gulp.dest(config.build + config.appPress));
});
