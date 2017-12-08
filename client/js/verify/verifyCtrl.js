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
      vm.emailVerificationSent = false; 

      if(verify !== true && verify.data.message === "Sorry, that token is expired.") {
        vm.isTokenExpired = true; 

      } else {
        $timeout(function() {
          $state.go("main.login", {camefromemail: true});

        }, 4500); 

      }

    }

    vm.resendVerificationEmail = function() {

      vm.emailVerificationSent = false; 

      User.verify().then(function() {

        vm.emailVerificationSent = true; 

        console.log('sent');

        $timeout(function() {

          $state.go("main.login", {camefromemail: true});

        }, 2000); 

      }).catch(function(err) {
        
          console.log(err); 

      });

    }

  }

]);
