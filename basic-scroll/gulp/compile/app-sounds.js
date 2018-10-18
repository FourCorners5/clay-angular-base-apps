var gulp = require('gulp'),
    config = require('../../gulp.config'),
    del = require('del');

gulp.task('clean:app-sounds', function() {
    return del(config.compile + config.appSounds);
});

gulp.task('app-sounds', ['clean:app-sounds'], function() {
    return gulp
        .src(config.src + config.appSounds + '**/*')
        .pipe(gulp.dest(config.compile + config.appSounds));
});
