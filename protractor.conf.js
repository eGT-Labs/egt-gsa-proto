exports.config = { // jshint ignore:line

  // The version is susceptible to change
  seleniumServerJar: './node_modules/gulp-protractor/node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
  // chromeDriver: './node_modules/gulp-protractor/node_modules/protractor/selenium/chromedriver',

  baseUrl: 'https://egt-gsa-catalyst.egt-labs.com/',

  capabilities: {
    browserName: 'firefox'
  },

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }

};
