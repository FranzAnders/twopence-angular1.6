

'use strict'; 

/*------------------------------------*\
    Validation Alerts Directive
\*------------------------------------*/

twopence.directive('validationAlertsDir',['$timeout', function($timeout) {

    return {

      restrict: 'E',
      replace: true, 
      scope: {}, 
      controller: ['$rootScope',
        function($rootScope) {

        var vm = this;

        vm.showErrors = false; 

        vm.error = null; 

        vm.validatedData; 

        vm.$onInit = function() {
          
          $rootScope.$on('login-validation-error', function(event, data) {

            vm.showErrors = true; 

            vm.error = vm.getErrorType(data.error);

            if(data.validatedData) {
              
              vm.validatedData = data.validatedData; 

            }

          });  

        }


        //
        // Sets the type of error by checking the error object
        //
        vm.getErrorType = function(pErrorObject) {

          if(pErrorObject.data.message === "Sorry, that\'s an invalid email/password combination.") {
             
             return  'authIncorrect'

          } else if(pErrorObject.data.code === "rate_limit_error") {
            
             return  'tooManyAttempts'

          } else if(pErrorObject.data.message === "Email has already been taken.") {

            return 'duplicateEmails'

          } else {

            return 'generalError'

          }

        }


      }], 
      controllerAs: 'validationAlerts',
      bindToController: true, 
      templateUrl: "js/login/validationAlerts.html", 
      link: function(scope, element, attrs, validationAlerts) {


        // 
        // Click even listener checking if the user clicks out of the error modals
        //
        $timeout(function() {

          document.addEventListener('click', function(event) {

            if(validationAlerts.showErrors) {

              if(event.target !== element[0] 
                 && !element[0].contains(event.target)) {

                $timeout(function() {
                  validationAlerts.showErrors = false; 
                  validationAlerts.error = null;    
                }, 600); 

              } 

            }

          }); 

        }, 0); 

      }

    }

}]); 

