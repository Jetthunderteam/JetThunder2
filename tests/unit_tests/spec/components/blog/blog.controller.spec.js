/*************************
 Blog Controller  Tests
 **************************/
'use strict';
describe('JetThunder2 Blog: Controller', function() {
    var q, rootScope, scope, controller, httpBackend, state, homeFactory, mockHomeData, mockUrl;
    mockUrl = 'app/data/blog.json';

    beforeEach(function () {
        module('JetThunder2');
        module('mockHomeData.json');
        module(function($urlRouterProvider) {
            $urlRouterProvider.deferIntercept();
        });
        inject(function ($q, $rootScope, $controller, $httpBackend, $state, _homeFactory_, _mockHomeData_) {
            q = $q;
            rootScope = $rootScope;
            scope = $rootScope.$new();
            controller = $controller('BlogCtrl', {$scope: scope});
            httpBackend = $httpBackend;
            state = $state;
            homeFactory = _homeFactory_;
            mockHomeData = _mockHomeData_;
        });
        spyOn(rootScope, '$broadcast').and.callThrough();
        spyOn(state, 'go');
        spyOn(homeFactory, 'getBlogItems').and.callFake(function () {
            var deferred = q.defer();
            deferred.resolve(mockHomeData);
            return deferred.promise;
        });
        httpBackend.when('GET', mockUrl).respond(mockHomeData);
    });

    describe('Blog Controller Tests', function () {
        it('Should have a controller', function () {
            expect(controller).toBeDefined();
        });
        it('Should activate the controller and get the blog data when calling getBlogItems()', function () {
            scope.$apply();
            controller.$onInit();
            scope.$apply();
            expect(controller.blogItems).toEqual(mockHomeData.entries);
        });
        it('Should on change of URL, update the search', function() {
            rootScope.$broadcast('$locationChangeSuccess');
        });
        it('Should, on calling searchText(), update and go to the searched URL', function() {
            controller.searchText();
            expect(state.go).toHaveBeenCalledWith('.', {post: undefined}, {notify: false});
        });
    });
});