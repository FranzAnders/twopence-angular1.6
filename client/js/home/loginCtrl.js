'use strict';

/*------------------------------------*\
    Login Controller
\*------------------------------------*/

twopence.controller('loginCtrl', [
  '$state',
  '$timeout',
  '$stateParams',
  'Auth',
  'AUTH_EVENTS',
  'User',
  function(
    $state,
    $timeout,
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
    // Resets the form submission erros object 
    //
    var resetFormSubmissionErrors = function() {
      vm.formSubmissionErrors.invalidCombination = false; 
      vm.formSubmissionErrors.rateLimitError = false; 
      vm.formSubmissionErrors.error = false; 

    }


    //
    // Logs in a user if the form is valid and there are no errors with the information provided 
    //
    vm.logInUser = function(pLoginForm) {
      resetFormSubmissionErrors(); 

      if(pLoginForm.$valid) {

        Auth.login(vm.form).then(function(res) {

          console.log(res); 

          User.getUserInfo().then(function(userInfo) {

            console.log(userInfo); 

            if(userInfo.sponsor.status === "onboarding") {

              $state.go('main.signUp.confirmation');

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
          vm.errData = err.data; 
          vm.formSubmissionErrors.error = true;
          
          if(vm.errData.message === "Sorry, that\'s an invalid email/password combination.") {
              vm.formSubmissionErrors.invalidCombination = true; 
          }

          if(vm.errData.code === "rate_limit_error") {
            vm.formSubmissionErrors.rateLimitError = true; 

          }

        });

      } else {
        console.log('ERROR: form is not valid'); 

      }

    }

  }
]);
