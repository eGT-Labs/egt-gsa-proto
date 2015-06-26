'use strict';

angular.module('egtGsaProto')
  .factory('EventService', function ($q, apiService) {

    function runQuery(params) {
      return apiService('/api/proxy/drug/event.json', params);
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
      });
    }

    function totalEventsForOutput(inputType, outputType, outputValue) {
      return apiService('/api/countEvents', {
        type: outputType,
        value: outputValue,
        otherType: inputType
      }).then(function (resp) {
        return resp.data.count;
      });
    }

    function termFrequencyCount(inputType, outputType, inputValue, countType) {
      return runQuery({
        search: '_exists_:(' + outputType + ') AND ' + inputType + ':("' + inputValue + '")',
        count: countType
      }).then(function (resp) {

        return resp.data.results;
      });
    }

    function overallFrequencyCount(inputType, outputType, countType) {
      return runQuery({
        search: '_exists_:(' + outputType + ') AND _exists_:(' + inputType + ')',
        count: countType
      }).then(function (resp) {

        return resp.data.results;
      });
    }

    function leadingOutputs(inputType, outputType, inputValue) {
      return runQuery({
        search: '_exists_:(' + outputType + ') AND ' + inputType + ':("' + inputValue + '")',
        count: outputType
      }).then(function (resp) {
        return resp.data.results;
      });
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
      var genderCountPromise = termFrequencyCount(inputType, outputType, inputValue, 'patient.patientsex');
      var ageCountPromise = termFrequencyCount(inputType, outputType, inputValue, 'patient.patientonsetage');
      var outcomeCountPromise = termFrequencyCount(inputType, outputType, inputValue, 'patient.reaction.reactionoutcome');
      var weightCountPromise = termFrequencyCount(inputType, outputType, inputValue, 'patient.patientweight');

      var normalAgeCountPromise = overallFrequencyCount(inputType, outputType, 'patient.patientonsetage');
      var normalWeightCountPromise = overallFrequencyCount(inputType, outputType, 'patient.patientweight');

      var leadingOutputsPromise = leadingOutputs(inputType, outputType, inputValue)
        .then(function (leadingSideEffects) {
          var promises = leadingSideEffects.slice(0, 50).map(function (output) {
            return totalEventsForOutput(inputType, outputType, output.term).then(function (totalCount) {
              return {
                term: output.term,
                count: output.count,
                inputTerm: inputValue,
                totalCount: totalCount
              };
            });
          });
          return $q.all(promises).then(function (list) {
            return _.reject(list, {totalCount: 0});
          });
        });

      var result = $q.all(
        [inputEventCountPromise, totalEventCountPromise, leadingOutputsPromise, genderCountPromise, ageCountPromise,
          outcomeCountPromise, weightCountPromise, normalAgeCountPromise, normalWeightCountPromise]
      ).then(function (resolvedPromises) {
          var inputEventCount = resolvedPromises[0];
          var totalEventCount = resolvedPromises[1];
          var leadingOutputs = resolvedPromises[2];

          // Computes the reporting ratio for each correlation
          // See wikipedia for formula: https://en.wikipedia.org/wiki/Proportional_reporting_ratio
          angular.forEach(leadingOutputs, function (output) {
            var eventsLinkedToDifferentInput = output.totalCount - output.count;
            var countOtherInputs = totalEventCount - inputEventCount;
            var freqOfOutputForDifferentInput = (eventsLinkedToDifferentInput / countOtherInputs);

            output.frequencyOfOther = freqOfOutputForDifferentInput;
            output.frequency = (output.count / inputEventCount);

            output.reportingRatio = output.frequency / freqOfOutputForDifferentInput;
          });

          return {
            inputEventCount: inputEventCount,
            totalEventCount: totalEventCount,
            leadingOutputs: leadingOutputs,
            genderCount: resolvedPromises[3],
            ageCount: resolvedPromises[4],
            outcomeCount: resolvedPromises[5],
            weightCount: resolvedPromises[6],
            normalAgeCount: resolvedPromises[7],
            normalWeightCount: resolvedPromises[8]
          };
        });

      return result;
    }

    return {
      computeReportingRatio: computeReportingRatio
    };

  });
