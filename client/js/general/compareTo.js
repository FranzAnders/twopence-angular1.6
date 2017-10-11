
'use strict';

/*------------------------------------*\
   Compare To Directive (used for comparing input values) 
\*------------------------------------*/


twopence.directive('compareTo', function() {
  
  return {

    require: ["compareTo", "ngModel"],
    restrict: 'A', 
    bindToController: {

      otherModelValue: "=compareTo"

    },
    controller: function() {

      var vm = this; 

      vm.$onInit = function() {

        vm.otherModelValue = vm.otherModelValue; 

      };

    },
    controllerAs: 'compareTo', 
    link: function(scope, element, attrs, controllers) {

      let compareToVar = controllers[0];

      let ngModel = controllers[1]; 

      ngModel.$validators.compareTo = function(modelValue) {

        return modelValue === compareToVar.otherModelValue; 

      };

      scope.$watch("compareTo.otherModelValue", function() {
        
          ngModel.$validate(); 

      }); 

    }
  }

}); 

