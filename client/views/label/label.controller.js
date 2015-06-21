'use strict';

angular.module('egtGsaProto')
  .controller('LabelCtrl', function ($scope,$routeParams, LabelFactory,labelDataService,$location) {
    var vm = this;

    vm.status = 'loading';
    vm.id = $routeParams.id;

    $scope.changeTab = function(tab) {
    	console.log("Here")
        $scope.view_tab = tab;
    };

    $scope.isArray = angular.isArray;

    $scope.search = function(facet, value){
    	var searchItem = facet + "=" + value;
    	 $location.path('/label-search').search(searchItem);
    };

    $scope.statusAcc = {
    	    isFirstOpen: true,
    	    isFirstDisabled: false
    	  };
    LabelFactory.load(vm.id).then(
      function (label) {
    	console.log(labelDataService.getData(label));
        vm.status = 'success';
        vm.label = label;
        $scope.labelDetails = labelDataService.getLabelDetails();
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
