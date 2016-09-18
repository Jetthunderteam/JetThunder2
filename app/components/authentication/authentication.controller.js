/*************************
 Authentication Module
 **************************/
(function () {
    'use strict';

    angular
        .module('JetThunder2.authentication')
        /*************************
         Authentication Controller
         **************************/
        .controller('AuthCtrl', AuthCtrl);

    /*************************
     Controller Function
     **************************/
    AuthCtrl.$inject = ['$mdDialog', 'authFactory'];
    function AuthCtrl($mdDialog, authFactory) {
        var vm = this;

        /** View Bindings */
        vm.displayImage = '';
        vm.email = '';
        vm.firstName = '';
        vm.lastName = '';
        vm.password = '';
        vm.uid = '';

        /** Bindings */
        vm.closeAuthDialog = closeAuthDialog;
        vm.createUser = createUser;
        vm.getUser = getUser;
        vm.signIn = signIn;
        vm.signOut = signOut;

        function closeAuthDialog() {
            $mdDialog.cancel();
        }

        /**
         * Creates a new user through Firebase
         * @param {string} email - The users emails
         * @param {string} password - The users password
         */
        function createUser(email, password) {
            authFactory.createUser(email, password);
        }

        /** Gets the current user details */
        function getUser() {
            authFactory.getUser();
        }

        /**
         * Signs in the user through Firebase
         * @param {string} email - The users emails
         * @param {string} password - The users password
         */
        function signIn(email, password) {
            authFactory.signIn(email, password);
        }

        /** Signs out the current user */
        function signOut() {
            authFactory.signOut();
        }
    }
})();