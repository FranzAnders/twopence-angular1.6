'user strict';

/*------------------------------------*\
   E-Mail Verification Controller
\*------------------------------------*/

twopence.controller('verifyCtrl', [
  '$stateParams',
  '$state',
  '$scope',
  '$timeout',
  'User',
  'verify',  
  function($stateParams,
    $state,
    $scope, 
    $timeout,
    User,
    verify) {

    var vm = this;

    vm.$onInit = function() {

      vm.isTokenExpired = false; 

      if(verify.data.message === "Sorry, that token is expired.") {

        vm.isTokenExpired = true; 

      } else {

        $state.go("main.login", {camefromemail: true});

      }

    }

    vm.resendVerificationEmail = function() {
      User.verify();
    }

  }

]);
