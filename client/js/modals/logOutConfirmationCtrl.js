
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
         '$state', function(
                          Auth,
                          $fancyModal,
                          $rootScope,
                          $scope,
                          $state) {

    var vm = this;
    
    vm.logOut = function() {  
      
      $fancyModal.close()

      Auth.logout().then(function() {
        $state.go('main.home');
      }).catch(function(err) {
          console.log(err);
      });

    }

}]);
