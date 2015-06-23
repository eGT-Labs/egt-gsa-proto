'use strict';

var config = require('./config/environment');
var proxy = require('express-http-proxy');
var url = require('url');


module.exports = function (app) {

  // Create our own proxy of the FDA open API, with the addition of aggressive caching (84000 seconds == 1 day) to trigger fewer requests
  app.use('/api/proxy', proxy('http://api.fda.gov', {
    decorateRequest: function (req) {
      //IF the server has been configured with an OpenFDA API key, attach the key to each proxied request.
      if (config.openFdaApiKey) {
        var pathObj = url.parse(req.path, true);
        delete pathObj.search;
        pathObj.query['api_key'] = config.openFdaApiKey;
        req.path = url.format(pathObj);
      }
      return req
    },
    intercept: function (responseIn, data, req, responseOut, callback) {
      responseOut.set('cache-control', 'max-age=86400');
      callback(null, data);
    }
  }));

  app.route('/:url(api|app|bower_components|assets)/*')
    .get(function (req, res) {
      res.status(404).end();
    });

  app.route('/*')
    .get(function (req, res) {
      res.sendFile(
        app.get('appPath') + '/index.html',
        {root: config.root}
      );
    });

};
