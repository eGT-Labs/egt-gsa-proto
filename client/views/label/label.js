'use strict';

angular.module('egtGsaProto')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/label/:id', {
        templateUrl: 'views/label/label.html',
        controller: 'LabelCtrl',
        controllerAs: 'vm'
      });
  });
