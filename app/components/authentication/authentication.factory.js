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
    authFactory.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseURL'];
    function authFactory($firebaseArray, $firebaseObject, firebaseURL) {
        var factory = {
            getPosts: getPosts
        };
        var ref = new Firebase(firebaseURL);

        /**
         * Gets the current blog posts from Firebase
         * @returns {array} posts - The current array of blog items
         */
        function getPosts() {
            var posts = ref.child('blog').child('entries');
            return $firebaseArray(posts);
        }

        return factory;
    }
})();