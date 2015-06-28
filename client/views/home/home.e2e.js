'use strict';

describe('home route', function () {

  beforeEach(function () {

  });

  it('should have a basic content', function () {

    browser.get('/');
    expect(element.all(by.css('.col-md-offset-4 > p:nth-child(2)')).first().getText()).toContain('OpenFDA');

  });

});
