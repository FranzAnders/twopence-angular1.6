
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

            var plansLength = pSponsorship.plans.length; 

            plan = pSponsorship.plans[plansLength - 1];

            return plan; 

          }; 


          //
          // Sets up the properties used by the card 
          //
          vm.$onInit = function() {

              vm.sponsorshipInfo; 

              console.log(vm.sponsorshipInfo);

              vm.currentPlan = vm.getLatestPlan(vm.sponsorshipInfo); 

             console.log(vm.currentPlan); 

          };


        }, 
        controllerAs: "sponsorship", 
        bindToController: {

          "sponsorshipInfo" : "="
        },
        templateUrl: "js/sponsor/sponsorshipCard.html",
        link: function(scope, element, attrs) {



        } 

      }

}); 