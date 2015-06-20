'use strict';

describe('event-substance route', function () {

  beforeEach(function () {
    browser.get('/event/substance/:name');
  });

  it('should have a basic content', function () {
    expect(element.all(by.css('div')).first().getText()).toBe('EventSubstanceCtrl');
  });

});
