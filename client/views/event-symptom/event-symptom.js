'use strict';

angular.module('egtGsaProto')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/event/symptom/:name', {
        templateUrl: 'views/event-symptom/event-symptom.html',
        controller: 'EventSymptomCtrl',
        controllerAs: 'vm'
      });
  });
