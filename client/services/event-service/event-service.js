'use strict';

angular.module('egtGsaProto')
  .factory('EventService', function ($http, $q) {


    var ERROR_SENTINEL = "ERROR";

    function runQuery(params) {

      return $http.get('/api/proxy/drug/event.json', {params: params});

    }


    function eventCountForInput(inputType, outputType, inputValue) {
      return runQuery({
        search: '_exists_:(' + outputType + ') AND ' + inputType + ':("' + inputValue + '")',
        limit: 1
      }).then(function (resp) {
        return resp.data.meta.results.total;
      });
    }

    function totalEvents(inputType, outputType) {
      return runQuery({
        search: '_exists_:(' + outputType + ') AND _exists_:(' + inputType + ')',
        limit: 1
      }).then(function (resp) {
        return resp.data.meta.results.total;
      })
    }

    function totalEventsForOutput(inputType, outputType, outputValue) {


      return runQuery({
        search: outputType + ':"' + outputValue + '" AND _exists_:(' + inputType + ')',
        limit: 1
      }).then(function (resp) {
          return resp.data.meta.results.total;
        }, function (err) {
          console.log('Could not process PRR request for value: ' + outputValue + '. (Most likely due to special characters');
          return ERROR_SENTINEL;
        }
      )
    }

    function genderCount(inputType, outputType, inputValue) {
      return runQuery({
        search: '_exists_:(' + outputType + ') AND ' + inputType + ':("' + inputValue + '")',
        count: 'patient.patientsex'
      }).then(function (resp) {

        var result = {
          male: 0,
          female: 0
        };
        angular.forEach(resp.data.results, function (row) {
          if (row.term == 1) {
            result.male = row.count;
          } else if (row.term == 2) {
            result.female = row.count;
          }
        });

        return result;
      })
    }


    function leadingOutputs(inputType, outputType, inputValue) {
      return runQuery({
        search: '_exists_:(' + outputType + ') AND ' + inputType + ':("' + inputValue + '")',
        count: outputType
      }).then(function (resp) {
        return resp.data.results;
      })
    }


    /**
     * Computes the Proportional Reporting Ratio for a given set of fields using the adverse event dataset.
     * Usage should be limited to fields that don't have special characters (and thus suffer from the API limitation)
     *
     * https://en.wikipedia.org/wiki/Proportional_reporting_ratio
     *
     * @param inputType which openfda field to use for the input
     * @param outputType The field to build the PRR linkage for
     * @param inputValue The value for the input filed
     * @returns {}
     */
    function computeReportingRatio(inputType, outputType, inputValue) {


      var inputEventCountPromise = eventCountForInput(inputType, outputType, inputValue);
      var totalEventCountPromise = totalEvents(inputType, outputType);
      var genderCountPromise = genderCount(inputType, outputType, inputValue);

      var leadingOutputsPromise = leadingOutputs(inputType, outputType, inputValue)
        .then(function (leadingSideEffects) {
          var promises = leadingSideEffects.slice(0, 50).map(function (output) {
            return totalEventsForOutput(inputType, outputType, output.term).then(function (totalCount) {
              return {
                term: output.term,
                count: output.count,
                totalCount: totalCount
              };
            })
          });
          return $q.all(promises).then(function (list) {
            return _.reject(list, {totalCount: ERROR_SENTINEL});
          });
        });

      var result = $q.all(
        [inputEventCountPromise, totalEventCountPromise, leadingOutputsPromise, genderCountPromise]
      ).then(function (array) {
          var inputEventCount = array[0];
          var totalEventCount = array[1];
          var leadingOutputs = array[2];

          angular.forEach(leadingOutputs, function (output) {
            var eventsLinkedToDifferentInput = output.totalCount - output.count;
            var countOtherInputs = totalEventCount - inputEventCount;
            var freqOfOutputForDifferentInput = (eventsLinkedToDifferentInput / countOtherInputs);


            output.frequency = (output.count / inputEventCount);

            output.reportingRatio = output.frequency / freqOfOutputForDifferentInput;
          });

          return {
            inputEventCount: inputEventCount,
            totalEventCount: totalEventCount,
            leadingOutputs: leadingOutputs,
            genderCount: array[3]
          };
        });

      return result;
    }


    return {
      computeReportingRatio: computeReportingRatio
    };

  });
