
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

    },
    controllerAs: 'compareTo', 
    link: function(scope, element, attrs, controllers) {

      var compareTo = controllers[0];

      var ngModel = controllers[1]; 

      ngModel.$validators.compareTo = function(modelValue)  {

        return modelValue === compareTo.otherModelValue; 

      };

      scope.$watch("compareTo.otherModelValue", function() {
          ngModel.$validate(); 

      }); 

    }
  }

}); 

