
'use strict';

/*------------------------------------*\
   Sponsee Creation Controller
\*------------------------------------*/

twopence.controller('sponseeCreationCtrl', [
    '$state',
    '$stateParams',
    '$timeout',
    'Sponsee',
    function(
        $state,
        $stateParams,
        $timeout,
        Sponsee) {

      var vm = this; 

      vm.unsubmittedForm = true; 

      vm.form = {}; 

      vm.cameFromEmail = $stateParams.cameFromEmail; 

      vm.createSponsee = function() {

        vm.unsubmittedForm = false;

        $timeout(function() {

          Sponsee.addSponsee(vm.form);

          $state.go('sponsor.sponsorshipSetup.options', {sponseeName: vm.form.name, sponseeEmail: vm.form.email}); 

        }, 1000); 

      };

}]); 
