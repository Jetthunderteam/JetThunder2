/*************************
 Application Run
 **************************/
(function () {
    'use strict';
    angular
        .module('JetThunder2')
        .run(JetThunder2Run);

    JetThunder2Run.$inject = ["$rootScope", "$window"];
    function JetThunder2Run($rootScope, $window) {
        $rootScope.connection = navigator.onLine;
        $window.addEventListener("offline", function() {
            $rootScope.$apply(function() {
                $rootScope.connection = false;
            });
        }, false);

        $window.addEventListener("online", function() {
            $rootScope.$apply(function() {
                $rootScope.connection = true;
            });
        }, false);
    }
})();

