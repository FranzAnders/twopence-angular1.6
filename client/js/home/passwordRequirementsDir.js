

'use strict';

/*------------------------------------*\
    Password Requirements Directive
\*------------------------------------*/

twopence.directive('passwordRequirementsDir', [
    'EfficientWatch', 
    '$timeout', 
function(
  EfficientWatch, 
  $timeout) {

    return {

      restrict: 'E', 
      scope: {}, 
      templateUrl: 'js/home/passwordRequirements.html', 
      controller: ['EfficientWatch', '$scope',  function(EfficientWatch, $scope) {

        var vm = this; 

         vm.password = vm.password;


         vm.requirements = {
            'characterLength': false,
            'number' :  false,
            'capitalCase' : false,
            'specialCharacter': false

         };


         //
         // Puts the password through a series of checks and returns the updated requiremnts object
         //
         vm.checkPassword = function(pPassword, pRequirements) {

           //^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$

           var lengthTest = 8; 
           var numberTest = new RegExp("[0-9]"); 
           var capitalCaseTest = new RegExp("[A-Z]");
           var specialCharacterTest = new RegExp("[$@$!%*?&]");

            var requirements = pRequirements; 

            if(pPassword) {

              if(numberTest.test(pPassword)) {

                requirements.number = true;

              } 

              if(specialCharacterTest.test(pPassword)) {

                requirements.specialCharacter = true; 

              }


              if(capitalCaseTest.test(pPassword)) {

                requirements.capitalCase = true; 

              }
  

              if(pPassword.length >= lengthTest) {

                requirements.characterLength = true; 

              }


            }

            return requirements

         };   


        //
        // Watches the password via object 
        //
        EfficientWatch.watch('password', vm, function(newVal) {

          // console.log(newVal); 

          // vm.requirements = vm.checkPassword(newVal, vm.requirements); 

          console.log( vm.checkPassword(newVal, vm.requirements)); 

        }); 

      }],
      controllerAs: 'passwordRequirements', 
      bindToController: {

        password: "="

      }, 
      link: function(scope, elem, attr, passwordRequirements) {


      }

    }

  }]);