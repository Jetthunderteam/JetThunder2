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

        /** View Bindings */
        vm.openNavigation = openNavigation;

        /** Bindings */

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