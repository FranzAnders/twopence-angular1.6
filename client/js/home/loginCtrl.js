
'use strict';

/*------------------------------------*\
    Login Controller
\*------------------------------------*/

twopence.controller('loginCtrl', [
        '$state',
        '$timeout',
        'Auth',
    function(
        $state,
        $timeout,
        Auth,
        $localStorage) {

    var vm = this;

    vm.form = {};

    vm.logInUser = function() {
      Auth.login(vm.form).then(function(res){
        $state.go('sponsor.dashboard');
      }).catch(function(err){
        console.log(err);
      });


    }

}]);
