/******************************
 * URLS Module
 *******************************/
(function () {
    'use strict';
    angular
        .module('JetThunder2.urls')
        /******************************
         * URLS Factory
         *******************************/
        .factory('urlsFactory', urlsFactory);

    /******************************
     * Factory Function
     *******************************/
    urlsFactory.$inject = [];
    function urlsFactory() {
        return {
            blogPosts: 'app/data/blog.json'
        }
    }
})();