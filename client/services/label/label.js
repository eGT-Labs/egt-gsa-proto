'use strict';

angular.module('egtGsaProto')
  .factory('LabelFactory', function ($http) {


    return {

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

angular.module('egtGsaProto')
.service('labelDataService', function () {
	 var labels = {
	            "Abuse and overdosage": {
	                    "drug_abuse_and_dependence": {
	                        "fieldHeading": "Drug Abuse and Dependence",
	                        "plainText": 'a;sdlfjdsak;fjasd;kfadj'
	                        	
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
     
	var labelDetails = {};
	return {

		getData : function(json) {
			
			$.each(labels, function(groupName, group) {
				
				$.each(group, function(value, groupField) {
					var f = findLabelField(json, value);
					if(!$.isEmptyObject(f)){
					if(angular.isUndefined(labelDetails[groupName])) { labelDetails[groupName] = {}; }
					if(angular.isUndefined(labelDetails[groupName][f])) { labelDetails[groupName][f] = {};} 
					if(angular.isUndefined(labelDetails[groupName][f]['labelHeading'])) { labelDetails[groupName][f]['labelHeading'] = {}; } 
					if(angular.isUndefined(labelDetails[groupName][f]['data'])) { labelDetails[groupName][f]['data'] = {}; } 
					labelDetails[groupName][f]['data'] = json[f];
					labelDetails[groupName][f]['labelHeading'] = groupField['fieldHeading'];
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




