'use strict';

var proxy = require('express-http-proxy');
var config = require('../config/environment');
var url = require('url');

/**
 * Provides a (mostly) transparent proxy to the OpenFDA search. The two changes are:
 *
 * 1) Inject our API key into the request (if it has been set)
 * 2) Instruct the client to cache all responses for 1 day (except for 429 TOO MANY REQUEST responses)
 */

module.exports = proxy('http://api.fda.gov', {
  decorateRequest: function (req) {

    // IF the server has been configured with an OpenFDA API key, attach the key to each proxied request.
    if (config.openFdaApiKey) {
      var pathObj = url.parse(req.path, true);
      delete pathObj.search;
      pathObj.query.api_key = config.openFdaApiKey;
      req.path = url.format(pathObj);
    }
    return req;
  },
  intercept: function (responseIn, data, req, responseOut, callback) {
    if (responseIn.statusCode !== 429) { // Don't tell the client to cache the "TOO MANY REQUESTS" error
      responseOut.set('cache-control', 'max-age=86400');
    }
    callback(null, data);
  }
});
