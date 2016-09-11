/*************************
 JetThunder Controller  Tests
 **************************/
'use strict';
describe('JetThunder2 JetThunder: Controller', function() {
    var rootScope, scope, controller;

    beforeEach(function () {
        module('JetThunder2');
        inject(function ($rootScope, $controller) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            controller = $controller('JetThunderCtrl', {$scope: scope});
        });
    });

    describe('JetThunder Controller Tests', function () {
        it('Should have a controller', function () {
            expect(controller).toBeDefined();
        });
    });
});