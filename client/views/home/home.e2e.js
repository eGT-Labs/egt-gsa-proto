'use strict';

describe('home route', function () {

  beforeEach(function () {

  });

  it('should have a basic content', function () {

    browser.get('/');


    //TODO this test works now, but should change
    expect(element.all(by.css('h1')).first().getText()).toBe('The homepage!!!');
  });

});
