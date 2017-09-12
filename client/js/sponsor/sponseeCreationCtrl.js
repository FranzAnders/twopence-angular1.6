
'use strict';

/*------------------------------------*\
   Sponsee Creation Controller
\*------------------------------------*/

twopence.controller('sponseeCreationCtrl', [
    '$state',
    '$timeout',
    'Sponsee',
    function(
        $state,
        $timeout,
        Sponsee) {

      var vm = this; 

      vm.unsubmittedForm = true; 

      vm.form = {}; 

      vm.createSponsee = function() {

        vm.unsubmittedForm = false;

        $timeout(function() {

          Sponsee.addSponsee(vm.form);

          $state.go('sponsor.sponsorshipSetup.options', {sponseeName: vm.form.name, sponseeEmail: vm.form.email}); 

        }, 1000); 

      };

}]); 
