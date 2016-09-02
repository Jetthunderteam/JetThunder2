/*************************
 App Config Tests
 **************************/
'use strict';
describe('JetThunder2: Config', function() {
    var rootScope, state, injector, mockState = 'main';

    beforeEach(function () {
        module('JetThunder2');
        inject(function ($rootScope, $state, $injector) {
            rootScope = $rootScope;
            state = $state;
            injector = $injector;
        });
    });

    describe('JetThunder Config Tests', function () {
        it('Should respond to the main URL', function () {
            expect(state.href(mockState)).toEqual('#/');
        });
    });
});