
'use strict';

/*------------------------------------*\
    Plan Edit Confirmation πController
\*------------------------------------*/

twopence.controller('planEditConfirmationCtrl',
        ['sponseePlanPatchInfo',
         'Sponsorship',
         'sponsorshipInfo',
         '$fancyModal',
         '$rootScope',
         '$scope', function(
                          sponseePlanPatchInfo,
                          Sponsorship,
                          sponsorshipInfo,
                          $fancyModal,
                          $rootScope,
                          $scope) {

    var vm = this;


    vm.sponsee = sponsorshipInfo.sponsee;

    vm.succesfullyEdited = false;

    vm.patchPlan = function() {

      Sponsorship.patch(sponseePlanPatchInfo.sponsorshipId, sponseePlanPatchInfo.planId, sponseePlanPatchInfo.payLoad)
      .then(function(success) {
        console.log(success);
        vm.succesfullyEdited = true;
        mixpanel.track('Paused Plan', {'Graduate': 'User:' + sponsorshipInfo.sponsee.id})
        $rootScope.$emit('plan-updated');

      }).catch(function(error) {
          console.log(error);
          vm.succesfullyEdited = false;

        }

      );

    };

}]);
