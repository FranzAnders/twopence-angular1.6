'use strict';

/*------------------------------------*\
    Login Controller
\*------------------------------------*/

twopence.controller('loginCtrl', [
  '$state',
  '$timeout',
  '$rootScope',
  '$stateParams',
  'Auth',
  'AUTH_EVENTS',
  'User',
  function(
    $state,
    $timeout,
    $rootScope, 
    $stateParams,
    Auth,
    AUTH_EVENTS,
    User) {

    var vm = this;

    vm.form = {};

    vm.credentials = {
      username: '',
      password: ''
    };

    vm.verified = {
      camefromemail: $stateParams.camefromemail
    }


    vm.formSubmissionErrors = {
      invalidCombination : false, 
      rateLimitError: false,
      error: false

    }


    //
    // Resets the form submission errors object 
    //
    var resetFormSubmissionErrors = function() {
      vm.formSubmissionErrors.invalidCombination = false; 
      vm.formSubmissionErrors.rateLimitError = false; 
      vm.formSubmissionErrors.error = false; 

    }


    //
    // Logs in a user if the form is valid and there are no errors with the information provided 
    // If the user is still onboarding, they get taken to the signUp confirmation screen 
    //
    vm.logInUser = function(pLoginForm) {
      resetFormSubmissionErrors(); 

      if(pLoginForm.$valid) {

        Auth.login(vm.form).then(function(res) {

          User.getUserInfo().then(function(userInfo) {

            if(userInfo.sponsor.status === "onboarding") {

              $state.go('main.account.onboarding');

            } else {

              if(userInfo.sponsorships.length == 0) {

                $state.go('sponsor.sponseeAdd');

              } else {

                $state.go('sponsor.dashboard'); 
              }

            }

          }).catch(function(){
              alert('ERROR: Something went wrong');

          });


        }).catch(function(err) {

          //
          // Emits an event with the error data for validationAlertsDir to listen to
          //
          $timeout(function() {
            $rootScope.$emit('login-validation-error', {error: err}); 

          }, 100);

        });

      } else {

        console.log('ERROR: form is not valid'); 

      }

    }

  }
]);
