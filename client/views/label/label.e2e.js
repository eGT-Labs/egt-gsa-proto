'use strict';

describe('label route', function () {

  beforeEach(function () {

  });

  it('should have basic content for the drug Claritin', function () {

    browser.get('/label/e225144b-e9d6-439f-8785-01bdb350a080');
    expect(element.all(by.css('body > div.container.ng-scope > div > div > div.row > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)')).first().getText()).toContain('PSEUDOEPHEDRINE SULFATE');
  });



    //expect(element.all(by.css('div')).first().getText()).toBe('LabelCtrl');
  });

});
