/******************************
 * Main Module
 *******************************/
(function () {
    'use strict';
    angular
        .module('JetThunder2.home')
        /******************************
         * Main Factory
         *******************************/
        .factory('homeFactory', homeFactory);

    /******************************
     * Service Function
     *******************************/
    homeFactory.$inject = ['$http', '$log', 'urlsFactory'];
    function homeFactory($http, $log, urlsFactory) {
        return {
            getBlogItems: getBlogItems
        };

        function getBlogItems() {
            return $http.get(urlsFactory.blogPosts)
                .then(_getBlogItemsSuccess)
                .catch(_getBlogItemsFailure);

            function _getBlogItemsSuccess(response) {
                return response.data;
            }

            function _getBlogItemsFailure(error) {
                $log.error('XHR Failed for getBlogItems' + error.data);
                return error;
            }
        }
    }
})();