'use strict';

/**
 * Converts a string into it's pretty-print JSON representation.
 */
angular.module('egtGsaProto')
  .filter('toJson', function () {
    return function (input) {
      return angular.toJson(input, true);
    };
  });
