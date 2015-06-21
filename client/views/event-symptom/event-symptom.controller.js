'use strict';

angular.module('egtGsaProto')
  .controller('EventSymptomCtrl', function ($routeParams, EventService) {

    var vm = this;

    angular.extend(vm, {
      name: $routeParams.name,
      adverseEvents: null,
      sortBy: 'reportingRatio'
    });



    EventService.computeReportingRatio('patient.reaction.reactionmeddrapt.exact', 'patient.drug.openfda.substance_name.exact', vm.name).then(function(result) {
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
