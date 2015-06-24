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

    function formatPercent(number) {
      return (Math.round(number * 1000) / 10) + '%';
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



    function buildAgeChart(ageCount, normalAgeCount) {

      var bucketSize = 5;

      var data = normalizeData(ageCount, normalAgeCount, 100, bucketSize);


      //Documentation of options: https://developers.google.com/chart/interactive/docs/gallery/scatterchart
      return {
        "type": "ComboChart",
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
              "label": "Frequency",
              "type": "number",
              "p": {}
            },
            {
              "id": "normal",
              "label": "Normal",
              "type": "number",
              "p": {}
            }
          ],
          "rows": _.map(data, function (row) {
            var age = row.term;

            return {
              "c": [
                {
                  "v": age + (bucketSize / 2),
                  'f': age + '-' + (age + 5) + ' years old'
                },
                {
                  "v": row.count,
                  'f': formatPercent(row.count)
                } ,
                {
                  "v": row.normal,
                  'f': formatPercent(row.normal)
                }
              ]
            };
          })
        },
        "options": {
          focusTarget: 'category',
          "isStacked": "true",
          "fill": 20,
          "displayExactValues": true,
          legend: {
            position: 'none'
          },
          seriesType: 'bars',
          series: {1: {type: "line"}},
          titlePosition: 'none',
          theme: 'maximized',
          "vAxis": {
            format: 'percent',
            "gridlines": {
              //"count": 10
            }
          },
          "hAxis": {}
        }
      }
    }

    function normalizeData(dataCount, normalCount, max, bucketSize) {

      function buildDistribution(input) {
        var dist = _(input).filter(function(x) {
          return x.term < max;
        }).groupBy(function(x) {
          return '' + (bucketSize * Math.floor(x.term / bucketSize))
        }).mapValues(function(x) {
          return _(x).pluck('count').sum();
        }).value();

        var count = _(dist).values().sum();

        return _(dist).mapValues(function(x) {
          return x / count;
        }).value();

      }


      var dataDist = buildDistribution(dataCount);
      var normalDist = buildDistribution(normalCount);

      var terms = _.union(_.keys(dataDist), _.keys(normalDist));

      var result = _.map(terms, function(term) {
        return {
          term: parseInt(term),
          count: dataDist[term] || 0,
          normal: normalDist[term] || 0
        }
      });

      return _.sortBy(result, 'term');
    }


    function buildWeightChart(weightCount, normalWeightCount) {

      var bucketSize = 5;
      var data = normalizeData(weightCount, normalWeightCount, 200, bucketSize);


      //Documentation of options: https://developers.google.com/chart/interactive/docs/gallery/scatterchart
      return {
        "type": "ComboChart",
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
              "label": "Frequency",
              "type": "number",
              "p": {}
            },
            {
              "id": "normal",
              "label": "Normal",
              "type": "number",
              "p": {}
            }
          ],
          "rows": _.map(data, function (row) {

            var minKg = row.term;
            var maxKg = minKg + 5;

            var minLb = Math.round(2.20462 * minKg);
            var maxLb = Math.round(2.20462 * maxKg);

            var weightStr = 'Weight: ' + minKg + '-' + maxKg + ' kg   (' + minLb + '-' + maxLb + ' lbs)';

            return {
              "c": [
                {
                  "v": minKg + (bucketSize / 2),
                  'f': weightStr
                },
                {
                  "v": row.count,
                  'f': formatPercent(row.count)
                }, {
                  "v": row.normal,
                  'f': formatPercent(row.normal)
                }
              ]
            };
          })
        },
        "options": {
          focusTarget: 'category',
          "isStacked": "true",
          "fill": 20,
          "displayExactValues": true,
          legend: {
            position: 'none'
          },
          seriesType: 'bars',
          series: {1: {type: "line"}},
          titlePosition: 'none',
          theme: 'maximized',
          "vAxis": {
            format: 'percent',
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

            scope.ageChart = buildAgeChart(data.ageCount, data.normalAgeCount);

            scope.outcomeChart = buildPieChart(data.outcomeCount, [
              {output: 'Recovered/resolved', input: 1},
              {output: 'Recovering/resolving', input: 2},
              {output: 'Not recovered/not resolved', input: 3},
              {output: 'Recovered/resolved with sequelae', input: 4},
              {output: 'Fatal', input: 5},
              {output: 'Unknown', input: 6}
            ]);

            scope.weightChart = buildWeightChart(data.weightCount, data.normalWeightCount);
          }
        });

      }
    };
  });
