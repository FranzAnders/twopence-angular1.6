

'use strict'; 

/*------------------------------------*\
    Validation Alerts Directive
\*------------------------------------*/

twopence.directive('validationAlertsDir',['$timeout', function($timeout) {

    return {

      restrict: 'E',
      replace: true, 
      controller: ['$rootScope',
        function($rootScope) {

        var vm = this;

        vm.showErrors = false; 

        vm.error = null; 

        vm.$onInit = function() {
          
          $rootScope.$on('login-validation-error', function(event, error) {

            vm.showErrors = true; 

            vm.error = vm.getErrorType(error);

          });  

        }


        //
        // Sets the type of error by checking the error object
        //
        vm.getErrorType = function(pErrorObject) {

          if(pErrorObject.error.data.message === "Sorry, that\'s an invalid email/password combination.") {
             
             return  'authIncorrect'

          } else if(pErrorObject.error.data.code === "rate_limit_error") {
            
             return  'tooManyAttempts'

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

