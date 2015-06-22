'use strict';

describe('label-search route', function () {

  it('should have facets', function () {
    browser.get('/label-search');

    expect(element.all(by.css('body > div.container.ng-scope > div.row.ng-scope > div.col-sm-4 > accordion > div > div:nth-child(1) > div > div.panel-heading > h4 > a > div')).first().getText()).toBe('Brand Name (100)');
  });

});
