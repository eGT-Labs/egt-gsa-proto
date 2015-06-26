'use strict';

var config = require('../config/environment');
var superagent = require('superagent');
var Promise = require('bluebird');
var LRU = require('lru-cache');

var eventCountCache = LRU({
  max: 1000000,
  maxAge: 1000 * 60 * 60 * 24 * 7 // one week
});

/**
 * Handles API requests for the count of adverse events matching a particular symptom or drug.
 * This is the largest query volumne generated by the app, so a per-process cache is used to store the counts
 * for use on subsequent requests.
 *
 * TODO: The caching logic could be extracted out into its own
 */
module.exports = function (req, res) {
  var type = req.query.type;
  var value = req.query.value;
  var otherType = req.query.otherType;

  var query = type + ':"' + value + '"+AND+_exists_:(' + otherType + ')';

  // Generates a promise containing the correct count of adverse reactions
  var countPromise = new Promise(function (resolve, reject) {
    var cacheValue = eventCountCache.get(query);

    if (cacheValue) {
      resolve(cacheValue);
    } else {
      var queryWithKey = query;
      if (config.openFdaApiKey) {
        queryWithKey += '&api_key=' + config.openFdaApiKey;
      }
      superagent.get('http://api.fda.gov/drug/event.json?limit=1&search=' + queryWithKey)
        .end(function (err, res) {
          if (err) {
            if (err.status === 404 || err.status === 400) {
              eventCountCache.set(query, 0);
              resolve(0);
            } else {
              reject(err.status);
            }
          } else {
            var count = res.body.meta.results.total;
            eventCountCache.set(query, count);
            resolve(count);
          }
        });
    }
  });

  // Populates the response based on wheter the promise was rejected or reesolved/
  countPromise.then(
    function (count) {
      res
        .set('cache-control', 'max-age=86400')
        .send({ count: count });
    }, function (errStatus) {
      res
        .status(errStatus)
        .end();
    });
};
