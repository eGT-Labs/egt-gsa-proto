'use strict';

angular.module('egtGsaProto')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/label-search', {
        templateUrl: 'views/label-search/label-search.html',
        controller: 'LabelSearchCtrl',
        controllerAs: 'vm'
      });
  });
