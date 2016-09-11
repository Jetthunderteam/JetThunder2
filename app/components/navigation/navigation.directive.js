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