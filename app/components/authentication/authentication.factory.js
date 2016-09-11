/******************************
 * Authentication Module
 *******************************/
(function () {
    'use strict';
    angular
        .module('JetThunder2.authentication')
        /******************************
         * Authentication Factory
         *******************************/
        .factory('authFactory', authFactory);

    /******************************
     * Service Function
     *******************************/
    authFactory.$inject = [];
    function authFactory() {
        return {

        };
    }
})();