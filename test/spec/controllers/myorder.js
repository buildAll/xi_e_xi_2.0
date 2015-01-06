'use strict';

describe('Controller: MyorderCtrl', function () {

  // load the controller's module
  beforeEach(module('cloudLaundryApp'));

  var MyorderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyorderCtrl = $controller('MyorderCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
