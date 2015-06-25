'use strict';

var config = require('./config/environment');
var proxy = require('express-http-proxy');
var url = require('url');
var superagent = require('superagent');
var Promise = require("bluebird");
var LRU = require("lru-cache");


var eventCountCache = LRU({
  max: 1000000,
  maxAge: 1000 * 60 * 60 * 24  * 7 //one week
});


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
      if (responseIn.statusCode !== 429) { //Don't tell the client to cache the "TOO MANY REQUESTS" error
        console.log('exceeded API limit')
        responseOut.set('cache-control', 'max-age=86400');
      }
      callback(null, data);
    }
  }));

  app.route('/api/countEvents')
    .get(function (req, res) {
      var type = req.query.type;
      var value = req.query.value;
      var otherType = req.query.otherType;

      var elasticSeearchQuery = type + ':"' + value + '"+AND+_exists_:(' + otherType + ')';
      var countPromise = new Promise(function (resolve, reject) {
        var cacheValue = eventCountCache.get(elasticSeearchQuery);

        if (cacheValue) {
          resolve(cacheValue);
        } else {
          var queryWithKey = elasticSeearchQuery;
          if (config.openFdaApiKey) {
            queryWithKey += '&api_key=' + config.openFdaApiKey;
          }
          superagent.get('http://api.fda.gov/drug/event.json?limit=1&search=' + queryWithKey)
            .end(function (err, res) {
              if (err) {
                if (err.status == 404 || err.status == 400) {
                  eventCountCache.set(elasticSeearchQuery, 0);
                  resolve(0);
                } else {
                  reject(err.status);
                }
                console.log(err.status)
              } else {
                var count = res.body.meta.results.total
                eventCountCache.set(elasticSeearchQuery, count)
                resolve(count);
              }
            });
        }
      });

      countPromise.then(
        function (count) {
          res
            .set('cache-control', 'max-age=86400')
            .send({count: count});
        }, function (errStatus) {
          res
            .status(errStatus)
            .end();
        });
    }
  )
  ;

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

}
;
