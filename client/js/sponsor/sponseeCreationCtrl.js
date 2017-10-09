
'use strict';

/*------------------------------------*\
   Sponsee Creation Controller
\*------------------------------------*/

twopence.controller('sponseeCreationCtrl', [
    '$state',
    '$stateParams',
    '$timeout',
    'Sponsor',
    'Sponsee',
    function(
        $state,
        $stateParams,
        $timeout,
        Sponsor,
        Sponsee) {

      var vm = this;

      vm.unsubmittedForm = true;

      vm.form = {};

      vm.searchData = {}; 

      vm.cameFromEmail = $stateParams.cameFromEmail;

      vm.createSponsee = function(pSponseeSearchForm) {

        vm.unsubmittedForm = false;

        if(pSponseeSearchForm.$valid) {

          Sponsee.search(vm.searchData).then(function(res) {

            console.log(res)

          }).catch(function(err) {


          }); 
          console.log('success'); 


        } else {


          console.log('nope'); 

        }


        // $timeout(function() {

        //   vm.form.plan = {

        //     'type': '',
        //     'limit': '',
        //     'frequency': 'none',
        //     'status': 'unclaimed'

        //   };

        //   console.log(vm.form);

        //   Sponsor.addSponsee(vm.form)

        //   $state.go('sponsor.sponsorshipSetup.options', {sponseeName: vm.form.name, sponseeEmail: vm.form.email});

        // }, 1000);

      };

}]);
