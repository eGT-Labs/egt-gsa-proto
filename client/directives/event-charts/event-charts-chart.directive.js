'use strict';

angular.module('egtGsaProto')
  .directive('eventCharts', function (numberFilter) {

    function buildReportingRatio(leadingOutputs) {
      //Documentation of options: https://developers.google.com/chart/interactive/docs/gallery/scatterchart
      return {
        "type": "ScatterChart",
        "displayed": true,
        "data": {
          "cols": [
            {
              "id": "frequency",
              "label": "Frequeny",
              "type": "number",
              "p": {}
            },
            {
              "id": "prr",
              "label": "Proportional Reporting Ratio",
              "type": "number",
              "p": {}
            }
          ],
          "rows": _.map(leadingOutputs, function (row) {
            return {
              "c": [
                {
                  "v": row.frequency,
                  'f': row.term + '  ' + numberFilter(100 * row.frequency, 2) + '%'
                },
                {
                  "v": row.reportingRatio,
                  'f': '(' + numberFilter(row.reportingRatio, 3) + ' × more frequent)'
                }, {
                  "f": row.term
                }
              ]
            };
          })
        },
        "options": {
          "isStacked": "true",
          "fill": 20,
          "displayExactValues": true,
          legend: {
            position: 'none'
          },
          titlePosition: 'none',
          theme: 'maximized',
          "vAxis": {
            //"title": "Reporting Ratio",
            "gridlines": {
              //"count": 10
            },
            logScale: true

          },
          "hAxis": {
            //"title": "Frequency",
            logScale: true,
            format: 'percent'
          }
        }
      }
    }


    function buildPieChart(rawData, termMappings) {

      var terms = mapTerms(rawData, termMappings);

      //documentation of options: https://developers.google.com/chart/interactive/docs/gallery/piechart
      return {
        "type": "PieChart",
        "displayed": true,
        "data": {
          "cols": [
            {
              "id": "term",
              "label": "Term",
              "type": "string",
              "p": {}
            },
            {
              "id": "count",
              "label": "Count",
              "type": "number",
              "p": {}
            }
          ],
          "rows": _.map(terms, function (term) {
            return {
              "c": [
                {
                  "v": term.term
                },
                {
                  "v": term.count
                }
              ]
            }
          })
        }
      };
    }

    function mapTerms(countData, termMappings) {
      return _.map(termMappings, function (mapping) {
        var countRecord = _.find(countData, {term: mapping.input});
        return {
          term: mapping.output,
          count: countRecord ? countRecord.count : 0
        };
      });
    }



    function buildAgeChart(ageCount) {

      //there are some outliers with outrageously old individuals.
      ageCount = _.filter(ageCount, function (term) {
        return term.term < 100;
      });


      var processed = {};

      //the data has some fractional ages. Round all ages down to integers and combine them.
      angular.forEach(ageCount, function (term) {
        var ageStr = '' + (5 * Math.floor(term.term / 5));
        var count = term.count;
        if (processed[ageStr]) {
          processed[ageStr] += count;
        } else {
          processed[ageStr] = count;
        }
      });


      //Documentation of options: https://developers.google.com/chart/interactive/docs/gallery/scatterchart
      return {
        "type": "ColumnChart",
        "displayed": true,
        "data": {
          "cols": [
            {
              "id": "age",
              "label": "Age",
              "type": "number",
              "p": {}
            },
            {
              "id": "count",
              "label": "Count",
              "type": "number",
              "p": {}
            }
          ],
          "rows": _.map(processed, function (count, age) {
            return {
              "c": [
                {
                  "v": age,
                  'f': 'Age: ' + age + '-' + (parseInt(age) + 5)
                },
                {
                  "v": count,
                  'f': 'Count: ' + count
                }
              ]
            };
          })
        },
        "options": {
          "isStacked": "true",
          "fill": 20,
          "displayExactValues": true,
          legend: {
            position: 'none'
          },
          titlePosition: 'none',
          theme: 'maximized',
          "vAxis": {
            "gridlines": {
              //"count": 10
            }
          },
          "hAxis": {}
        }
      }
    }


    function buildWeightChart(weightCount) {

      //there are some outliers with unbelievably heavy individuals.
      weightCount = _.filter(weightCount, function (term) {
        return term.term < 300;
      });


      var processed = {};

      //the data has some fractional ages. Round all ages down to integers and combine them.
      angular.forEach(weightCount, function (term) {
        var weightStr = '' + (5 * Math.floor(term.term / 5));
        var count = term.count;
        if (processed[weightStr]) {
          processed[weightStr] += count;
        } else {
          processed[weightStr] = count;
        }
      });

      console.log(processed);


      //Documentation of options: https://developers.google.com/chart/interactive/docs/gallery/scatterchart
      return {
        "type": "ColumnChart",
        "displayed": true,
        "data": {
          "cols": [
            {
              "id": "weight",
              "label": "Weight",
              "type": "number",
              "p": {}
            },
            {
              "id": "count",
              "label": "Count",
              "type": "number",
              "p": {}
            }
          ],
          "rows": _.map(processed, function (count, weight) {

            var minKg = parseInt(weight);
            var maxKg = minKg + 5;

            var minLb = Math.round(2.20462 * minKg);
            var maxLb = Math.round(2.20462 * maxKg);

            var weightStr = 'Weight: ' + minKg + '-' + maxKg + ' kg   (' + minLb + '-' + maxLb + ' lbs)';

            return {
              "c": [
                {
                  "v": weight,
                  'f': weightStr
                },
                {
                  "v": count,
                  //'f': 'Count: ' + count
                }
              ]
            };
          })
        },
        "options": {
          "isStacked": "true",
          "fill": 20,
          "displayExactValues": true,
          legend: {
            position: 'none'
          },
          titlePosition: 'none',
          theme: 'maximized',
          "vAxis": {
            "gridlines": {
              //"count": 10
            }
          },
          "hAxis": {}
        }
      }
    }



    return {
      restrict: 'EA',
      templateUrl: 'directives/event-charts/event-charts.html',
      scope: {
        eventData: '=',
        reportingRatioClick: '='
      },
      link: function (scope, element) {

        scope.selectRR = function(selectedItem) {
          if (selectedItem) {
            var item = scope.eventData.leadingOutputs[selectedItem.row].term;
            scope.reportingRatioClick(item);
            console.log(item);
          }
        };

        scope.$watch('eventData', function (data) {
          if (data) {
            scope.reportingRatioChart = buildReportingRatio(data.leadingOutputs);

            scope.genderChart = buildPieChart(data.genderCount, [
              {output: "Male", input: 1},
              {output: "Female", input: 2},
              {output: "Unknown", input: 0},
            ]);

            scope.ageChart = buildAgeChart(data.ageCount);

            scope.outcomeChart = buildPieChart(data.outcomeCount, [
              {output: 'Recovered/resolved', input: 1},
              {output: 'Recovering/resolving', input: 2},
              {output: 'Not recovered/not resolved', input: 3},
              {output: 'Recovered/resolved with sequelae', input: 4},
              {output: 'Fatal', input: 5},
              {output: 'Unknown', input: 6}
            ]);

            scope.weightChart = buildWeightChart(data.weightCount);
          }
        });

      }
    };
  });
