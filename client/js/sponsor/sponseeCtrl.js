
'use strict';

/*------------------------------------*\
   Sponsee Controller
\*------------------------------------*/

twopence.controller('sponsorshipCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$rootScope',
  'Sponsorship',
  function(
    $scope,
    $stateParams,
    $state,
    $rootScope,
    Sponsorship) {

    var vm = this;

    var sponseeId = $stateParams.sponseeId;

    vm.sponsorshipId = sponseeId;

    $scope.$state = $state;

    vm.currentPlan = null; 


    vm.$onInit = function() {

      //
      // Gets information for a sponsorship 
      //
      Sponsorship.get(sponseeId).then(function(sponsorship) {
        vm.sponsorshipInfo = sponsorship;
        vm.currentPlan = vm.getLatestPlan(sponsorship);

        // Gets contributions made for a sponsor's sponsorship 
        //
        Sponsorship.getContributions(sponseeId).then(function(contributions) {
          vm.sponsorshipInfo.contributions  = contributions.data; 
        }).catch(function() {
            console.log("ERROR: Something went wrong, please try again.");

        }); 
      }).catch(function() {
        console.log("ERROR: Something went wrong, please try again.");

      }); 

    }

    //
    // Gets the latest plan for a sponsorship
    //
    vm.getLatestPlan = function(pSponsorship) {
      var plan = null; 
      var plansLength = pSponsorship.plans.length - 1;  

      for(var i = plansLength; i >= 0; i--) {

        if(pSponsorship.plans[i].type == 'Match') {

            console.log(pSponsorship.plans[i]);
            return pSponsorship.plans[i]; 

        } 

      }

      return false; 
     
    }; 

}]);
