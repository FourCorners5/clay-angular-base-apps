(function () {
    'use strict';

    var nodemon = require('gulp-nodemon'),
        gulp = require('gulp'),
        config = require('../gulp.config'),
        cache = require('gulp-cached'),
        browserSync = require('browser-sync').create('app-server'),
        port = process.env.PORT || 7203;

    function startBrowerSync () {
        if (browserSync.active) {
            return;
        }

        browserSync.init({
            proxy: 'localhost:' + port,
            port: 3000,
            ghostMode: {
                clicks: true,
                forms: true,
                scroll: true
            },
            injectChanges: true,
            logFileChanges: true,
            logPrefix: 'Prograde App'
        });
    }

    module.exports = function (isDev) {
        if (isDev) {
            gulp.watch([].concat(
                config.src + '**/*.html',
                config.components.templates
            ))
                .on('change', browserSync.reload);
            gulp.watch([].concat(
                config.scripts,
                config.components.scripts
            ), ['rebuild-scripts'])
                .on('change', browserSync.reload);
            gulp.watch([].concat(
                config.styles,
                config.components.styles.less,
                config.components.styles.css
            ), ['styles']);
        }
        return nodemon ({
            script: './server.js',
            delayTime: 1,
            env: {
                'PORT': port,
                'NODE_ENV': isDev ? 'dev' : 'production'
            },
            watch: ['./server.js']
        })
            .on('start', function () {
                console.log('**** Node Server Started! ****');
                startBrowerSync();
            })
            .on('restart', ['vet'], function (env) {
                console.log('**** Node Server Restarted. ****');
                console.log('**** Files Changed on Restart: ****\n' + env);
                console.log('Files Changed:\n' + env);
                setTimeout(function () {
                    browserSync.notify('**** Reloading ****');
                    browserSync.reload({ stream: false });
                }, 1000);
            })
            .on('crash', function () {
                delete cache.caches['jsscripts'];
                console.log('**** Node Server Crashed! ****');
            })
            .on('exit', function () {
                delete cache.caches['jsscripts'];
                console.log('**** Node Server Exited. ****');
            });
    };

}());
