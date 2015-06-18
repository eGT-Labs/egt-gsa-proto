'use strict';

angular.module('egtGsaProto')
  .controller('LabelCtrl', function ($routeParams, LabelFactory) {
    var vm = this;

    vm.status = 'loading';
    vm.id = $routeParams.id;


    LabelFactory.load(vm.id).then(
      function (label) {
        vm.status = 'success';
        vm.label = label;
        vm.rawString = angular.toJson(label, true);
      }, function (err) {
        vm.status = 'error';
      });

  });
