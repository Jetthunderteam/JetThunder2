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