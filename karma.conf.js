module.exports = function (config) {
    var app = 'app/';
    var tests = 'tests/';
    var bowerComponents = app + 'bower_components/';

    config.set({

        basePath: '',

        files: [
            tests+'unit_tests/spec/*.js',
            tests+'unit_tests/spec/**/*.js',
            tests+'unit_tests/spec/components/*.js',
            tests+'unit_tests/spec/components/**/*.js'
        ],

        preprocessors: {

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

        port: 9876,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['PhantomJS'],

        frameworks: ['jasmine']

    });
};
