/******************************
 * Main Module
 *******************************/
(function () {
    'use strict';
    angular
        .module('JetThunder2.main')
        /******************************
         * Main Factory
         *******************************/
        .factory('mainFactory', mainFactory);

    /******************************
     * Service Function
     *******************************/
    mainFactory.$inject = ['$http', '$log', 'urlsFactory'];
    function mainFactory($http, $log, urlsFactory) {
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