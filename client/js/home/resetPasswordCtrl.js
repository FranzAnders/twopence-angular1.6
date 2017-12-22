
'use strict';

/*------------------------------------*\
    Reset Password Controller
\*------------------------------------*/

twopence.controller('resetPasswordCtrl', [
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
    vm.sendResetPassEmail = function(pPassResetForm) {

      if(pPassResetForm.$valid) {

        console.log(vm.form); 

        console.log('its valid gogo');

      } else {

        alert("error"); 

      }


    }

  }
]);
