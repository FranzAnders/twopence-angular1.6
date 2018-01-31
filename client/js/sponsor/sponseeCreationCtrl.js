
'use strict';

/*------------------------------------*\
   Sponsee Creation Controller
\*------------------------------------*/

twopence.controller('sponseeCreationCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    'Sponsor',
    'Sponsee',
    'Sponsorship',
    'User', 
    function(
        $scope,
        $state,
        $stateParams,
        $timeout,
        Sponsor,
        Sponsee,
        Sponsorship, 
        User) {

      var vm = this;

      vm.unsubmittedForm = true;

      vm.form = {};

      vm.searchData = {};

      vm.sponseeId = null;

      vm.cameFromEmail = $stateParams.cameFromEmail;



      // User.getUserInfo().then(function(userInfo) {



      // }); 


    //
    // Gets a sponsors' sponsorships and total contributions made are set on vm.totalContributions
    //
    Sponsorship.getAll().then(function(sponsorships) {

        if(vm.checkForMissingPlans(sponsorships.data)) {

          vm.sponsorshipsMissingPlans = sponsorships.data;

          console.log(vm.sponsorshipsMissingPlans); 
          
        }

      }).catch(function(err){

        console.log(err);

      }); 


      //
      // Checks if the sponsor has sponsorships with missing plans 
      //
      vm.checkForMissingPlans = function(pUserSponsorships) {

        var missingPlans = [];

        missingPlans = Sponsorship.getSponsorshipsMissingPlans(pUserSponsorships);

        if(missingPlans.length > 0) {

          return true

        }

      };



      //
      // Searches a sponsee and sets the sponsee id in the controller
      // so sponsor can then set a plan based on the id returned.
      // If succesful, we take the sponsor to the sponsorship setup state and
      // use parameters to give id of sponsor
      //
      vm.searchSponsee = function(pSponseeSearchForm) {

        vm.unsubmittedForm = false;

        console.log(vm.searchData);

        vm.sponseeInfo = {
          "user": vm.searchData
        };

        console.log(vm.sponseeInfo);

        if(pSponseeSearchForm.$valid) {

            mixpanel.track('Selected Graduate');

            $state.go('sponsor.sponsorshipSetup.options', {data: vm.sponseeInfo.user , email: vm.sponseeInfo.user.email});

        } else {

          console.log('nope, the form is not right');

        }

      };

}]);
