describe("Book Tests", function() {
    var element;
    var scope;
    beforeEach(module("masteringAngularJsDirectives"))
    beforeEach(inject(function($compile, $rootScope) {
        scope = $rootScope;
        element = angular.element("<booktest title='test'></booktest>");
        $compile(element)($rootScope)
        scope.$digest()
    }));

    it("directive should be successfully compiled", function() {
        expect(element.html()).toBe("test")
    });

    it("scope liked should be true when book liked", function() {
        element.triggerHandler("click");
        expect(element.isolateScope().viewed).toBe(true);
    });
});