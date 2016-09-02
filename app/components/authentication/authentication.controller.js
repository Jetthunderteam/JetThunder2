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