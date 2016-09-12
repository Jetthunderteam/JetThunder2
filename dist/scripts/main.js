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
    angular.module('JetThunder2.jetThunder', []);
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
            });
        $mdThemingProvider.theme('jetThunder2');
        $mdThemingProvider.setDefaultTheme('jetThunder2');
    }
})();
/*************************
 Authentication Module
 **************************/
(function () {
    'use strict';

    angular
        .module('JetThunder2.authentication')
        /*************************
         Authentication Controller
         **************************/
        .controller('AuthCtrl', AuthCtrl);

    /*************************
     Controller Function
     **************************/
    AuthCtrl.$inject = [];
    function AuthCtrl() {
        var vm = this;
    }
})();
/******************************
 * Authentication Module
 *******************************/
(function () {
    'use strict';
    angular
        .module('JetThunder2.authentication')
        /******************************
         * Authentication Factory
         *******************************/
        .factory('authFactory', authFactory);

    /******************************
     * Service Function
     *******************************/
    authFactory.$inject = [];
    function authFactory() {
        return {

        };
    }
})();
/******************************
 * Authentication Service
 *******************************/
(function () {
    'use strict';
    angular
        .module('JetThunder2.authentication')
        /******************************
         * Authentication Service
         *******************************/
        .service('authService', authService);

    /******************************
     * Service Function
     *******************************/
    authService.$inject = ['firebaseURL', '$firebaseArray', '$firebaseObject'];
    function authService(firebaseURL, $firebaseArray, $firebaseObject) {
        /**  **/
        var ref = new Firebase(firebaseURL);
        this.cachedUser = ref.getAuth();

        var formatEmailForFirebase = function (email) {
            var key = email.replace('@', '^');
            if (key.indexOf('.') !== -1) {
                return key.split('.').join('*');
            }
            return key;
        };

        var addNewUserToFB = function (newUser) {
            var key = formatEmailForFirebase(newUser.email);
            ref.child('user').child(key).set(newUser);
        };


        this.isLoggedIn = function () {
            return !!ref.getAuth();
        };

        this.getUser = function () {
            return this.cachedUser || ref.getAuth();
        };

        this.createUser = function (user, cb) {
            ref.createUser(user, function (err) {
                if (err) {
                    switch (err.code) {
                        case "EMAIL_TAKEN":
                            console.log("The new user account cannot be created because the email is already in use.");
                            break;
                        case "INVALID_EMAIL":
                            console.log("The specified email is not a valid email.");
                            break;
                        default:
                            console.log("Error creating user:", err);
                    }
                } else {
                    this.loginWithPW(user, function (authData) {
                        addNewUserToFB({
                            email: user.email,
                            uid: authData.uid,
                            token: authData.token
                        });
                    }, cb);
                }
            }.bind(this));
        };

        this.loginWithPW = function (userObj, cb, cbOnRegister) {
            ref.authWithPassword(userObj, function (err, authData) {
                if (err) {
                    console.log('Error on login:', err.message);
                    cbOnRegister && cbOnRegister(false);
                } else {
                    authData.email = userObj.email;
                    this.cachedUser = authData;
                    cb(authData);
                    cbOnRegister && cbOnRegister(true);
                }
            }.bind(this));
        };

        this.logout = function () {
            ref.unauth();
            this.cachedUser = null;
            return true;
        };
    }
})();
/*************************
 Blog Module
 **************************/
(function () {
    'use strict';

    angular
        .module('JetThunder2.blog')
        /*************************
         Main Controller
         **************************/
        .controller('BlogCtrl', BlogCtrl);

    /*************************
     Controller Function
     **************************/
    BlogCtrl.$inject = ['$scope', '$state', '$log', 'mainFactory'];
    function BlogCtrl($scope, $state, $log, mainFactory) {
        var vm = this;

        /** Activate */
        vm.$onInit = activate;

        /** Variables */
        vm.blogItems = [];
        vm.search = $state.params.post;
        vm.searchText = searchText;

        /** Function Initializers */
        vm.searchText = searchText;

        $scope.$on('$locationChangeSuccess', function() {
            vm.search = $state.params.post;
        });

        /**
         * Activates the controller
         * @returns {*}
         */
        function activate() {
            return getBlogItems().then(function() {
                $log.info('Activated blog posts');
            });
        }

        /**
         *
         * @returns {*}
         */
        function getBlogItems() {
            return mainFactory.getBlogItems()
                .then(function(data) {
                    vm.blogItems = data.entries;
                    return vm.blogItems;
                });
        }

        function searchText() {
            $state.go('.', {post: vm.search}, {notify: false});
        }
    }
})();
/*************************
 Footer Module
 **************************/
(function () {
    'use strict';

    angular
        .module('JetThunder2.footer')
        /*************************
         Footer Controller
         **************************/
        .controller('FooterCtrl', FooterCtrl);

    /*************************
     Controller Function
     **************************/
    FooterCtrl.$inject = ['utilsFactory'];
    function FooterCtrl(utilsFactory) {
        var vm = this;

        /** Variables */
        vm.copyrightDate = utilsFactory.getYear();
        
        /** Function Initializers */
    }
})();
/*************************
 Footer Module
 **************************/
(function () {
    'use strict';
    angular
        .module('JetThunder2.footer')
        /*************************
         Navbar Directive
         **************************/
        .directive('footerDirective', footerDirective);

    /*************************
     Directive Function
     **************************/
    function footerDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/footer/footer.html',
            controller: 'FooterCtrl',
            controllerAs: 'FooterCtrl',
            bindToController: true
        };
        return directive;
    }
})();
/*************************
 JetThunder Module
 **************************/
(function () {
    'use strict';

    angular
        .module('JetThunder2.jetThunder')
        /*************************
         JetThunder Controller
         **************************/
        .controller('JetThunderCtrl', JetThunderCtrl);

    /*************************
     Controller Function
     **************************/
    JetThunderCtrl.$inject = [];
    function JetThunderCtrl() {
        var vm = this;

        /** Variables */

        /** Function Initializers */
    }
})();
/*************************
 Main Module
 **************************/
(function () {
    'use strict';

    angular
        .module('JetThunder2.main')
        /*************************
         Main Controller
         **************************/
        .controller('MainCtrl', MainCtrl);

    /*************************
     Controller Function
     **************************/
    MainCtrl.$inject = ['$log', 'mainFactory', 'utilsFactory'];
    function MainCtrl($log, mainFactory, utilsFactory) {
        var vm = this;

        /** Activate */
        vm.$onInit = activate;

        /** Variables */
        vm.blogItems = {};

        /** Function Initializers */
        vm.beautifyUrl = beautifyUrl;

        /**
         * Activates the controller
         * @returns {*}
         */
        function activate() {
            return getBlogItems().then(function() {
                $log.info('Activated blog posts');
            });
        }

        /**
         * Takes a given URL and removes any spaces
         * @param {string} string - The URL
         * @returns {string} string - The encoded URL
         */
        function beautifyUrl(string) {
            return utilsFactory.beautifyUrl(string);
        }

        /**
         *
         * @returns {*}
         */
        function getBlogItems() {
            return mainFactory.getBlogItems()
                .then(function(data) {
                    vm.blogItems = data.entries;
                    return vm.blogItems;
                });
        }
    }
})();
/******************************
 * Main Module
 *******************************/
(function () {
    'use strict';
    angular
        .module('JetThunder2.main')
        /******************************
         * Main Factory
         *******************************/
        .factory('mainFactory', mainFactory);

    /******************************
     * Service Function
     *******************************/
    mainFactory.$inject = ['$http', '$log', 'urlsFactory'];
    function mainFactory($http, $log, urlsFactory) {
        return {
            getBlogItems: getBlogItems
        };

        function getBlogItems() {
            return $http.get(urlsFactory.blogPosts)
                .then(_getBlogItemsSuccess)
                .catch(_getBlogItemsFailure);

            function _getBlogItemsSuccess(response) {
                return response.data;
            }

            function _getBlogItemsFailure(error) {
                $log.error('XHR Failed for getBlogItems' + error.data);
                return error;
            }
        }
    }
})();
/*************************
 Navbar Module
 **************************/
(function () {
    'use strict';

    angular
        .module('JetThunder2.navbar')
        /*************************
         Navbar Controller
         **************************/
        .controller('NavbarCtrl', NavbarCtrl);

    /*************************
     Controller Function
     **************************/
    NavbarCtrl.$inject = ['$timeout', '$mdSidenav', 'utilsFactory'];
    function NavbarCtrl($timeout, $mdSidenav, utilsFactory) {
        var vm = this, tickInterval = 1000;

        /** Variables */
        vm.clock = "Initialising";

        /** Function Initializers */
        vm.$onInit = activate;
        vm.openMenu = openMenu;
        vm.openNavigation = openNavigation;

        /** Activate */
        function activate() {
            $timeout(startClock, tickInterval);
        }

        /**
         * Opens the account menu
         * @param $mdOpenMenu
         * @param event
         */
        function openMenu($mdOpenMenu, event) {
            $mdOpenMenu(event);
        }

        /**
         * Opens the side navigation panel from the
         * desired location
         * @param {string} direction - The direction of opening
         */
        function openNavigation(direction) {
            $mdSidenav(direction).toggle();
        }

        /** Creates the tick for the navbar clock */
        function startClock() {
            vm.clock = utilsFactory.getTime();
        }
    }
})();
/*************************
 Navbar Module
 **************************/
(function () {
    'use strict';
    angular
        .module('JetThunder2.navbar')
        /*************************
         Navbar Directive
         **************************/
        .directive('navbarDirective', navbarDirective);

    /*************************
     Directive Function
     **************************/
    function navbarDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/navbar/navbar.html',
            controller: 'NavbarCtrl',
            controllerAs: 'NavbarCtrl',
            bindToController: true
        };
        return directive;
    }
})();
/*************************
 Navigation Module
 **************************/
(function () {
    'use strict';

    angular
        .module('JetThunder2.navigation')
        /*************************
         Navigation Controller
         **************************/
        .controller('NavigationCtrl', NavigationCtrl);

    /*************************
     Controller Function
     **************************/
    NavigationCtrl.$inject = ['$mdSidenav'];
    function NavigationCtrl($mdSidenav) {
        var vm = this;

        /** Variables */
        vm.openNavigation = openNavigation;

        /** Function Initializers */

        /**
         * Opens the side navigation panel from the
         * desired location
         * @param {string} direction - The direction of opening
         */
        function openNavigation(direction) {
            $mdSidenav(direction).toggle();
        }
    }
})();
/*************************
 Navigation Module
 **************************/
(function () {
    'use strict';
    angular
        .module('JetThunder2.navigation')
        /*************************
         Navigation Directive
         **************************/
        .directive('navigationDirective', navigationDirective);

    /*************************
     Directive Function
     **************************/
    function navigationDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/navigation/navigation.html',
            controller: 'NavigationCtrl',
            controllerAs: 'NavigationCtrl',
            bindToController: true
        };
        return directive;
    }
})();
/******************************
 * URLS Module
 *******************************/
(function () {
    'use strict';
    angular
        .module('JetThunder2.urls')
        /******************************
         * URLS Factory
         *******************************/
        .factory('urlsFactory', urlsFactory);

    /******************************
     * Factory Function
     *******************************/
    urlsFactory.$inject = [];
    function urlsFactory() {
        return {
            blogPosts: 'app/data/blog.json'
        }
    }
})();
/******************************
 * Utils Factory
 *******************************/
(function () {
    'use strict';
    angular
        .module('JetThunder2.utils')
        /******************************
         * Online Factory
         *******************************/
        .factory('utilsFactory', utilsFactory);

    /******************************
     * Factory Function
     *******************************/
    utilsFactory.$inject = [];
    function utilsFactory() {
        return {
            beautifyUrl: beautifyUrl,
            getMoment: getMoment,
            getTime: getTime,
            getYear: getYear
        };

        /**
         * Takes a given URL and removes any spaces
         * @param {string} string - The URL
         * @returns {string} string - The encoded URL
         */
        function beautifyUrl(string) {
            console.log(string);
            string = string.replace(/ /g, '-');
            return string;
        }

        /**
         * Gets the current moment
         * @returns {moment} - The moment object
         */
        function getMoment() {
            return new moment();
        }

        /**
         * Gets the current time
         * @returns {string} - The current time
         */
        function getTime() {
            return getMoment().format('HH:mm');
        }

        /**
         * Gets the current year
         * @returns {string} - The current year
         */
        function getYear() {
            return getMoment().format('YYYY');
        }
    }
})();
var splashScreen = pleaseWait({
    logo: "app/images/logos/jetthunder-splash.png",
    backgroundColor: '#00aec8',
    loadingHtml: "<h2 class='splashMessage'>Loading JetThunder...</h2>"
});
