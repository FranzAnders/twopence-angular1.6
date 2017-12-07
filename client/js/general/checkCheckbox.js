
'use strict';

/*------------------------------------*\
   Compare To Directive (used for comparing input values) 
\*------------------------------------*/


twopence.directive('verifyCheckBox', function() {
  
  return {

    require: ["verifyCheckBox", "ngModel"],
    restrict: 'A', 
    bindToController: {

      otherModelValue: "=verifyCheckBox"

    },
    controller: function() {

      var vm = this; 

      vm.$onInit = function() {

        vm.otherModelValue = vm.otherModelValue; 

      };

    },
    controllerAs: 'verifyCheckBox', 
    link: function(scope, element, attrs, controllers) {

      var verifyCheckBox = controllers[0];

      var ngModel = controllers[1]; 

      ngModel.$validators.verifyCheckBox = function(modelValue) {

console.log(ngModel); 
console.log(modelValue); 
console.log(verifyCheckBox.otherModelValue); 
  console.log(ngModel.$valid); 

        if(verifyCheckBox.otherModelValue && modelValue) {

            console.log('true')
          return true; 

        }

        if(verifyCheckBox.otherModelValue && (modelValue === undefined)) {
          return false; 
        }

        if(!verifyCheckBox.otherModelValue && modelValue) {

          return true; 

        }


      };

      scope.$watch("compareTo.otherModelValue", function() {
        
          ngModel.$validate(); 

      }); 

    }
  }

}); 

