/*************************
 Home Factory Tests
 **************************/
'use strict';
describe('JetThunder2 Main: Factory', function () {
    var rootScope, httpBackend, homeFactory, mockUrl, mockHomeData;

    beforeEach(function () {
        module('JetThunder2');
        module('mockHomeData.json');
        module(function($urlRouterProvider) {
            $urlRouterProvider.deferIntercept();
        });
        inject(function ($rootScope, $httpBackend, _homeFactory_, _mockHomeData_) {
            rootScope = $rootScope;
            httpBackend = $httpBackend;
            homeFactory = _homeFactory_;
            mockHomeData = _mockHomeData_;
        });
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('Main Factory Tests', function () {
        it('Should return the correct data when a successful http request is made calling getBlogItems()', function () {
            mockUrl = 'app/data/blog.json';
            httpBackend.when('GET', mockUrl).respond(mockHomeData);
            homeFactory.getBlogItems().then(function (result) {
                expect(result).toEqual(mockHomeData)
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