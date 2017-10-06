
'use strict'; 

/*------------------------------------*\
   Sponsor Dashboard Controller
\*------------------------------------*/

twopence.controller('dashboardCtrl', [
    'Sponsee',
    'Sponsor',
    '$fancyModal',
    function(
        Sponsee,
        Sponsor,
        $fancyModal) {

    var vm = this; 

    vm.sponsorInfo = {}; 


    //
    // Get sponsor information
    //
    Sponsor.getSponsorInfo().then(function(sponsorInfo) {

      vm.sponsorInfo = sponsorInfo;

      vm.sponsorInfo.name = vm.sponsorInfo.first_name + " " + vm.sponsorInfo.last_name; 

    });


    //
    // Gets the sponsor's dashboard data
    //
    Sponsor.getDashboard().then(function(dashboard) {

      console.log(dashboard); 

    });


    //
    // Gets all the sponsees the sponsor is managing 
    //
    Sponsor.getSponsees().then(function(allSponsees) {

      vm.sponsees = allSponsees

    }); 


    //
    // Opens the jolt modal using the $fancyModal service 
    //
    vm.openJoltModal = function(sponsee) {

      $fancyModal.open({

        templateUrl: 'js/sponsor/sponsee-jolt-modal.html',
        controller: 'sponseeJoltCtrl as sponseeJolt',
        resolve: {

            SponseeInformation: function() {

              return sponsee;

            }

        }

      });

    }; 

}]);
