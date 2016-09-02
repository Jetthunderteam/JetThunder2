/*************************
 Application Modules
 **************************/
(function () {
    'use strict';

    angular.module('JetThunder2', [
        'ngAnimate',
        'ngMaterial',
        'ui.router',
        'ui.bootstrap',
        'firebase',
        'angulartics',
        'angulartics.google.analytics',
        'JetThunder2.authentication',
        'JetThunder2.main',
        'JetThunder2.navbar',
        'JetThunder2.footer',
        'JetThunder2.utils']);

    //Auth
    angular.module('JetThunder2.authentication', []);

    //Views
    angular.module('JetThunder2.main', []);

    //Components
    angular.module('JetThunder2.navbar', []);
    angular.module('JetThunder2.footer', []);

    //Utils
    angular.module('JetThunder2.utils', []);
})();