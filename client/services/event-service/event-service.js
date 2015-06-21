'use strict';

angular.module('egtGsaProto')
  .factory('EventService', function ($http, $q) {


    function runQuery(params) {

      return $http.get('/api/proxy/drug/event.json', {params: params});

    }


    function eventCountForDrug(type, name) {
      return runQuery({
        search: '_exists_:(patient.reaction.reactionmeddrapt.exact) AND patient.drug.openfda.' + type + '.exact:("' + name + '")',
        limit: 1
      }).then(function (resp) {
        return resp.data.meta.results.total;
      });
    }

    function totalEvents(type) {
      return runQuery({
        search: '_exists_:(patient.reaction.reactionmeddrapt.exact) AND _exists_:(patient.drug.openfda.' + type + '.exact)',
        limit: 1
      }).then(function (resp) {
        return resp.data.meta.results.total;
      })
    }

    function totalEventsWithSideEffect(type, effect) {
      return runQuery({
        search: 'patient.reaction.reactionmeddrapt.exact:"' + effect + '" AND _exists_:(patient.drug.openfda.' + type + '.exact)',
        limit: 1
      }).then(function (resp) {
        return resp.data.meta.results.total;
      })
    }


    function leadingSideEffectsOfDrug(type, name) {
      return runQuery({
        search: '_exists_:(patient.reaction.reactionmeddrapt.exact) AND patient.drug.openfda.' + type + '.exact:("' + name + '")',
        count: 'patient.reaction.reactionmeddrapt.exact'
      }).then(function (resp) {
        return resp.data.results;
      })
    }


    /**
     * Computes the Proportional reporting ration for a given
     * @param type which openfda field to use for the drug (substance_name seems to work best)
     * @param name Name of the drug
     * @returns {}
     */
    function computeReportingRatio(type, name) {

      var drugEventCountPromise = eventCountForDrug(type, name);
      var totalEventCountPromise = totalEvents(type);

      var sideEffectListPromise = leadingSideEffectsOfDrug(type, name)
        .then(function (leadingSideEffects) {
          var promises = leadingSideEffects.slice(0, 50).map(function (effect) {
            return totalEventsWithSideEffect(type, effect.term).then(function (totalCount) {
              return {
                term: effect.term,
                count: effect.count,
                totalCount: totalCount
              };
            })
          });
          return $q.all(promises);
        });

      var result = $q.all([drugEventCountPromise, totalEventCountPromise, sideEffectListPromise]).then(function (array) {
        var drugEventCount = array[0], totalEventCount = array[1], symptoms = array[2];

        angular.forEach(symptoms, function(symptom) {
          var eventCausedByOtherDrug = symptom.totalCount - symptom.count;
          var reportsForOtherDrugs = totalEventCount - drugEventCount;

          symptom.freqThisDrug = (symptom.count / drugEventCount);
          symptom.freqOtherDrugs = (eventCausedByOtherDrug / reportsForOtherDrugs);


          symptom.reportingRatio =  symptom.freqThisDrug / symptom.freqOtherDrugs;
        });

        return {
          drugEventCount: drugEventCount,
          totalEventCount: totalEventCount,
          symptoms: symptoms
        };
      });

      result.then(function (x) {
        console.log(x);
      });

      return result;


    }


    return {
      computeReportingRatio: computeReportingRatio
    };

  });
