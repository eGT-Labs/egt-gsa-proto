'use strict';

angular.module('egtGsaProto')
  .directive('relatedRecalls', function ($http) {
    return {
      restrict: 'EA',
      templateUrl: 'directives/related-recalls/related-recalls.html',
      scope: {
        id: '='
      },
      link: function (scope, element) {
        $http.get('https://api.fda.gov/drug/enforcement.json?limit=50&search=openfda.spl_id.exact="' + scope.id + '"')
          .then(function(recallsResp) {
            scope.recallData = recallsResp.data;
          });
      }
    };
  });
