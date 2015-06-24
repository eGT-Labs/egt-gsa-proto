'use strict';

angular.module('egtGsaProto')
  .controller('EventSymptomCtrl', function ($routeParams, EventService, $location) {

    var vm = this;

    angular.extend(vm, {
      name: $routeParams.name,
      adverseEvents: null,
      sortBy: 'reportingRatio'
    });

    vm.clickSubstance = function(substance) {
      $location.url('/event/substance/' + substance);
    };


    EventService.computeReportingRatio('patient.reaction.reactionmeddrapt.exact', 'patient.drug.openfda.substance_name.exact', vm.name).then(function(result) {
      vm.adverseEvents = result;
      vm.sort();
    }, function (errorResponse) {
      console.log("error!");
      console.log(errorResponse);
      vm.error = 'There are no events involving substance';
    });


    vm.sort = function() {
      if (vm.adverseEvents) {
        var isAscending = (vm.sortBy === 'term');
        vm.adverseEvents.leadingOutputs = _.sortByOrder(vm.adverseEvents.leadingOutputs, vm.sortBy, isAscending);
      }
    }





  });
