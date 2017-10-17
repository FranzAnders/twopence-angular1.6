'use strict';

/*------------------------------------*\
    Login Controller
\*------------------------------------*/

twopence.controller('loginCtrl', [
  '$state',
  '$timeout',
  'Auth',
  'AUTH_EVENTS',
  function(
    $state,
    $timeout,
    Auth,
    AUTH_EVENTS) {

    var vm = this;

    vm.form = {};

    vm.credentials = {
      username: '',
      password: ''
    };

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
