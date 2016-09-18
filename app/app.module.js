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
        'JetThunder2.jetThunder',
        'JetThunder2.home',
        'JetThunder2.blog',
        'JetThunder2.profile',
        'JetThunder2.navbar',
        'JetThunder2.navigation',
        'JetThunder2.footer',
        'JetThunder2.utils',
        'JetThunder2.urls']);

    //Auth
    angular.module('JetThunder2.authentication', []);

    //Views
    angular.module('JetThunder2.jetThunder', []);
    angular.module('JetThunder2.home', []);
    angular.module('JetThunder2.profile', []);
    angular.module('JetThunder2.blog', []);

    //Components
    angular.module('JetThunder2.navbar', []);
    angular.module('JetThunder2.navigation', []);
    angular.module('JetThunder2.footer', []);

    //Utils
    angular.module('JetThunder2.utils', []);
    angular.module('JetThunder2.urls', []);
    
    //Analytics
    angular.module('JetThunder2.analytics', []);
})();