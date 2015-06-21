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

    EventService.computeReportingRatio('patient.drug.openfda.substance_name.exact', 'patient.reaction.reactionmeddrapt.exact', vm.name).then(function(result) {
      vm.adverseEvents = result;
      vm.sort();
    });


    vm.sort = function() {
      if (vm.adverseEvents) {
        var isAscending = (vm.sortBy === 'term');
        vm.adverseEvents.leadingOutputs = _.sortByOrder(vm.adverseEvents.leadingOutputs, vm.sortBy, isAscending);
      }
    }

  });
