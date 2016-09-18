/*************************
 Home Controller  Tests
 **************************/
'use strict';
describe('JetThunder2 Home: Controller', function() {
    var q, rootScope, scope, controller, httpBackend, homeFactory, utilsFactory, mockHomeData, mockUrl;
    mockUrl = 'app/data/blog.json';

    beforeEach(function () {
        module('JetThunder2');
        module('mockHomeData.json');
        module(function($urlRouterProvider) {
            $urlRouterProvider.deferIntercept();
        });
        inject(function ($q, $rootScope, $controller, $httpBackend, _homeFactory_, _utilsFactory_, _mockHomeData_) {
            q = $q;
            rootScope = $rootScope;
            scope = $rootScope.$new();
            controller = $controller('HomeCtrl', {$scope: scope});
            httpBackend = $httpBackend;
            homeFactory = _homeFactory_;
            utilsFactory = _utilsFactory_;
            mockHomeData = _mockHomeData_;
        });
        spyOn(rootScope, '$broadcast').and.callThrough();
        spyOn(homeFactory, 'getBlogItems').and.callFake(function () {
            var deferred = q.defer();
            deferred.resolve(mockHomeData);
            return deferred.promise;
        });
        httpBackend.when('GET', mockUrl).respond(mockHomeData);
    });

    describe('Main Controller Tests', function () {
        it('Should have a controller', function () {
            expect(controller).toBeDefined();
        });
        it('Should activate the controller and get the blog data when calling getBlogItems()', function () {
            scope.$apply();
            controller.$onInit();
            scope.$apply();
            expect(controller.blogItems).toEqual(mockHomeData.entries);
        });
        it('Should beautify a given URL when calling beautifyUrl()', function() {
            expect(controller.beautifyUrl('Mazda RX8')).toEqual('Mazda-RX8');
        });
    });
});