'use strict';

angular.module('egtGsaProto')
  .controller('EventSubstanceCtrl', function ($routeParams, EventService) {

    var vm = this;

    vm.name = $routeParams.name;

    angular.extend(vm, {
      adverseEvents: null,
      sortBy: 'reportingRatio'
      //name: 'EventSubstanceCtrl'
    });

    EventService.computeReportingRatio('substance_name', vm.name).then(function(result) {
      vm.adverseEvents = result;
      vm.sort();
    });


    vm.sort = function() {
      if (vm.adverseEvents) {
        var isAscending = (vm.sortBy === 'term');
        vm.adverseEvents.symptoms = _.sortByOrder(vm.adverseEvents.symptoms, vm.sortBy, isAscending);
      }
    }

  });
