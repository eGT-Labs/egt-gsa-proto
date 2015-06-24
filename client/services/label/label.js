'use strict';

angular.module('egtGsaProto')
  .factory('LabelFactory', function (ApiService) {


    function buildQuery(search) {

      var queryStringParts = [];

      queryStringParts.push('_exists_:openfda.spl_id'); //We only want to use the records that have openfda sections


      var coreFields = ['openfda.brand_name', 'openfda.generic_name', 'openfda.substance_name', 'indications_and_usage', 'description'];


      //add the raw fulltext if it exists
      if (search.fulltext) {
        if (!search.useAllFields || search.useAllFields === 'false') {
          var fulltextParts = _.map(coreFields, function (field) {
            return field + ':(' + search.fulltext + ')'
          });

          queryStringParts.push('(' + fulltextParts.join(' OR ') + ')');

        } else {
          queryStringParts.push(search.fulltext);
        }
      }

      //find the keys that start with 'facet.'
      angular.forEach(search, function (value, key) {
        var keyParts = key.split('.');
        if (keyParts[0] === 'facet') {
          var field = keyParts[1];
          queryStringParts.push(facetQuery(field, value));
        }
      });


      return queryStringParts.join(' AND ');
    }

    var UNSUPPORTED_API_CHARS = new RegExp('[^0-9a-zA-Z\.\_\:\(\)\"\\[\\]\{\}\\-\\+\>\<\= ]+');


    /**
     * Some of that data we want to facet over contains characters that the API will reject.
     * Attempt to look for an exact match for the value we request. If the value contains unsupported characters,
     * split on those and just ensure that each section individually is present.
     * @param name
     * @param value
     * @returns {string}
     */
    function facetQuery(name, value) {

      var split = value.split(UNSUPPORTED_API_CHARS);

      if (split.length === 1) {
        return 'openfda.' + name + '.exact:"' + value + '"';
      } else {

        var sections = [];

        angular.forEach(split, function (valuePart) {
          if (valuePart) {
            sections.push('"' + valuePart + '"');
          }
        });

        return 'openfda.' + name + ':(' + sections.join(" AND ") + ')';
      }
    }


    return {

      buildQuery: buildQuery,

      /**
       * Returns (as a promise) the data object for a single label.
       * @param id
       */
      load: function (id) {

        return ApiService('/api/proxy/drug/label.json', {
          search: 'openfda.spl_id:"' + id + '"'
        }).then(function (resp) {
          return resp.data.results[0];
        });
      },

      runQuery: function (params) {
        return ApiService('/api/proxy/drug/label.json', params);
      }

    };
  });




