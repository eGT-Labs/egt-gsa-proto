'use strict';

angular.module('egtGsaProto')
  .directive('reportingRatioChart', function (numberFilter) {

    function buildReportingRatio(data) {

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
          "rows": _.map(data.leadingOutputs, function(row) {
            return {
              "c": [
                {
                  "v": row.frequency,
                  'f': row.term + '  ' + numberFilter(100*row.frequency, 2) + '%'
                },
                {
                  "v": row.reportingRatio,
                  'f': '(' + numberFilter(row.reportingRatio, 3) + 'x as correlated)'
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
            "title": "Reporting Ratio",
            "gridlines": {
              //"count": 10
            },
            logScale: true

          },
          "hAxis": {
            "title": "Frequency",
            logScale: true,
            format: 'percent'
          }
        }
      }
    }


    function buildGenderChart(data) {



      console.log(_.find(data.genderCount, {'term': 0}));
      console.log(_.find(data.genderCount, {'term': 1}));
      console.log(_.find(data.genderCount, {'term': 2}));

      return {
        "type": "PieChart",
        "displayed": true,
        "data": {
          "cols": [
            {
              "id": "gender",
              "label": "Gender",
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
          "rows": [
            {
              "c": [
                {
                  "v": "Male"
                },
                {
                  "v": _.find(data.genderCount, {'term': 1}).count
                }
              ]
            }, {
              "c": [
                {
                  "v": "Female"
                },
                {
                  "v": _.find(data.genderCount, {'term': 2}).count
                }
              ]
            }, {
              "c": [
                {
                  "v": "Unknown"
                },
                {
                  "v": _.find(data.genderCount, {'term': 0}).count
                }
              ]
            }
          ]
        }
      };
    }


    return {
      restrict: 'EA',
      templateUrl: 'directives/reporting-ratio-chart/reporting-ratio-chart.html',
      scope: {
        reportingRatio: '='
      },
      link: function (scope, element) {
        scope.$watch('reportingRatio', function(data) {
          if (data) {
            scope.reportingRatioChart = buildReportingRatio(data);
            scope.genderChart = buildGenderChart(data);
          }
        });
      }
    };
  });
