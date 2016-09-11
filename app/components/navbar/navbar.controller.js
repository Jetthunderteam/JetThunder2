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