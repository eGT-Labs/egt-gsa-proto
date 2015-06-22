'use strict';

angular.module('egtGsaProto', [
  'ngRoute',
  'ngAnimate',
  'ui.bootstrap',
  'googlechart'
])
  .config(function ($routeProvider, $locationProvider) {

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

  });
