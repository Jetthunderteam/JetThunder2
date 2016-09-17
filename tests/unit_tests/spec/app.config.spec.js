/*************************
 App Config Tests
 **************************/
'use strict';
describe('JetThunder2: Config', function() {
    var rootScope, state, injector, mockState;

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
            mockState = 'home';
            expect(state.href(mockState)).toEqual('#/');
        });
        it('Should respond to the blog URL', function () {
            mockState = 'jetThunder';
            expect(state.href(mockState)).toEqual('#/jetThunder');
        });
        it('Should respond to the blog URL', function () {
            mockState = 'blog';
            expect(state.href(mockState)).toEqual('#/blog');
        });
    });
});