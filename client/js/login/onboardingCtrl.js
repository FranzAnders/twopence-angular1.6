
'use strict';

/*------------------------------------*\
    Onboarding Controller
\*------------------------------------*/

twopence.controller('onboardingCtrl', [
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

    vm.confirmationEmailSent = false; 


    //
    // If valid, sends an email with a password reset link to the email specified 
    //
    vm.sendEmailVerification = function() {

      User.verify().then(function(success) {
        vm.confirmationEmailSent = true; 
        console.log('success'); 

      }).catch(function(err) {

        console.log('error'); 

      }); 

    }

  }
]);
