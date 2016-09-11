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
    BlogCtrl.$inject = ['$scope', '$state', '$log', 'mainFactory'];
    function BlogCtrl($scope, $state, $log, mainFactory) {
        var vm = this;

        /** Activate */
        vm.$onInit = activate;

        /** Variables */
        vm.blogItems = [];
        vm.search = $state.params.post;
        vm.searchText = searchText;

        /** Function Initializers */
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
            return mainFactory.getBlogItems()
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