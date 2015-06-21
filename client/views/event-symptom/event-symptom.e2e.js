'use strict';

describe('event-symptom route', function () {

  beforeEach(function () {
    browser.get('/event/symptom/:name');
  });

  it('should have a basic content', function () {
    expect(element.all(by.css('div')).first().getText()).toBe('EventSymptomCtrl');
  });

});
