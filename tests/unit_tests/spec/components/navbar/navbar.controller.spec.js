/*************************
 Navbar Controller Tests
 **************************/
'use strict';
describe('JetThunder2 Navbar: Controller', function() {
    var rootScope, scope, controller, utilsFactory, navigationToggle;

    beforeEach(function () {
        module('JetThunder2');
        module(function($urlRouterProvider) {
            $urlRouterProvider.deferIntercept();
        });
        module(function($provide) {
            navigationToggle = jasmine.createSpy();
            $provide.factory('$mdSidenav', function() {
                return function(){
                    return {toggle: navigationToggle};
                };
            });
        });
        inject(function ($rootScope, $controller, _utilsFactory_) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            controller = $controller('NavbarCtrl', {$scope: scope});
            utilsFactory = _utilsFactory_;
        });
        spyOn(utilsFactory, 'getTime').and.returnValue('17:28');
    });

    describe('Navbar Controller Tests', function () {
        it('Should have a controller', function () {
            expect(controller).toBeDefined();
        });
        it('Should open the navigation menu on calling openNavigation()', function() {
            controller.openNavigation();
            expect(navigationToggle).toHaveBeenCalled();
        });
        it('Should activate the controller and initialise the time when calling startClock()', function () {
            scope.$apply();
            controller.$onInit();
            scope.$apply();
            expect(controller.clock).toEqual('Initialising');
        });
    });
});