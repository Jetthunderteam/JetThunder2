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