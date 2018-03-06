
'use strict';

/*------------------------------------*\
    Log Out Confirmation Controller
\*------------------------------------*/

twopence.controller('logOutConfirmationCtrl',
        [
         'Auth', 
         '$fancyModal',
         '$rootScope',
         '$scope',
         '$state',
         '$timeout', function(
                          Auth,
                          $fancyModal,
                          $rootScope,
                          $scope,
                          $state,
                          $timeout) {

    var vm = this;
    
    vm.logOut = function() {  
      
      $fancyModal.close()

      Auth.logout().then(function() {

        $timeout(function() {
          $state.go('main.home');
        }, 600); 
      }).catch(function(err) {
          console.log(err);
      });

    }

}]);
