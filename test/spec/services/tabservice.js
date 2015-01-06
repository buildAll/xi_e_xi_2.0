'use strict';

describe('Service: tabService', function () {

  // load the service's module
  beforeEach(module('cloudLaundryApp'));

  // instantiate service
  var tabService;
  beforeEach(inject(function (_tabService_) {
    tabService = _tabService_;
  }));

  it('should do something', function () {
    expect(!!tabService).toBe(true);
  });

});
