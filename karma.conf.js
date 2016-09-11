module.exports = function (config) {
    var app = 'app/';
    var tests = 'tests/';
    var bowerComponents = app + 'bower_components/';

    config.set({

        basePath: '.',

        plugins: [
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-coverage',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor',
            'karma-ng-json2js-preprocessor',
            'karma-phantomjs-launcher',
            'karma-requirejs'
        ],

        files: [
            bowerComponents + 'jquery/dist/jquery.js',
            bowerComponents + 'angular/angular.js',
            bowerComponents + 'angular-ui-router/release/angular-ui-router.min.js',
            bowerComponents + 'angular-mocks/angular-mocks.js',
            bowerComponents + 'angular-animate/angular-animate.min.js',
            bowerComponents + 'angular-aria/angular-aria.min.js',
            bowerComponents + 'angular-sanitize/angular-sanitize.min.js',
            bowerComponents + 'angular-messages/angular-messages.min.js',
            bowerComponents + 'angular-material/angular-material.min.js',
            bowerComponents + 'tether/dist/js/tether.min.js',
            bowerComponents + 'angular-bootstrap/ui-bootstrap-tpls.min.js',
            bowerComponents + 'moment/min/moment.min.js',
            bowerComponents + 'firebase/firebase.js',
            bowerComponents + 'angularfire/dist/angularfire.min.js',
            bowerComponents + 'masonry/dist/masonry.pkgd.min.js',
            bowerComponents + 'imagesloaded/imagesloaded.pkgd.min.js',
            bowerComponents + 'angular-masonry/angular-masonry.js',
            bowerComponents + 'angulartics/dist/angulartics.min.js',
            bowerComponents + 'angulartics-google-analytics/dist/angulartics-ga.min.js',
            app+'app.module.js',
            app+'app.config.js',
            app+'app.run.js',
            app+'components/**/*.js',
            tests+'unit_tests/spec/*.js',
            tests+'unit_tests/spec/**/*.js',
            tests+'unit_tests/spec/components/**/*.js',
            tests+'unit_tests/fixtures/*.json'
        ],

        preprocessors: {
            'app/*.js': ['coverage'],
            'app/components/**/*.js': ['coverage'],
            'app/components/**/*.html': ['ng-html2js'],
            'tests/unit_tests/fixtures/*.json': ['ng-json2js']
        },

        ngHtml2JsPreprocessor: {
            cacheIdFromPath: function(filepath) {
                return filepath.substr(filepath.indexOf("components")+10);
            },
            moduleName: "html-templates"
        },

        ngJson2JsPreprocessor: {
            cacheIdFromPath: function(filepath) {
                return filepath.substr(filepath.indexOf("fixtures")+9);
            }
        },

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            dir: './tests/reports',
            reporters: [
                {
                    subdir: 'html',
                    type: 'html'
                }
            ]
        },

        autoWatch : true,

        singleRun: true,

        port: 9876,

        logLevel: config.LOG_DEBUG,

        browsers: ['PhantomJS'],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        frameworks: ['jasmine']

    });
};
