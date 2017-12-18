
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

        if(verifyCheckBox.otherModelValue && modelValue) {


          console.log('true');
          return true; 

        }

        if(verifyCheckBox.otherModelValue && (modelValue === undefined)) {
            
          console.log('false');

          return false; 
        }

        if(!verifyCheckBox.otherModelValue && modelValue) {
          
          console.log('true');

          return true; 

        }


      };

      scope.$watch("verifyCheckBox.otherModelValue", function() {
        
          ngModel.$validate(); 

      }); 

    }
  }

}); 

