'use strict';

angular.module('egtGsaProto')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/about', {
        templateUrl: 'views/about/about.html'
      });
  });
