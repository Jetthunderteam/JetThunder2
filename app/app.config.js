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
            .state('home', {
                url: '/',
                templateUrl: 'app/components/home/home.html',
                controller: "HomeCtrl",
                controllerAs: "HomeCtrl"
            })
            .state('jetThunder', {
                url: '/jetThunder',
                templateUrl: 'app/components/jetThunder/jetThunder.html',
                controller: "JetThunderCtrl",
                controllerAs: "JetThunderCtrl"
            })
            .state('blog', {
                url: '/blog?post',
                templateUrl: 'app/components/blog/blog.html',
                controller: "BlogCtrl",
                controllerAs: "BlogCtrl",
                params: {
                    post: {
                        value: '',
                        squash: true
                    }
                },
                reloadOnSearch: false
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'app/components/profile/profile.html',
                controller: 'ProfileCtrl',
                controllerAs: 'ProfileCtrl'
            })
            .state('logout', {
                url: '/logout',
                templateUrl: 'app/components/authentication/authentication.logout.html',
                controller: 'AuthCtrl',
                controllerAs: 'AuthCtrl'
            });
        $mdThemingProvider.theme('jetThunder2');
        $mdThemingProvider.setDefaultTheme('jetThunder2');
    }
})();