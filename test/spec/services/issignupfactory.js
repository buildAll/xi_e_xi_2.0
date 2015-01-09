'use strict';

describe('Service: isSignUpFactory', function () {

  // load the service's module
  beforeEach(module('cloudLaundryApp'));

  // instantiate service
  var isSignUpFactory;
  beforeEach(inject(function (_isSignUpFactory_) {
    isSignUpFactory = _isSignUpFactory_;
  }));

  it('should do something', function () {
    expect(!!isSignUpFactory).toBe(true);
  });

});
