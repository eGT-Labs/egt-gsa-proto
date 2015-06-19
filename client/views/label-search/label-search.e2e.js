'use strict';

describe('label-search route', function () {

  beforeEach(function () {
    browser.get('/label-search');
  });

  it('should have a basic content', function () {
    expect(element.all(by.css('div')).first().getText()).toBe('LabelSearchCtrl');
  });

});
