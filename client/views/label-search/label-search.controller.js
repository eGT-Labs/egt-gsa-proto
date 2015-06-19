'use strict';

angular.module('egtGsaProto')
  .controller('LabelSearchCtrl', function (LabelFactory) {

    var vm = this;
    angular.extend(vm, {
      query: {
        fulltext: '',
        selectedFacets: {},
        pageSize: 50,
        pageNum: 1
      },
      resp: null,
      respText: ''

    });

    vm.pageCount = function() {
      if (vm.resp) {
        var count = vm.resp.data.meta.results.total;
        return Math.ceil(count / vm.query.pageSize);
      } else {
        return 0;
      }
    };


    vm.executeQuery = function () {
      console.log('clicked!');

      LabelFactory.runQuery({
        search: vm.query.fulltext,
        limit: vm.query.pageSize,
        skip: (vm.query.pageNum - 1) * vm.query.pageSize
      }).then(
        function (resp) {

          console.log('response')

          vm.resp = resp;
          vm.respText = angular.toJson(resp,true);


        }
      )
    };


  });
