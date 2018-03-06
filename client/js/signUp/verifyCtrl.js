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
      vm.userIsLoggedIn = false; 

      console.log(Auth.isAuthenticated());
      if(Auth.isAuthenticated()) {
        vm.userIsLoggedIn = true; 
      }

    }




    //
    // Checks if the token is expired, working, invalid, or if the user already verified
    //
    vm.checkTokenStatus = function(pVerifyStatus) {

      if(pVerifyStatus !== true) {
        
        if(pVerifyStatus.status === 422) {

          return 'already-verified'

        }

        if(pVerifyStatus.status === 400) {

          return 'invalid'
        
        }

      }

      if(pVerifyStatus === true) {

        mixpanel.identify(Auth.getMixpanelDistinctId());
        mixpanel.track('Verified Identity');

        $timeout(function() {

          if(vm.userIsLoggedIn) {
            $state.go('sponsor.dashboard');
          } else {
            $state.go('main.account.login');
          }
        }, 5000);

        return 'valid'

      }

    };


    //
    // Resends the verification email and updates the UI
    //
    vm.resendVerificationEmail = function() {

      vm.emailVerificationSent = false;

      if(Auth.getToken()) {

        User.verify().then(function(success) {

          vm.emailVerificationSent = true;

        }).catch(function(err) {

            console.log(err);

        });

      } else {

        $state.go('main.account.login');

      }

    }

  }

]);
