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
        return {
            beautifyUrl: beautifyUrl,
            getMoment: getMoment,
            getTime: getTime,
            getYear: getYear
        };

        /**
         * Takes a given URL and removes any spaces
         * @param {string} string - The URL
         * @returns {string} string - The encoded URL
         */
        function beautifyUrl(string) {
            console.log(string);
            string = string.replace(/ /g, '-');
            return string;
        }

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
    }
})();