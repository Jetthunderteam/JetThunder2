(function () {
    "use strict";

    /** Variables */
    var gulp = require('gulp');
    var connect = require('gulp-connect');
    var config = loadGulpConfiguration();
    var plumber = require('gulp-plumber');
    var rename = require('gulp-rename');
    var autoprefixer = require('gulp-autoprefixer');
    var del = require('del');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var imagemin = require('gulp-imagemin');
    var cache = require('gulp-cache');
    var minifycss = require('gulp-minify-css');
    var sass = require('gulp-sass');
    var modernizr = require('gulp-modernizr');
    var removeCode = require('gulp-remove-code');
    var inject = require('gulp-inject');
    var launchSequence = require('run-sequence');
    var browserSync = require('browser-sync');
    var baseDir = 'app/';
    var appDir = 'dist/';
    var images = [baseDir+'images/**/*.{gif,jpg,png,svg,ico}'];

    /** Loads the Gulp Config from the main application folder */
    function loadGulpConfiguration() {
        return require('./gulpfile.config.js')();
    }

    /*************************
     Development
     **************************/

    /** Browser Sync */
    gulp.task('browser-sync', function () {
        browserSync({
            server: {
                baseDir: "./"
            },
            browser: "Chrome"
        });
    });

    /** Browser Sync Reload */
    gulp.task('bs-reload', function () {
        browserSync.reload();
    });

    /** Compile SCSS */
    gulp.task('styles-dev', function () {
        gulp.src(config.appSCSS)
            .pipe(plumber({
                errorHandler: function (error) {
                    console.log(error.message);
                    this.emit('end');
                }
            }))
            .pipe(sass())
            .pipe(autoprefixer('last 2 versions'))
            .pipe(gulp.dest('app/styles/'))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest('app/styles/'))
            .pipe(browserSync.reload({stream: true}));
    });

    /** Create Modernizr file */
    gulp.task('modernizr', function () {
        gulp.src(config.appSCSS, config.appJS)
            .pipe(modernizr('modernizr-custom.js'))
            .pipe(gulp.dest('app/scripts'));
    });

    /** Build Dev Application */
    gulp.task('build-dev', function (callback) {
        launchSequence(['styles-dev'], 'modernizr', callback);
    });

    /** Launch Dev */
    gulp.task('launch-dev', ['browser-sync'], function () {
        gulp.watch("app/styles/**/*.scss", ['styles-dev']);
        gulp.watch("app/scripts/**/*.js", ['scripts']);
        gulp.watch("*.html", ['bs-reload']);
    });

    /*************************
     Production
     **************************/

    /** Copy JS Bower files */
    gulp.task('bowerJazz', function () {
        return gulp.src(config.dependantJS)
            .pipe(concat('dependencies.js'))
            .pipe(gulp.dest(appDir + '/bower_components'));
    });
    /** Copy CSS Bower files */
    gulp.task('bowerStyle', function () {
        return gulp.src(config.dependentCSS)
            .pipe(concat('dependencies.css'))
            .pipe(gulp.dest(appDir + 'bower_components'));
    });

    /** Copy Images to Dist */
    gulp.task('images', function () {
        gulp.src(config.appImages)
            .pipe(imagemin)
            .pipe(gulp.dest(appDir + 'images'));
    });

    /** Copy Styles to Dist */
    gulp.task('styles', function () {
        gulp.src(config.appSCSS)
            .pipe(plumber({
                errorHandler: function (error) {
                    console.log(error.message);
                    this.emit('end');
                }
            }))
            .pipe(sass())
            .pipe(autoprefixer('last 2 versions'))
            .pipe(gulp.dest(appDir + 'styles/'))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest(appDir + 'styles/'));
    });

    /** Copy Scripts to dist */
    gulp.task('scripts', function () {
        return gulp.src(config.appJS)
            .pipe(plumber({
                errorHandler: function (error) {
                    console.log(error.message);
                    this.emit('end');
                }
            }))
            .pipe(concat('main.js'))
            .pipe(gulp.dest(appDir + 'scripts/'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest(appDir + 'scripts/'))
            .pipe(browserSync.reload({stream: true}));
    });

    /** Copy HTML to dist */
    gulp.task('html-components', function () {
        return gulp.src('app/components/**/*.html')
            .pipe(gulp.dest(appDir + 'components'))
    });

    gulp.task('html-index', function () {
        return gulp.src('app/*.html')
            .pipe(removeCode({production: true}))
            .pipe(inject(gulp.src(['dist/bower_components/*.js', 'dist/scripts/*.min.js', 'dist/bower_components/*.css', 'dist/styles/*.min.css'], {read: false}), {relative: true}))
            .pipe(gulp.dest(appDir + ''))
    });

    /** Cleanup dist folder */
    gulp.task('clean', function () {
        return del(appDir);
    });

    /** Build Dist Application */
    gulp.task('build', function (callback) {
        launchSequence(['bowerJazz', 'bowerStyle', 'scripts', 'styles'], 'html-components', 'html-index', callback);
    });


    /** Launch Dist */
    gulp.task('launch', function () {
        connect.server({
            root: 'dist/',
            port: 7001,
            livereload: true
        });
    });
})();