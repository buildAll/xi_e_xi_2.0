'use strict';

describe('Service: wechatFactory', function () {

  // load the service's module
  beforeEach(module('cloudLaundryApp'));

  // instantiate service
  var wechatFactory;
  beforeEach(inject(function (_wechatFactory_) {
    wechatFactory = _wechatFactory_;
  }));

  it('should do something', function () {
    expect(!!wechatFactory).toBe(true);
  });

});
