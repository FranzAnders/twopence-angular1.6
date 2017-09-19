
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
