/*************************
 Analytics Module
 **************************/
(function () {
    'use strict';
    angular
        .module('JetThunder2.analytics')
        /*************************
         Analytics Directive
         **************************/
        .directive('analyticsDirective', analyticsDirective);

    /*************************
     Directive Function
     **************************/
    analyticsDirective.$inject = ['$window'];
    function analyticsDirective($window) {
        var directive = {
            restrict: 'EA',
            link: link($window)
        };
        return directive;
    }

    function link($window) {
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })($window, $window.document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

        $window.ga('create', 'UA-76777772-1', 'auto');
        $window.ga('send', 'pageview');
    }
})();