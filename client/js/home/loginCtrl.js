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
  function(
    $state,
    $timeout,
    $stateParams,
    Auth,
    AUTH_EVENTS) {

    var vm = this;

    vm.form = {};

    vm.credentials = {
      username: '',
      password: ''
    };

    console.log($stateParams);

    vm.verified = {
      camefromemail: $stateParams.camefromemail
    }

    console.log(vm.verified);

    vm.logInUser = function() {

      Auth.login(vm.form).then(function(res) {
        // $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        // vm.setCurrentUser(res.data.email);
        $state.go('sponsor.dashboard');
      }).catch(function(err) {
        console.log(err);
      });



    }

  }
]);
