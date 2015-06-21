'use strict';

angular.module('egtGsaProto')
  .controller('LabelCtrl', function ($routeParams, LabelFactory) {
    var vm = this;

    vm.status = 'loading';
    vm.id = $routeParams.id;

    vm.textFields = [
      {
        groupLabel: 'Abuse and Overdose',
        children: [
          {
            key: 'drug_abuse_and_dependence',
            label: 'Drug Abuse and Depenence'
          }, {
            key: 'controlled_substance',
            label: 'Controlled Substance'
          }, {
            key: 'abuse',
            label: 'Abuse'

          }, {
            key: 'dependence',
            label: 'Dependence'

          }, {
            key: 'overdosage',
            label: 'Overdose'

          }
        ]
      }, {
        groupLabel: 'Adverse effects and interactions',
        children: [
          {
            key: 'adverse_reactions',
            label: 'Adverse Reactions'

          }, {
            key: 'drug_interactions',
            label: 'Drug Interactions'
          }, {
            key: 'drug_and_or_laboratory_test_interactions',
            label: 'Drug and/or Laboratory Test Interactions'
          }
        ]
      }, {
        groupLabel: 'Clinical pharmacology',
        children: [
          {
            key: 'clinical_pharmacology',
            label: 'clinical_pharmacology'
          }, {
            key: 'mechanism_of_action',
            label: 'mechanism_of_action'
          }, {
            key: 'pharmacodynamics',
            label: 'pharmacodynamics'
          }, {
            key: 'pharmacokinetics',
            label: 'pharmacokinetics'
          }

        ]
      }, {
        groupLabel: 'Indications, usage, and dosage',
        children: [
          {
            key: 'indications_and_usage',
            label: 'indications_and_usage'
          }, {
            key: 'contraindications',
            label: 'contraindications'
          }, {
            key: 'dosage_and_administration',
            label: 'dosage_and_administration'
          }, {
            key: 'dosage_forms_and_strengths',
            label: 'dosage_forms_and_strengths'
          }, {
            key: 'purpose',
            label: 'purpose'
          }, {
            key: 'description',
            label: 'description'
          }, {
            key: 'active_ingredient',
            label: 'active_ingredient'
          }, {
            key: 'inactive_ingredient',
            label: 'inactive_ingredient'
          }, {
            key: 'spl_product_data_elements',
            label: 'spl_product_data_elements'
          }
        ]
      }, {
        groupLabel: 'Patient information',
        children: [
          {
            key: 'spl_patient_package_insert',
            label: 'spl_patient_package_insert'
          }, {
            key: 'information_for_patients',
            label: 'information_for_patients'
          }, {
            key: 'information_for_owners_or_caregivers',
            label: 'information_for_owners_or_caregivers'
          }, {
            key: 'instructions_for_use',
            label: 'instructions_for_use'
          }, {
            key: 'ask_doctor',
            label: 'ask_doctor'
          }, {
            key: 'ask_doctor_or_pharmacist',
            label: 'ask_doctor_or_pharmacist'
          }, {
            key: 'do_not_use',
            label: 'do_not_use'
          }, {
            key: 'keep_out_of_reach_of_children',
            label: 'keep_out_of_reach_of_children'
          }, {
            key: 'other_safety_information',
            label: 'other_safety_information'
          }, {
            key: 'questions',
            label: 'questions'
          }, {
            key: 'stop_use',
            label: 'stop_use'
          }, {
            key: 'when_using',
            label: 'when_using'
          }, {
            key: 'patient_medication_information',
            label: 'patient_medication_information'
          }, {
            key: 'spl_medguide',
            label: 'spl_medguide'
          }
        ]
      }, {
        groupLabel: 'Special populations',
        children: [
          {
            key: 'use_in_specific_populations',
            label: 'use_in_specific_populations'
          }, {
            key: 'pregnancy',
            label: 'pregnancy'
          }, {
            key: 'teratogenic_effects',
            label: 'teratogenic_effects'
          }, {
            key: 'nonteratogenic_effects',
            label: 'nonteratogenic_effects'
          }, {
            key: 'labor_and_delivery',
            label: 'labor_and_delivery'
          }, {
            key: 'nursing_mothers',
            label: 'nursing_mothers'
          }, {
            key: 'pregnancy_or_breast_feeding',
            label: 'pregnancy_or_breast_feeding'
          }, {
            key: 'pediatric_use',
            label: 'pediatric_use'
          }, {
            key: 'geriatric_use',
            label: 'geriatric_use'
          }
        ]
      }, {
        groupLabel: 'Nonclinical toxicology',
        children: [
          {
            key: 'nonclinical_toxicology',
            label: 'nonclinical_toxicology'
          }, {
            key: 'carcinogenesis_and_mutagenesis_and_impairment_of_fertility',
            label: 'carcinogenesis_and_mutagenesis_and_impairment_of_fertility'
          }, {
            key: 'animal_pharmacology_and_or_toxicology',
            label: 'animal_pharmacology_and_or_toxicology'
          }
        ]
      }, {
        groupLabel: 'References',
        children: [
          {
            key: 'clinical_studies',
            label: 'clinical_studies'

          }, {
            key: 'references',
            label: 'references'

          }
        ]
      }, {
        groupLabel: 'Supply, storage, and handling',
        children: [
          {
            key: 'how_supplied',
            label: 'how_supplied'
          }, {
            key: 'storage_and_handling',
            label: 'storage_and_handling'
          }, {
            key: 'safe_handling_warning',
            label: 'safe_handling_warning'
          }
        ]
      }, {
        groupLabel: 'Warnings and precautions',
        children: [
          {
            key: 'boxed_warning',
            label: 'boxed_warning'
          }, {
            key: 'warnings_and_precautions',
            label: 'warnings_and_precautions'
          }, {
            key: 'user_safety_warnings',
            label: 'user_safety_warnings'
          }, {
            key: 'precautions',
            label: 'precautions'
          }, {
            key: 'warnings',
            label: 'warnings'
          }, {
            key: 'general_precautions',
            label: 'general_precautions'
          }
        ]
      }, {
        groupLabel: 'Other fields',
        children: [
          {
            key: 'laboratory_tests',
            label: 'laboratory_tests'
          }, {
            key: 'recent_major_changes',
            label: 'recent_major_changes'
          }, {
            key: 'microbiology',
            label: 'microbiology'
          }, {
            key: 'package_label_principal_display_panel',
            label: 'package_label_principal_display_panel'
          }, {
            key: 'spl_unclassified_section',
            label: 'spl_unclassified_section'
          }
        ]
      }
    ];


    LabelFactory.load(vm.id).then(
      function (label) {
        vm.status = 'success';
        vm.label = label;
        populateText(label);
      }, function (err) {
        vm.status = 'error';
      });


    function populateText(label) {

      angular.forEach(vm.textFields, function (group) {
        angular.forEach(group.children, function (field) {
          if (label[field.key]) {
            field.hasData = true;
            field.plainText = label[field.key];
          }
          if (label[field.key + '_table']) {
            field.hasData = true;
            field.html = label[field.key + '_table'];
          }
        });
        _.remove(group.children, function (field) {
          return !field.hasData;
        });
      });

      _.remove(vm.textFields, function (group) {
        return group.children.length == 0;
      });

    }


    vm.rawString = function () {
      return angular.toJson(vm.label, true);
    };


  })
  .filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
      return $sce.trustAsHtml(text);
    };
  }]);
