'use strict';

angular.module('egtGsaProto')
  .controller('LabelSearchCtrl', function (LabelFactory, $location) {

    var vm = this;
    angular.extend(vm, {
      search: {

      },
      query: {
        ////fulltext: '',
        //facets: { //data structure for which facets options are selected
        //},
        pageSize: 10,
        pageNum: 1
      },
      resp: null,
      facets: { //data structure for which facets are available
        generic_name: {
          label: "Generic Name",
          data: null
        },
        brand_name: {
          label: "Brand Name",
          data: null
        },
        manufacturer_name: {
          label: "Manufacturer",
          data: null
        },
        product_type: {
          label: "Product Type",
          data: null
        },
        route: {
          label: "Route",
          data: null
        },
        substance_name: {
          label: "Substance",
          data: null
        },
        pharm_class_cs: {
          label: "Chemical structure",
          data: null
        },
        pharm_class_moa: {
          label: "Mechanism of action",
          data: null
        },
        pharm_class_epc: {
          label: "Established pharmacologic class",
          data: null
        }
      },
      respText: ''
    });

    angular.extend(vm.search, $location.search());

    vm.isFacetSelected = function(facetName, value) {
      var field = ['facet', facetName].join('.');
      return vm.search[field] === value;
    };





    vm.toggleFacet = function(facetName, value) {

      var field = ['facet', facetName].join('.');


      if (vm.search[field] === value) {
        delete vm.search[field];
      } else {
        vm.search[field] = value;
      }

      vm.newSearch();
    };


    vm.newSearch = function() {
      $location.search(vm.search);
    };

   


    var latestQuery;
    vm.executeQuery = function (resetPageNum) {

      var thisQuery = Date.now();
      latestQuery = thisQuery;

      if (resetPageNum) {
        vm.query.pageNum = 1;
      }


      var searchString = (vm.search.fulltext || '""') + ' AND _exists_:openfda.spl_id'; //TODO this is a hack

      angular.forEach(vm.search, function(value, key) {
        var keyParts = key.split('.');
        if (keyParts[0] === 'facet') {
          var fieldName = keyParts[1];

          searchString += ' AND openfda.' + fieldName + '.exact:"' + value + '"';

        }

        console.log(key);
        console.log(value);
      });






      LabelFactory.runQuery({
        search: searchString,
        limit: vm.query.pageSize,
        skip: (vm.query.pageNum - 1) * vm.query.pageSize
      }).then(
        function (resp) {
          if (latestQuery === thisQuery) {
            vm.resp = resp;
            vm.respText = angular.toJson(resp, true);

            if (resetPageNum) { //we only need to recalcuate the facets when the page resets

              angular.forEach(vm.facets, function (currentValue, facetName) {

                vm.facets[facetName].data = null; //wipe the old info

                var countString = ['openfda', facetName, 'exact'].join('.');

                LabelFactory.runQuery({
                  search: searchString,
                  count: countString
                }).then(function(facetResp) {
                  if (latestQuery === thisQuery) {
                    vm.facets[facetName].data = facetResp.data.results;
                  }
                });
              });
            }
          }
        }
      )
    };

    vm.executeQuery(true);





  });
