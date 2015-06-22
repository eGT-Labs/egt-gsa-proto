'use strict';

angular.module('egtGsaProto')
  .directive('reportingRatioChart', function (numberFilter) {
    return {
      restrict: 'EA',
      templateUrl: 'directives/reporting-ratio-chart/reporting-ratio-chart.html',
      scope: {
        reportingRatio: '='
      },
      link: function (scope, element) {

        scope.$watch('reportingRatio', function(data) {

          if (data) {
            var reportingRatioRows = _.map(data.leadingOutputs, function(row) {
              return {
                "c": [
                  {
                    "v": row.frequency,
                    'f': row.term + '  ' + numberFilter(100*row.frequency, 2) + '%'
                  },
                  {
                    "v": row.reportingRatio,
                    'f': '(' + numberFilter(row.reportingRatio, 3) + 'x more common than usual)'
                  }, {
                    "f": row.term
                  }
                ]
              };
            });

            console.log(data);

            scope.reportingRatioChart = {
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
                "rows": reportingRatioRows
              },
              "options": {
                "isStacked": "true",
                "fill": 20,
                "displayExactValues": true,
                legend: {
                  position: 'none'
                },
                theme: 'maximized',
                "vAxis": {
                  "title": "Reporting Ratio",
                  "gridlines": {
                    "count": 10
                  },
                  logScale: true

                },
                "hAxis": {
                  "title": "Frequency",
                  logScale: true,
                  format: 'percent'
                }
              },
              "formatters": {}
            }



            console.log(data);

            scope.genderChart = {
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
                        "v": data.genderCount.male
                      }
                    ]
                  }, {
                    "c": [
                      {
                        "v": "Female"
                      },
                      {
                        "v": data.genderCount.female
                      }
                    ]
                  }
                ]
              },
              "options": {
                "isStacked": "true",
                "fill": 20,
                "displayExactValues": true,
                legend: {
                  position: 'none'
                },
                theme: 'maximized',
                "vAxis": {
                  "title": "Reporting Ratio",
                  "gridlines": {
                    "count": 10
                  },
                  logScale: true

                },
                "hAxis": {
                  "title": "Frequency",
                  logScale: true,
                  format: 'percent'
                }
              },
              "formatters": {}
            }

          }
        });
      }
    };
  });
