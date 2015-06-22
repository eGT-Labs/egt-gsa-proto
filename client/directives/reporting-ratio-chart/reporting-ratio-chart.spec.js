'use strict';

describe('Directive: reporting-ratio-chart', function () {

  beforeEach(module('egtGsaProto', 'templates'));

  var element, scope;

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = angular.element('<reporting-ratio-chart></reporting-ratio-chart>');
    element = $compile(element)(scope);
    scope.$apply();
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });
});
