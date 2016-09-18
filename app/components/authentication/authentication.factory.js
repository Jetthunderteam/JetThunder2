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
    authFactory.$inject = ['$state', '$log'];
    function authFactory($state, $log) {
        var cachedUser, errorCode, errorMessage;
        return {
            createUser: createUser,
            getCachedUser: getCachedUser,
            getUser: getUser,
            signIn: signIn,
            signOut: signOut
        };

        /**
         * Creates & authenticates a new user through Firebase
         * @param {string} email - The users emails
         * @param {string} password - The users password
         */
        function createUser(email, password) {
            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .catch(function (error) {
                    errorCode = error.code;
                    errorMessage = error.message;
                    $log.debug('Unable to create user ' + errorCode + errorMessage);
                });
        }

        function getCachedUser() {
            return cachedUser;
        }

        /** Gets the currently authenticated user details */
        function getUser() {
            firebase.auth().onAuthStateChanged(function (user) {
                if (angular.isObject(user) && user != null) {
                    cachedUser = {
                        name: user.displayName,
                        email: user.email,
                        photoUrl: user.photoURL,
                        uid: user.uid
                    };
                    return cachedUser;
                } else {
                    $log.warn('No user logged in');
                }
            })
        }

        /**
         * Signs in & authenticates the user through Firebase
         * @param {string} email - The users emails
         * @param {string} password - The users password
         */
        function signIn(email, password) {
            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(_signInSuccess)
                .catch(_signInFailure);

            function _signInSuccess(user) {
                $log.info('Successfully signed in!');
                $state.go('profile');
                if (angular.isObject(user) && user != null) {
                    cachedUser = {
                        name: user.displayName,
                        email: user.email,
                        photoUrl: user.photoURL,
                        uid: user.uid
                    };
                }
                return cachedUser;
            }

            function _signInFailure(error) {
                errorCode = error.code;
                errorMessage = error.message;
                $log.warn('Unable to login user ' + errorCode + errorMessage);
            }
        }

        /** Signs out the currently authenticated user */
        function signOut() {
            firebase.auth().signOut().then(function () {
                $log.info('Successfully signed out!');
                cachedUser = null;
                $state.go('logout');
            }, function (error) {
                $log.debug('Error during sign-out ' + error);
                return error;
            });
        }
    }
})();