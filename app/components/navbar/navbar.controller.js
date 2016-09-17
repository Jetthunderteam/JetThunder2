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
    NavbarCtrl.$inject = ['$timeout', '$mdSidenav', '$mdDialog', 'authFactory', 'utilsFactory'];
    function NavbarCtrl($timeout, $mdSidenav, $mdDialog, authFactory, utilsFactory) {
        var vm = this, tickInterval = 1000;

        /** View Bindings */
        vm.clock = "Initialising";

        /** Bindings */
        vm.$onInit = activate;
        vm.openMenu = openMenu;
        vm.openNavigation = openNavigation;
        vm.openSignIn = openSignIn;
        vm.openSignUp = openSignUp;

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

        function openSignIn(event) {
            $mdDialog.show({
                controller: 'AuthCtrl',
                controllerAs: 'AuthCtrl',
                templateUrl: 'app/components/authentication/authentication.login.html',
                targetEvent: event,
                clickOutsideToClose:true
            })
        }

        function openSignUp() {

        }

        /** Creates the tick for the navbar clock */
        function startClock() {
            vm.clock = utilsFactory.getTime();
        }
    }
})();