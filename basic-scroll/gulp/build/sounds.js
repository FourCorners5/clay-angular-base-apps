var gulp = require('gulp'),
    config = require('../../gulp.config'),
    del = require('del');

gulp.task('clean:sounds', function() {
    return del(config.build + config.appSounds);
});

gulp.task('sounds', ['clean:sounds'], function() {
    return gulp
        .src(config.src + config.appSounds + '**/*')
        .pipe(gulp.dest(config.build + config.appSounds));
});
