'use strict';

describe('toJson filter', function () {

  beforeEach(module('egtGsaProto'));

  var toJson;

  beforeEach(inject(function ($filter) {
    toJson = $filter('toJson');
  }));

  it('should ...', function () {
    var text = 'bangular is awesome';
    expect(toJson(text)).toBe(text);
  });

});
