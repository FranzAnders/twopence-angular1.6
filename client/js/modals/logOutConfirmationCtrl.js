
'use strict';

/*------------------------------------*\
    Log Out Confirmation Controller
\*------------------------------------*/

twopence.controller('logOutConfirmationCtrl',
        [
         'Auth', 
         '$rootScope',
         '$scope',
         '$state', function(
                          Auth,
                          $rootScope,
                          $state,
                          $scope) {

    var vm = this;
    
    vm.logOut = function() {

      Auth.logout().then(function() {
        $state.go('main.home');
      }).catch(function(err) {
          console.log(err);
      });

    }

}]);
