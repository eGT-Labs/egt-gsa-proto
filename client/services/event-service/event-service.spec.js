'use strict';

describe('Factory: EventService', function () {

  beforeEach(module('egtGsaProto'));

  var EventService;

  beforeEach(inject(function (_EventService_) {
    EventService = _EventService_;
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
