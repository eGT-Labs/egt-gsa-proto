'use strict';

describe('label-search route', function () {

  it('should have facets', function () {
    browser.get('/label-search');

    var result = element.all(by.css('body > div.container.ng-scope > div.row.ng-scope > div.col-sm-4 > accordion > div > div:nth-child(1) > div > div.panel-heading > h4 > a > div')).first().getText();
    expect(result).toContain('Brand Name');
  });

  it('should show search results', function () {
    browser.get('/label-search');
    var search_box = element(by.css('#searchText'));
    var submit_button = element(by.css('button.btn-primary'));
    var search = 'TYLENOL';

    search_box.sendKeys(search);
    submit_button.click();

    var result = element.all(by.repeater('row in vm.resp.data.results')).get(0).getText();
    expect(result).toContain('ACETAMINOPHEN');
  });

  it('should display an error with no results', function () {
    browser.get('/label-search');
    var search_box = element(by.css('#searchText'));
    var submit_button = element(by.css('button.btn-primary'));
    var search = 'foobarbaz';

    search_box.sendKeys(search);
    submit_button.click();

    expect(element.all(by.css('#mainResults')).first().getText()).toContain('0 drug labels match your search');
  });

});
