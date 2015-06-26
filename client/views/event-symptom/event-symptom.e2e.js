'use strict';

describe('event-symptom route', function () {

  beforeEach(function () {

  });

  it('should have the correct content for the symptom "FEELING JITTERY"', function () {

    browser.get('/event/symptom/FEELING%20JITTERY');

    expect(element.all(by.repeater('row in vm.adverseEvents.leadingOutputs')).get(0).getText()).toContain('EXENATIDE');
  });

});
