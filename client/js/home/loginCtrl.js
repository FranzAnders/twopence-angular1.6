
'use strict'; 

/*------------------------------------*\
    Login Controller
\*------------------------------------*/

twopence.controller('loginCtrl', [
        '$state',
        '$timeout',
    function(
        $state,
        $timeout) {

    var vm = this; 

    vm.logInUser = function() {

      $timeout(function() {

        $state.go('sponsor.dashboard');

        console.log('log user in');  

      }, 2000); 

    }

}]);
