
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
  'sponsorship',
  'contributions',
  function(
    $fancyModal,
    $scope,
    $stateParams,
    $state,
    $rootScope,
    Sponsorship,
    sponsorship,
    contributions) {

    var vm = this;

    var sponseeId = $stateParams.sponseeId;


    $scope.$state = $state;


    vm.$onInit = function() {
      vm.sponsorshipId = sponseeId;
      vm.currentPlan = null;
      vm.sponsorshipInfo = sponsorship; 
      vm.currentPlan = vm.getLatestPlan(vm.sponsorshipInfo);
      vm.planStatus = Sponsorship.getPlanStatus(vm.currentPlan, vm.sponsorshipInfo);
      vm.sponsorshipInfo.contributions  = contributions.data;
    };


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

      mixpanel.track('Launched Boost', {'Origin': 'Progress Screen', 'Graduate': 'User:' + sponsee.sponsee.id})

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
