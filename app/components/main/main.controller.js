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
    MainCtrl.$inject = ['$scope'];
    function MainCtrl($scope) {
        var vm = this;
    }
})();