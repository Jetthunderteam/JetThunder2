module.exports = function() {
    var app = 'app/';
    var bowerComponents = app+'bower_components/';

    var config = {
        client: app,
        dependantJS: [
            bowerComponents+'jquery/dist/jquery.js',
            bowerComponents+'angular/angular.js',
            bowerComponents+'angular-ui-router/release/angular-ui-router.min.js',
            bowerComponents+'angular-animate/angular-animate.min.js',
            bowerComponents+'angular-aria/angular-aria.min.js',
            bowerComponents+'angular-messages/angular-messages.min.js',
            bowerComponents+'angular-material/angular-material.min.js',
            bowerComponents+'tether/dist/js/tether.min.js',
            bowerComponents+'angular-bootstrap/ui-bootstrap-tpls.min.js',
            bowerComponents+'moment/min/moment.min.js',
            bowerComponents+'firebase/firebase.js',
            bowerComponents+'angularfire/dist/angularfire.min.js',
            bowerComponents+'masonry/dist/masonry.pkgd.min.js',
            bowerComponents+'imagesloaded/imagesloaded.pkgd.min.js',
            bowerComponents+'angular-masonry/angular-masonry.js'
        ],
        dependentCSS: [
            bowerComponents+'angular-material/angular-material.min.css',
            bowerComponents+'bootstrap/dist/css/bootstrap.min.css',
            bowerComponents+'animate.css/animate.min.css',
            bowerComponents+'font-awesome/css/font-awesome.min.css'
        ],
        appJS: [
            app+'app.module.js',
            app+'app.config.js',
            app+'components/**/*.js',
            app+'scripts/*.js'
        ],
        appSCSS: [
            app+'styles/*.scss',
            app+'styles/components/*.scss'
        ],
        appHTML: [
            'index.html',
            app+'components/**/*.html'
        ],
        appImages: [
            app+'images/**/*.{gif,jpg,png,svg,ico}'
        ]
    };
    return config;
};