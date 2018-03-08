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
  'Sponsorship',
  'User',
  function(
    $state,
    $timeout,
    $rootScope,
    $stateParams,
    Auth,
    AUTH_EVENTS,
    Sponsorship,
    User) {

    var vm = this;

    vm.form = {};
    vm.loggingIn = false; 

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
         vm.loggingIn = true; 

        Auth.login(vm.form).then(function(res) {

          mixpanel.people.increment('Number of Sessions')
          
          $state.go('sponsor.dashboard');

        }).catch(function(err) {

          //
          // Emits an event with the error data for validationAlertsDir to listen to
          //
          $timeout(function() {
            $rootScope.$emit('login-validation-error', {error: err});
            vm.loggingIn = false; 
          }, 100);

        });

      } else {

        console.log('ERROR: form is not valid');

      }

    }

  }
]);
