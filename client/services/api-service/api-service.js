/**
 * This service retries the OpenFDA service invocation after a delay if the response is a 429 "too many requests error.
 * It waits a random amount of time (on average 4 seconds) before retrying the request again.
 */
angular.module('egtGsaProto')
  .factory('ApiService', function ($http, $q, $timeout) {


    var MAX_TRIES = 4;

    function doWithRetries(service, params, timesTried) {
      return $http.get(service, {params: params})
        .catch(function (err) {
          console.log('failure');
          console.log(err);

          if (timesTried <= MAX_TRIES && err.status === 429) { //hit rate limiting... slow down and try again
            return $q(function (resolve, reject) {
              $timeout(function () {
                console.log('tried loading ' + timesTried);
                doWithRetries(service, params, timesTried + 1).then(resolve, reject);
              }, timesTried * 2000 * Math.random());
            });
          } else {
            return err;
          }
        });
    }


    return function (service, params) {
      return doWithRetries(service, params, 1);
    }

  });
