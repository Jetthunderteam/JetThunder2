/*************************
 Application Modules
 **************************/
(function () {
    'use strict';

    angular.module('JetThunder2', [
        'firebase',
        'ngAnimate',
        'ngMaterial',
        'ui.router',
        'ui.bootstrap',
        'angulartics',
        'angulartics.google.analytics',
        'JetThunder2.main']);

    //Views
    angular.module('JetThunder2.main', []);
})();