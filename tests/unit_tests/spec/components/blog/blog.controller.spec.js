/*************************
 Blog Controller  Tests
 **************************/
'use strict';
describe('JetThunder2 Blog: Controller', function() {
    var q, rootScope, scope, controller, httpBackend, state, mainFactory, mockMainData, mockUrl;
    mockUrl = 'app/data/blog.json';

    beforeEach(function () {
        module('JetThunder2');
        module('mockMainData.json');
        module(function($urlRouterProvider) {
            $urlRouterProvider.deferIntercept();
        });
        inject(function ($q, $rootScope, $controller, $httpBackend, $state, _mainFactory_, _mockMainData_) {
            q = $q;
            rootScope = $rootScope;
            scope = $rootScope.$new();
            controller = $controller('BlogCtrl', {$scope: scope});
            httpBackend = $httpBackend;
            state = $state;
            mainFactory = _mainFactory_;
            mockMainData = _mockMainData_;
        });
        spyOn(rootScope, '$broadcast').and.callThrough();
        spyOn(state, 'go');
        spyOn(mainFactory, 'getBlogItems').and.callFake(function () {
            var deferred = q.defer();
            deferred.resolve(mockMainData);
            return deferred.promise;
        });
        httpBackend.when('GET', mockUrl).respond(mockMainData);
    });

    describe('Blog Controller Tests', function () {
        it('Should have a controller', function () {
            expect(controller).toBeDefined();
        });
        it('Should activate the controller and get the blog data when calling getBlogItems()', function () {
            scope.$apply();
            controller.$onInit();
            scope.$apply();
            expect(controller.blogItems).toEqual(mockMainData.entries);
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