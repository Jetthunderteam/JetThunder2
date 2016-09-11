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
    MainCtrl.$inject = ['$log', 'mainFactory', 'utilsFactory'];
    function MainCtrl($log, mainFactory, utilsFactory) {
        var vm = this;

        /** Activate */
        vm.$onInit = activate;

        /** Variables */
        vm.blogItems = {};

        /** Function Initializers */
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
            utilsFactory.beautifyUrl(string);
        }

        /**
         *
         * @returns {*}
         */
        function getBlogItems() {
            return mainFactory.getBlogItems()
                .then(function(data) {
                    vm.blogItems = data.entries;
                    return vm.blogItems;
                });
        }
    }
})();