'use strict';

describe('event-substance route', function () {

  beforeEach(function () {
  });

  it('should display the correct #1 symptom', function () {

    browser.get('/event/substance/NITROGLYCERIN');
    var firstResult = element.all(by.css('#mainResults')).first().getText();

    expect(firstResult).toContain('RENAL INJURY');
    expect(firstResult).toContain('86.617');
    expect(firstResult).toContain('600');
  });
});
