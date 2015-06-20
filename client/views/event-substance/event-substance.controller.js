'use strict';

angular.module('egtGsaProto')
  .controller('EventSubstanceCtrl', function ($routeParams, EventService) {

    var vm = this;

    vm.name = $routeParams.name;

    angular.extend(vm, {
      sideEffects: null,
      sortBy: 'reportingRatio'
      //name: 'EventSubstanceCtrl'
    });

    EventService.computeReportingRatio('substance_name', vm.name).then(function(result) {
      vm.sideEffects = result;
      vm.sort();
    });


    vm.sort = function() {
      if (vm.sideEffects) {
        var isAscending = (vm.sortBy === 'term');
        vm.sideEffects = _.sortByOrder(vm.sideEffects, vm.sortBy, isAscending);
      }
    }

  });
