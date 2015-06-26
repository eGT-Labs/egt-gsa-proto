'use strict';

/**
 * Filter that will abbreviate a string to the maximum number of characters,
 * optionally respecting word boundaries
 */
angular.module('egtGsaProto')
  .filter('cut', function () {
    return function (value, wordwise, max, tail) {
      if (!value) {
        return '';
      }

      max = parseInt(max, 10);
      if (!max || value.length <= max) {
        return value;
      }

      value = value.substr(0, max);
      if (wordwise) {
        var lastspace = value.lastIndexOf(' ');
        if (lastspace !== -1) {
          value = value.substr(0, lastspace);
        }
      }

      return value + (tail || ' …');
    };
  });
