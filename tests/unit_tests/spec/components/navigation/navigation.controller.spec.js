/*************************
 Navigation Controller Tests
 **************************/
'use strict';
describe('JetThunder2 Navigation: Controller', function() {
    var rootScope, scope, controller, navigationToggle;

    beforeEach(function () {
        module('JetThunder2');
        module(function($provide) {
            navigationToggle = jasmine.createSpy();
            $provide.factory('$mdSidenav', function() {
                return function(){
                    return {toggle: navigationToggle};
                };
            });
        });
        inject(function ($rootScope, $controller) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            controller = $controller('NavigationCtrl', {$scope: scope});
        });
    });

    describe('Navigation Controller Tests', function () {
        it('Should have a controller', function () {
            expect(controller).toBeDefined();
        });
        it('Should open the navigation menu on calling openNavigation()', function() {
            controller.openNavigation();
            expect(navigationToggle).toHaveBeenCalled();
        });
    });
});