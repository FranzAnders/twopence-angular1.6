
'use strict';

/*------------------------------------*\
    Plan Edit Confirmation πController
\*------------------------------------*/

twopence.controller('planEditConfirmationCtrl', 
        ['sponseePlanPatchInfo', 
         'Sponsorship',
         'sponsee',
         '$fancyModal',
         '$rootScope', 
         '$scope', function(
                          sponseePlanPatchInfo, 
                          Sponsorship,
                          sponsee,
                          $fancyModal,
                          $rootScope, 
                          $scope) {

    var vm = this; 

    vm.sponsee = sponsee; 

    vm.succesfullyEdited = false; 


    vm.patchPlan = function() {

      Sponsorship.patch(sponseePlanPatchInfo.sponsorshipId, sponseePlanPatchInfo.planId, sponseePlanPatchInfo.payLoad)
      .then(function(success) {
        console.log(success); 
        vm.succesfullyEdited = true; 
        $rootScope.$emit('plan-updated'); 

      }).catch(function(error) {
          console.log(error); 
          vm.succesfullyEdited = false;

        }

      );

    };

}]); 
