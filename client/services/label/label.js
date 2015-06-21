'use strict';

angular.module('egtGsaProto')
  .factory('LabelFactory', function ($http) {



    function buildQuery(search) {

      var queryStringParts = [];

      queryStringParts.push('_exists_:openfda.spl_id'); //We only want to use the records that have openfda sections

      //add the raw fulltext if it exists
      if (search.fulltext) {
        queryStringParts.push(search.fulltext);
      }

      //find the keys that start with 'facet.'
      angular.forEach(search, function (value, key) {
        var keyParts = key.split('.');
        if (keyParts[0] === 'facet') {
          var field = keyParts[1];
          queryStringParts.push(facetQuery(field,value));
        }
      });


      return queryStringParts.join(' AND ');
    }

    var UNSUPPORTED_API_CHARS = new RegExp('[^0-9a-zA-Z\.\_\:\(\)\"\\[\\]\{\}\\-\\+\>\<\= ]+');


    /**
     * Some of that data we want to facet over contains characters that the API will reject.
     * Attempt to look for an exact match for the value we request. If the value contains unsupported characters,
     * split on those and just ensure that each section individually is present.
     * @param name
     * @param value
     * @returns {string}
     */
    function facetQuery(name, value) {

      var split = value.split(UNSUPPORTED_API_CHARS);

      if (split.length === 1) {
        return 'openfda.' + name + '.exact:"' + value + '"';
      } else {

        var sections  = [];

        angular.forEach(split, function(valuePart) {
          if (valuePart) {
            sections.push('"' + valuePart + '"');
          }
        });

        return 'openfda.' + name + ':(' + sections.join(" AND ") + ')';
      }
    }




    return {

      buildQuery: buildQuery,

      /**
       * Returns (as a promise) the data object for a single label.
       * @param id
       */
      load: function(id) {

        var query = 'search=openfda.spl_id:"' + id + '"';


        return $http.get('/api/proxy/drug/label.json?' + query)
          .then(function (resp) {
            return resp.data.results[0];
        });
      },

      runQuery: function(params) {
        return $http.get('/api/proxy/drug/label.json', {params: params})
      }

    };
  });


//TODO follow the directory structure by moving this to its own file in /client/services/label-data-service/label-data-service.js
angular.module('egtGsaProto')
.service('labelDataService', function () {
	 var labels = {
	            "Abuse and overdosage": {
	                    "drug_abuse_and_dependence": {
	                        "fieldHeading": "Drug Abuse and Dependence"
	                    },
	                    "controlled_substance": {
	                    	"fieldHeading": "Controlled Substance"
	                    },
	                    "abuse": {
	                    	"fieldHeading": "Abuse"
	                    },
	                    "dependence": {
	                    	"fieldHeading": "Dependence"
	                    },
	                    "overdosage": {
	                    	"fieldHeading": "Overdosage"
	                    }
	                },
	                "Adverse effects and interactions": {
	                    "adverse_reactions": {
	                    	"fieldHeading": "Adverse Reactions"
	                    },
	                    "drug_interactions": {
	                    	"fieldHeading": "Drug Interactions"
	                    },
	                    "drug_and_or_laboratory_test_interactions": {
	                    	"fieldHeading": "drug_and_or_laboratory_test_interactions"
	                    },

	                },
	                "Indications, usage, and dosage": {
	                    "indications_and_usage": {
	                    	"fieldHeading": "Indications and Usage"
	                    },
	                    "contraindications": {
	                    	"fieldHeading": "Contraindications"
	                    },
	                    "dosage_and_administration": {
	                    	"fieldHeading": "Dosage and Administration"
	                    },
	                    "dosage_and_administration_table": {
	                    	"fieldHeading": "Dosage and Administration Table"
	                    },
	                    "dosage_forms_and_strengths": {
	                    	"fieldHeading": "Dosage Forms and Strengths"
	                    }, "purpose": {
	                    	"fieldHeading": "Purpose"
	                    }, "description": {
	                    	"fieldHeading": "Description"
	                    }, "active_ingredient": {
	                    	"fieldHeading": "Active Ingredient"
	                    }, "inactive_ingredient": {
	                    	"fieldHeading": "Inactive Ingredient"
	                    }
	                },
	                "Patient information": {
	                    "information_for_patients": {
	                    	"fieldHeading": "Information for Patients"
	                    },
	                    "instructions_for_use": {
	                    	"fieldHeading": "Instructions for use"
	                    },
	                    "keep_out_of_reach_of_children": {
	                    	"fieldHeading": "Keep out of reach of Children"
	                    }, "patient_medication_information": {
	                    	"fieldHeading": "Patient Medication Information"
	                    }
	                }
	 };

		var findLabelField = function(json, fieldName) {
		var result = {};

		function getField(_json) {
			$.each(_json, function(value, key) {

				if (value === fieldName) {
					result = value;
					return false;
				} else if (typeof value == "object") {
					getField(value, fieldName);
				}
			});
		}
		getField(json);
		return result;
	};

	var isTable = function(fieldName){
		return fieldName.indexOf('_table') > 0
	}

	var labelDetails = {};
	return {

		getData : function(json) {
			labelDetails = {};
			$.each(labels, function(groupName, group) {

				$.each(group, function(value, groupField) {
					console.log("value is:  " + value)
					var f = findLabelField(json, value);
					if(!$.isEmptyObject(f)){
					if(angular.isUndefined(labelDetails[groupName])) { labelDetails[groupName] = {}; }
					var field = f.replace("_table","").trim();
					field.trim();
					console.log(labelDetails);
					if(angular.isUndefined(labelDetails[groupName][field])) { labelDetails[groupName][field] = {};}

					if(angular.isUndefined(labelDetails[groupName][field]['labelHeading'])) {
						labelDetails[groupName][field]['labelHeading'] = {};
						}
					if(angular.isUndefined(labelDetails[groupName][field]['data'])) { labelDetails[groupName][field]['data'] = []; }
					
					console.log(labelDetails);
					angular.forEach(json[f],function(data){
						console.log("here")
					labelDetails[groupName][field]['data'].push(data);
					});
					
					labelDetails[groupName][field]['labelHeading'] = group[field]['fieldHeading'];
					}
				});
				console.log(labelDetails);
			});
		},

		getLabelDetails : function () {
			return labelDetails;
		}

	};

});




