/*************************
 Main Module
 **************************/
(function () {
    'use strict';

    angular
        .module('JetThunder2.home')
        /*************************
         Main Controller
         **************************/
        .controller('HomeCtrl', HomeCtrl);

    /*************************
     Controller Function
     **************************/
    HomeCtrl.$inject = ['$log', 'homeFactory', 'utilsFactory'];
    function HomeCtrl($log, homeFactory, utilsFactory) {
        var vm = this;

        /** Activate */
        vm.$onInit = activate;

        /** View Bindings */
        vm.blogItems = {};

        /** Bindings */
        vm.beautifyUrl = beautifyUrl;

        /**
         * Activates the controller
         * @returns {*}
         */
        function activate() {
            return getBlogItems().then(function() {
                $log.info('Activated blog posts');
            });
        }

        /**
         * Takes a given URL and removes any spaces
         * @param {string} string - The URL
         * @returns {string} string - The encoded URL
         */
        function beautifyUrl(string) {
            return utilsFactory.beautifyUrl(string);
        }

        /**
         *
         * @returns {*}
         */
        function getBlogItems() {
            return homeFactory.getBlogItems()
                .then(function(data) {
                    vm.blogItems = data.entries;
                    return vm.blogItems;
                });
        }
    }
})();