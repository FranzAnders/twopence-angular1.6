
'use strict';

/*------------------------------------*\
   Sponsee Creation Controller
\*------------------------------------*/

twopence.controller('sponseeCreationCtrl', [
    '$state',
    '$stateParams',
    '$timeout',
    'Sponsor',
    function(
        $state,
        $stateParams,
        $timeout,
        Sponsor) {

      var vm = this;

      vm.unsubmittedForm = true;

      vm.form = {};

      vm.cameFromEmail = $stateParams.cameFromEmail;

      vm.createSponsee = function() {

        vm.unsubmittedForm = false;

        $timeout(function() {

          vm.form.plan = {

            'type': '',
            'limit': '',
            'frequency': 'none',
            'status': 'unclaimed'

          };

          console.log(vm.form);

          Sponsor.addSponsee(vm.form)

          $state.go('sponsor.sponsorshipSetup.options', {sponseeName: vm.form.name, sponseeEmail: vm.form.email});

        }, 1000);

      };

}]);
