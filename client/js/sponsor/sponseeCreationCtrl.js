
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

      vm.sponseeId = null; 

      vm.cameFromEmail = $stateParams.cameFromEmail;


      //
      // Searches a sponsee and sets the sponsee id in the controller 
      // so sponsor can then set a plan based on the id returned. 
      // If succesful, we take the sponsor to the sponsorship setup state and 
      // use parameters to give id of sponsor 
      //
      vm.searchSponsee = function(pSponseeSearchForm) {

        vm.unsubmittedForm = false;

        if(pSponseeSearchForm.$valid) {

          Sponsee.search(vm.searchData).then(function(res) {

            vm.sponseeId = res.id; 

            console.log('success');

            $state.go('sponsor.sponsorshipSetup.options', {sponseeId: vm.sponseeId})

          }).catch(function(err) {

            console.log('rejected, something went wrong')

          }); 

        } else {

          console.log('nope, the form is not right'); 

        }

      };

}]);
