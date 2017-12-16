
'use strict';

/*------------------------------------*\
  Sponsorship Card Directive
\*------------------------------------*/

twopence.directive('sponsorshipCardDir', 
        function() {

      return {

        restrict: "E", 
        replace: true, 
        scope: {}, 
        controller: ['Sponsorship', function(Sponsorship) {

          var vm  = this; 

          vm.currentPlan = null;  


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
          // Wrapper for boost sponsorship function from dashboard controller
          //
          vm.boostSponsorship = function(pSponsorship) {
              vm.boostSponsorship(pSponsorship); 
          }; 


          //
          // Sets up the properties used by the card 
          //
          vm.$onInit = function() {

              vm.currentPlan = vm.getLatestPlan(vm.sponsorshipInfo); 

              vm.planStatus = Sponsorship.getPlanStatus(vm.currentPlan, vm.sponsorshipInfo);

          };


        }], 
        controllerAs: "sponsorship", 
        bindToController: {

          "sponsorshipInfo" : "=",
          "boostSponsorship" : "&"
        },
        templateUrl: "js/sponsor/sponsorshipCard.html",
        link: function(scope, element, attrs) {



        } 

      }

}); 