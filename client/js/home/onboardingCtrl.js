
'use strict';

/*------------------------------------*\
    Reset Password Controller
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

    vm.form = {};


    //
    // If valid, sends an email with a password reset link to the email specified 
    //
    vm.sendEmailVerification = function() {

      User.verify(); 

    }

  }
]);
