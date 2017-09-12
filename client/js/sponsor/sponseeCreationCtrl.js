
'use strict';

/*------------------------------------*\
   Sponsee Creation Controller
\*------------------------------------*/

twopence.controller('sponseeCreationCtrl', [
    '$state',
    '$timeout',
    function(
        $state,
        $timeout) {

      var vm = this; 

      vm.unsubmittedForm = true; 

      vm.form = {}; 

      vm.createSponsee = function() {

        vm.unsubmittedForm = false;

        $timeout(function() {

          $state.go('sponsor.sponsorshipSetup.options', {sponseeName: vm.form.name, sponseeEmail: vm.form.email}); 

        }, 1400); 

      };

}]); 
