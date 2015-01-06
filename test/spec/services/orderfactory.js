'use strict';

describe('Service: orderFactory', function () {

  // load the service's module
  beforeEach(module('cloudLaundryApp'));

  // instantiate service
  var orderFactory;
  beforeEach(inject(function (_orderFactory_) {
    orderFactory = _orderFactory_;
  }));

  it('should do something', function () {
    expect(!!orderFactory).toBe(true);
  });

});
