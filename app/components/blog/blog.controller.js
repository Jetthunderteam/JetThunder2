/*************************
 Blog Module
 **************************/
(function () {
    'use strict';

    angular
        .module('JetThunder2.blog')
        /*************************
         Main Controller
         **************************/
        .controller('BlogCtrl', BlogCtrl);

    /*************************
     Controller Function
     **************************/
    BlogCtrl.$inject = ['$scope', '$state', '$log', 'homeFactory'];
    function BlogCtrl($scope, $state, $log, homeFactory) {
        var vm = this;

        /** Activate */
        vm.$onInit = activate;

        /** View Bindings */
        vm.blogItems = [];
        vm.search = $state.params.post;
        vm.searchText = searchText;

        /** Bindings */
        vm.searchText = searchText;

        $scope.$on('$locationChangeSuccess', function() {
            vm.search = $state.params.post;
        });

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

        function searchText() {
            $state.go('.', {post: vm.search}, {notify: false});
        }
    }
})();