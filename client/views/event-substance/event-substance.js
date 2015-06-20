'use strict';

angular.module('egtGsaProto')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/event/substance/:name', {
        templateUrl: 'views/event-substance/event-substance.html',
        controller: 'EventSubstanceCtrl',
        controllerAs: 'vm'
      });
  });
