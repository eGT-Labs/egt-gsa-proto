'use strict';

angular.module('egtGsaProto')
  .controller('LabelSearchCtrl', function (LabelFactory) {

    var vm = this;
    angular.extend(vm, {
      query: {
        fulltext: '',
        selectedFacets: { //data structure for which facets options are selected
          generic_name: [],
          brand_name: [],
          manufacturer_name: [],
          product_type: [],
          route: [],
          substance_name: [],
          pharm_class_cs: [],
          pharm_class_moa: [],
          pharm_class_epc: []
        },
        pageSize: 10,
        pageNum: 1
      },
      resp: null,
      facets: { //data structure for which facets are available
        generic_name: null,
        brand_name: null,
        manufacturer_name: null,
        product_type: null,
        route: null,
        substance_name: null,
        pharm_class_cs: null,
        pharm_class_moa: null,
        pharm_class_epc: null

      },
      respText: ''
    });


    var latestQuery;

    vm.executeQuery = function (resetPageNum) {

      var thisQuery = Date.now();
      latestQuery = thisQuery;

      if (resetPageNum) {
        vm.query.pageNum = 1;
      }



      LabelFactory.runQuery({
        search: (vm.query.fulltext || '""') + ' AND _exists_:openfda.spl_id', //TODO this is a hack
        limit: vm.query.pageSize,
        skip: (vm.query.pageNum - 1) * vm.query.pageSize
      }).then(
        function (resp) {
          if (latestQuery === thisQuery) {
            vm.resp = resp;
            vm.respText = angular.toJson(resp, true);
          } else {
            console.log('ignoring outdated query');
          }
        }
      )
    };

    vm.executeQuery(true);

  });
