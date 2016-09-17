/*************************
 Home Factory Tests
 **************************/
'use strict';
describe('JetThunder2 Main: Factory', function () {
    var rootScope, httpBackend, homeFactory, mockUrl, mockMainData;

    beforeEach(function () {
        module('JetThunder2');
        module('mockMainData.json');
        module(function($urlRouterProvider) {
            $urlRouterProvider.deferIntercept();
        });
        inject(function ($rootScope, $httpBackend, _homeFactory_, _mockMainData_) {
            rootScope = $rootScope;
            httpBackend = $httpBackend;
            homeFactory = _homeFactory_;
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
            homeFactory.getBlogItems().then(function (result) {
                expect(result).toEqual(mockMainData)
            });
            httpBackend.flush();
        });
        it('Should return an error message when an unsuccessful http request is made calling getBlogItems()', function () {
            mockUrl = "app/data/blog.json";
            httpBackend.when('GET', mockUrl).respond(404, 'Not Found');
            homeFactory.getBlogItems().then(function (result) {
                expect(result.status).toEqual(404);
            });
            httpBackend.flush();
        });
    });
});