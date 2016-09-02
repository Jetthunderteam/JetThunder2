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
    MainCtrl.$inject = ['authFactory'];
    function MainCtrl(authFactory) {
        var vm = this;

        /** Variables */

        /** Function Initializers */
        vm.posts = authFactory.getPosts();

    }
})();