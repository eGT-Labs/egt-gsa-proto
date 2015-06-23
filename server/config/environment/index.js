'use strict';

var path = require('path');
var _ = require('lodash');

var all = {
  openFdaApiKey: process.env.OPEN_FDA_API_KEY,
  env: process.env.NODE_ENV || 'development',
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 9000
};

module.exports = _.merge(all, require('./' + all.env + '.js'));
