/*************************
Application Configuration
 **************************/
(function () {
    'use strict';
    angular
        .module('JetThunder2')
        .constant('firebaseURL', 'https://sizzling-inferno-5639.firebaseio.com')
        .config(JetThunderConfig);

    JetThunderConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider'];
    function JetThunderConfig($stateProvider, $urlRouterProvider, $mdThemingProvider) {
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/components/main/main.html',
                controller: "MainCtrl",
                controllerAs: "MainCtrl"
            });
        $mdThemingProvider.theme('jetThunder2');
        $mdThemingProvider.setDefaultTheme('jetThunder2');
    }
})();