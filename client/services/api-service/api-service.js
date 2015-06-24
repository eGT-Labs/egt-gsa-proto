/**
 * This service retries the OpenFDA service invocation after a delay if the response is a 429 "too many requests error.
 * It waits a random amount of time (on average 2 seconds) before retrying the request again.
 */
angular.module('egtGsaProto')
  .factory('ApiService', function ($http, $q, $timeout) {
    function doWithRetries(service, params, retries) {
      return $http.get(service, {params: params})
        .catch(function (err) {
          console.log('failure');
          console.log(err);

          if (retries > 0 && err.status === 429) { //hit rate limiting... slow down and try again
            return $q(function (resolve, reject) {
              $timeout(function () {
                console.log('retrying ' + retries + ' more times');
                doWithRetries(service, params, retries - 1).then(resolve, reject);
              }, 2000 * Math.random());
            });
          } else {
            return err;
          }
        });
    }


    return function (service, params) {
      return doWithRetries(service, params, 3);
    }

  });
