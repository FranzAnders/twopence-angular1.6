
'use strict';

/*------------------------------------*\
   Sponsee Controller
\*------------------------------------*/

twopence.controller('sponsorshipCtrl', [
  '$fancyModal',
  '$scope',
  '$stateParams',
  '$state',
  '$rootScope',
  'Sponsorship',
  function(
    $fancyModal,
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

        //
        // Finds out the status of the plan
        //
        vm.currentPlan = vm.getLatestPlan(vm.sponsorshipInfo);

        vm.planStatus = Sponsorship.getPlanStatus(vm.currentPlan, vm.sponsorshipInfo);


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

      for(var i = 0; i <= plansLength; i++) {

        if(pSponsorship.plans[i].type == 'Match') {

            return pSponsorship.plans[i];

        }

      }

    return false;

    };


        //
    // Opens the boost modal using the $fancyModal service
    //
    vm.openBoostModal = function(sponsee) {

      mixpanel.track('Launched Boost', {'Origin': 'Progress Screen', 'Recipient': 'User:' + sponsee.sponsee.id})

      $fancyModal.open({
        templateUrl: 'js/sponsor/sponsee-boost-modal.html',
        controller: 'sponseeBoostCtrl as sponseeBoost',
        themeClass: 'fancymodal--primary fancymodal--medium  fancymodal--boost',
        openingClass: 'is-open',
        closingClass: 'is-closed',
        showCloseButton: false,
        resolve: {

            SponseeInformation: function() {

              return sponsee;

            }

        }

      });

    };

}]);
