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

        /** View Bindings */
        vm.copyrightDate = utilsFactory.getYear();

        /** Bindings */
    }
})();