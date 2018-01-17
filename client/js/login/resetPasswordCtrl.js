
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

    vm.newPassword = {}; 

    vm.resetEmailSent = false; 

    vm.passwordResetSuccesfully = false; 


    //
    // If valid, sends an email with a password reset link to the email specified 
    //
    vm.sendResetPassEmail = function(pPassResetEmailForm) {

      if(pPassResetEmailForm.$valid) {

        User.sendResetPassEmail(vm.form).then(function() {

          vm.resetEmailSent = true; 

        }).catch(function() {

          vm.resetEmailSent = false; 
          alert('Reset email failed to send, please try again'); 

        });

      } else {

        alert("error"); 

      }

    }


    //
    // Resets password via email and token 
    //
    vm.resetUserPassword = function(pNewPasswordForm) {

      if(pNewPasswordForm.$valid) {

        delete vm.newPassword.confirmPassword; 

        vm.newPassword.token = $stateParams.token; 

        User.submitResetPass(vm.newPassword).then(function(response) {
      
          vm.passwordResetSuccesfully = true; 

        }).catch(function(err){


        });

      } else {

        alert("error"); 

      }

    };

  }

]);
