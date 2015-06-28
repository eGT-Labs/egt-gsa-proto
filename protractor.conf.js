exports.config = { // jshint ignore:line

  // The version is susceptible to change
  seleniumServerJar: './node_modules/gulp-protractor/node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
  // chromeDriver: './node_modules/gulp-protractor/node_modules/protractor/selenium/chromedriver',

  baseUrl: 'https://egt-gsa-catalyst.egt-labs.com/',

  capabilities: {
    browserName: 'phantomjs',
    'phantomjs.binary.path': '/root/phantomjs/bin/phantomjs' //'node_modules/karma-phantomjs-launcher/node_modules/phantomjs/lib/phantom/bin/phantomjs'
  },

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }

};
