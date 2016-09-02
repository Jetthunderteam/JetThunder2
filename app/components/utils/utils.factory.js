/******************************
 * Utils Factory
 *******************************/
(function () {
    'use strict';
    angular
        .module('JetThunder2.utils')
        /******************************
         * Online Factory
         *******************************/
        .factory('utilsFactory', utilsFactory);

    /******************************
     * Factory Function
     *******************************/
    utilsFactory.$inject = [];
    function utilsFactory() {
        var factory = {
            getMoment: getMoment,
            getTime: getTime,
            getYear: getYear
        };

        /**
         * Gets the current moment
         * @returns {moment} - The moment object
         */
        function getMoment() {
            return new moment();
        }

        /**
         * Gets the current time
         * @returns {string} - The current time
         */
        function getTime() {
            return getMoment().format('HH:mm');
        }

        /**
         * Gets the current year
         * @returns {string} - The current year
         */
        function getYear() {
            return getMoment().format('YYYY');
        }

        return factory;
    }
})();