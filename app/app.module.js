/*************************
 Application Modules
 **************************/
(function () {
    'use strict';

    angular.module('JetThunder2', [
        'ngAnimate',
        'ngMaterial',
        'ngSanitize',
        'ui.router',
        'ui.bootstrap',
        'firebase',
        'angulartics',
        'angulartics.google.analytics',
        'JetThunder2.authentication',
        'JetThunder2.main',
        'JetThunder2.blog',
        'JetThunder2.navbar',
        'JetThunder2.navigation',
        'JetThunder2.footer',
        'JetThunder2.utils',
        'JetThunder2.urls']);

    //Auth
    angular.module('JetThunder2.authentication', []);

    //Views
    angular.module('JetThunder2.main', []);
    angular.module('JetThunder2.blog', []);

    //Components
    angular.module('JetThunder2.navbar', []);
    angular.module('JetThunder2.navigation', []);
    angular.module('JetThunder2.footer', []);

    //Utils
    angular.module('JetThunder2.utils', []);
    angular.module('JetThunder2.urls', []);
})();