/*************************
 Main Factory Tests
 **************************/
'use strict';
describe('JetThunder2 Main: Factory', function () {
    var rootScope, httpBackend, mainFactory, mockUrl, mockMainData;

    beforeEach(function () {
        module('JetThunder2');
        module('mockMainData.json');
        module(function($urlRouterProvider) {
            $urlRouterProvider.deferIntercept();
        });
        inject(function ($rootScope, $httpBackend, _mainFactory_, _mockMainData_) {
            rootScope = $rootScope;
            httpBackend = $httpBackend;
            mainFactory = _mainFactory_;
            mockMainData = _mockMainData_;
        });
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('Main Factory Tests', function () {
        it('Should return the correct data when a successful http request is made calling getBlogItems()', function () {
            mockUrl = 'app/data/blog.json';
            httpBackend.when('GET', mockUrl).respond(mockMainData);
            mainFactory.getBlogItems().then(function (result) {
                expect(result).toEqual(mockMainData)
            });
            httpBackend.flush();
        });
        it('Should return an error message when an unsuccessful http request is made calling getBlogItems()', function () {
            mockUrl = "app/data/blog.json";
            httpBackend.when('GET', mockUrl).respond(404, 'Not Found');
            mainFactory.getBlogItems().then(function (result) {
                expect(result.status).toEqual(404);
            });
            httpBackend.flush();
        });
    });
});