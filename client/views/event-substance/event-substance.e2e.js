'use strict';

describe('event-substance route', function () {

  beforeEach(function () {
  });

  it('should display the correct #1 symptom', function () {

    browser.get('/event/substance/NITROGLYCERIN');


    var firstResult = element.all(by.css('body > div.container.ng-scope > div > div.col-md-6.ng-scope > table > tbody > tr:nth-child(1)')).first().getText()

    expect(firstResult).toContain('RENAL INJURY');
    expect(firstResult).toContain('86.617');
    expect(firstResult).toContain('600');




  });

});
