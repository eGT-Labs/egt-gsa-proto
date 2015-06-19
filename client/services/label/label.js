'use strict';

angular.module('egtGsaProto')
  .factory('LabelFactory', function ($http) {


    return {

      /**
       * Returns (as a promise) the data object for a single label.
       * @param id
       */
      load: function(id) {

        var query = 'search=openfda.spl_id:"' + id + '"';


        return $http.get('/api/proxy/drug/label.json?' + query)
          .then(function (resp) {
            return resp.data.results[0];
        });


      }
    };
  });
