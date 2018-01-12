
'use strict';

/*------------------------------------*\
   Check User Age Directive 
\*------------------------------------*/


twopence.directive('checkDate', ['$filter', function($filter) {
  
  return {

    require: ["checkDate", "ngModel"],
    restrict: 'A', 
    controller: function() {

      var vm = this; 

    },
    controllerAs: 'checkDate', 
    link: function(scope, element, attrs, controllers) {

      var checkDate = controllers[0];

      var ngModel = controllers[1]; 


      // 
      // Gets the age given a date 
      //
      var getAge = function(pDateString) {
        
        var today = new Date(); 

        var birthDate = pDateString;

        var age = today.getFullYear() - birthDate.getFullYear();

        var month = today.getMonth() - birthDate.getMonth(); 

        if(month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
          age--; 

        }

        return age; 

      }; 


      //
      // Checks the date of the ngMOdel everytime the value changes to see if it's atleast 18 
      //
      ngModel.$validators.checkDate = function(modelValue)  {

        if(modelValue) {
            
          var age = getAge(modelValue); 

          if(age > 18) {

            return true

          } else {
            
            return false
          }

        } 

      };

    }

  }

}]); 

