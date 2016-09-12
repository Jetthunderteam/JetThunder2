/*************************
 App Run Tests
 **************************/
'use strict';
describe('JetThunder2: Run', function() {
    var rootScope, window, navigator;

    beforeEach(function () {
        module('JetThunder2');
        inject(function ($rootScope, $window) {
            rootScope = $rootScope;
            window = $window;
        });
        navigator = window.navigator;
    });

    afterEach(function () {
        window.navigator = navigator;
    });

    describe('JetThunder Config Tests', function () {
        it('Should set the connection to true when the application is Online', function() {
            window.navigator = { onLine: "online" };
            expect(rootScope.connection).toBe(true);
        });
    });
});