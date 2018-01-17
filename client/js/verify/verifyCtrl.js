'user strict';

/*------------------------------------*\
   E-Mail Verification Controller
\*------------------------------------*/

twopence.controller('verifyCtrl', [
  '$stateParams',
  '$state',
  '$scope',
  '$timeout',
  'Auth', 
  'User',
  'verify',  
  function($stateParams,
    $state,
    $scope, 
    $timeout,
    Auth, 
    User,
    verify) {

    var vm = this;


    vm.$onInit = function() {
      vm.emailVerificationSent = false; 
      vm.tokenStatus = vm.checkTokenStatus(verify); 

    }




    //
    // Checks if the token is expired, working, or invalid
    //
    vm.checkTokenStatus = function(pVerifyStatus) {

      console.log(pVerifyStatus); 

      if(verify !== true && verify.data.message === "Sorry, that token is expired.") {
          
        return 'expired'

      }

      if(verify !== true && verify.data.message === "Sorry, that token is invalid.") {

        return 'invalid'

      }

      if(verify === true) {

        $timeout(function() {
          $state.go('main.account.login'); 

        }, 5000); 

      }

    }; 

    vm.resendVerificationEmail = function() {

      vm.emailVerificationSent = false; 

      if(Auth.getToken()) {

        console.log(Auth.getToken())

        User.verify().then(function(success) {

          vm.emailVerificationSent = true; 

          $timeout(function() {

            $state.go("main.login", {camefromemail: true});

          }, 2000); 

        }).catch(function(err) {
          
            console.log(err); 

        });

      } else {

        $state.go('main.account.login'); 

      }

    }

  }

]);
  