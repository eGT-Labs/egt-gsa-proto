'use strict';

angular.module('egtGsaProto')
  .controller('LabelCtrl', function ($scope,$routeParams, LabelFactory) {
    var vm = this;

    vm.status = 'loading';
    vm.id = $routeParams.id;


    $scope.isArray = angular.isArray;
    
    LabelFactory.load(vm.id).then(
      function (label) {
        vm.status = 'success';
        vm.label = label;
        vm.rawString = angular.toJson(label, true);
      }, function (err) {
        vm.status = 'error';
      });

  })
  .filter('to_trusted', ['$sce', function($sce){
    return function(text) {
      return $sce.trustAsHtml(text);
    };
  }]);
