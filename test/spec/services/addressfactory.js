'use strict';

describe('Service: addressFactory', function () {

  // load the service's module
  beforeEach(module('cloudLaundryApp'));

  // instantiate service
  var addressFactory;
  beforeEach(inject(function (_addressFactory_) {
    addressFactory = _addressFactory_;
  }));

  it('should do something', function () {
    expect(!!addressFactory).toBe(true);
  });

});
