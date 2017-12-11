
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
        controller: function() {

          var vm  = this; 

          vm.currentPlan = null;  



          //
          // Gets the latest plan for a sponsorship
          //
          vm.getLatestPlan = function(pSponsorship) {

            var plan = null; 
              var plansLength = pSponsorship.plans.length - 1;  

              for(var i = plansLength; i >= 0; i--) {

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

              vm.sponsorshipInfo; 

              vm.currentPlan = vm.getLatestPlan(vm.sponsorshipInfo); 

              console.log(vm.sponsorshipInfo);
              console.log(vm.currentPlan);


          };


        }, 
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