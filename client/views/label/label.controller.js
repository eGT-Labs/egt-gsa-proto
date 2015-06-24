'use strict';

angular.module('egtGsaProto')
  .controller('LabelCtrl', function ($routeParams, LabelFactory) {
    var vm = this;

    vm.status = 'loading';
    vm.id = $routeParams.id;

    vm.textFields = [
      {
        groupLabel: 'Indications, usage, and dosage',
        children: [
          {
            key: 'indications_and_usage',
            label: 'Indications and Usage',
            isOpen: true
          }, {
            key: 'contraindications',
            label: 'Contraindications'
          }, {
            key: 'dosage_and_administration',
            label: 'Dosage and Administration'
          }, {
            key: 'dosage_forms_and_strengths',
            label: 'Dosage Forms and Strengths'
          }, {
            key: 'purpose',
            label: 'Purpose'
          }, {
            key: 'description',
            label: 'Description'
          }, {
            key: 'active_ingredient',
            label: 'Active Ingredient'
          }, {
            key: 'inactive_ingredient',
            label: 'Inactive Ingredient'
          }, {
            key: 'spl_product_data_elements',
            label: 'Spl Product Data Elements'
          }
        ]
      }, {
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
            label: 'Clinical Pharmacology'
          }, {
            key: 'mechanism_of_action',
            label: 'Mechanism of Action'
          }, {
            key: 'pharmacodynamics',
            label: 'Pharmacodynamics'
          }, {
            key: 'pharmacokinetics',
            label: 'Pharmacokinetics'
          }

        ]
      }, {
        groupLabel: 'Patient information',
        children: [
          {
            key: 'spl_patient_package_insert',
            label: 'Spl Patient Package Insert'
          }, {
            key: 'information_for_patients',
            label: 'Information for Patients'
          }, {
            key: 'information_for_owners_or_caregivers',
            label: 'Information for Owners or Caregivers'
          }, {
            key: 'instructions_for_use',
            label: 'Instructions for Use'
          }, {
            key: 'ask_doctor',
            label: 'Ask Doctor'
          }, {
            key: 'ask_doctor_or_pharmacist',
            label: 'Ask Doctor or Pharmacist'
          }, {
            key: 'do_not_use',
            label: 'Do not Use'
          }, {
            key: 'keep_out_of_reach_of_children',
            label: 'Keep Out of Reach of Children'
          }, {
            key: 'other_safety_information',
            label: 'Other Safety Information'
          }, {
            key: 'questions',
            label: 'Questions'
          }, {
            key: 'stop_use',
            label: 'Stop Use'
          }, {
            key: 'when_using',
            label: 'When Using'
          }, {
            key: 'patient_medication_information',
            label: 'Patient Medication Information'
          }, {
            key: 'spl_medguide',
            label: 'Spl Medguide'
          }
        ]
      }, {
        groupLabel: 'Special populations',
        children: [
          {
            key: 'use_in_specific_populations',
            label: 'Use in Specific Populations'
          }, {
            key: 'pregnancy',
            label: 'Pregnancy'
          }, {
            key: 'teratogenic_effects',
            label: 'Teratogenic Effects'
          }, {
            key: 'nonteratogenic_effects',
            label: 'Nonteratogenic Effects'
          }, {
            key: 'labor_and_delivery',
            label: 'Labor and Delivery'
          }, {
            key: 'nursing_mothers',
            label: 'Nursing Mothers'
          }, {
            key: 'pregnancy_or_breast_feeding',
            label: 'Pregnancy or Breast Feeding'
          }, {
            key: 'pediatric_use',
            label: 'Pediatric Use'
          }, {
            key: 'geriatric_use',
            label: 'Geriatric Use'
          }
        ]
      }, {
        groupLabel: 'Nonclinical toxicology',
        children: [
          {
            key: 'nonclinical_toxicology',
            label: 'Nonclinical Toxicology'
          }, {
            key: 'carcinogenesis_and_mutagenesis_and_impairment_of_fertility',
            label: 'Carcinogenesis and Mutagenesis and Impairment of Fertility'
          }, {
            key: 'animal_pharmacology_and_or_toxicology',
            label: 'Animal Pharmacology and/or Toxicology'
          }
        ]
      }, {
        groupLabel: 'References',
        children: [
          {
            key: 'clinical_studies',
            label: 'Clinical Studies'

          }, {
            key: 'references',
            label: 'References'

          }
        ]
      }, {
        groupLabel: 'Supply, storage, and handling',
        children: [
          {
            key: 'how_supplied',
            label: 'How Supplied'
          }, {
            key: 'storage_and_handling',
            label: 'Storage and Handling'
          }, {
            key: 'safe_handling_warning',
            label: 'Safe Handling Warning'
          }
        ]
      }, {
        groupLabel: 'Warnings and precautions',
        children: [
          {
            key: 'boxed_warning',
            label: 'Boxed Warning'
          }, {
            key: 'warnings_and_precautions',
            label: 'Warnings and Precautions'
          }, {
            key: 'user_safety_warnings',
            label: 'User Safety Warnings'
          }, {
            key: 'precautions',
            label: 'Precautions'
          }, {
            key: 'warnings',
            label: 'Warnings'
          }, {
            key: 'general_precautions',
            label: 'General Precautions'
          }
        ]
      }, {
        groupLabel: 'Other fields',
        children: [
          {
            key: 'laboratory_tests',
            label: 'Laboratory Tests'
          }, {
            key: 'recent_major_changes',
            label: 'Recent Major Changes'
          }, {
            key: 'microbiology',
            label: 'Microbiology'
          }, {
            key: 'package_label_principal_display_panel',
            label: 'Package Label Principal Display Panel'
          }, {
            key: 'spl_unclassified_section',
            label: 'Spl Unclassified Section'
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


  })
  .filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
      return $sce.trustAsHtml(text);
    };
  }]);
