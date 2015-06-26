'use strict';

var config = require('./config/environment');

module.exports = function (app) {

  // Create our own proxy of the FDA open API, with the addition of aggressive caching (84000 seconds == 1 day) to trigger fewer requests
  app.use('/api/proxy',
    require('./api/fdaProxy'));

  // Custom wrapper for OpenFDA API to retrieve just the count for a class of adverse events.
  app.route('/api/countEvents')
    .get(require('./api/countEvents'));

  // 404 handler
  app.route('/:url(api|app|bower_components|assets)/*')
    .get(function (req, res) {
      res.status(404).end();
    });

  // default route that returns our index.html page for any othe request. This is critical to allow our
  // client-side angularr router to parse the URL path and make routing decisions.
  app.route('/*')
    .get(function (req, res) {
      res.sendFile(
        app.get('appPath') + '/index.html',
        { root: config.root }
      );
    });

}
;
