
'use strict';

/*------------------------------------*\
   Sponsor Dashboard Controller
\*------------------------------------*/

twopence.controller('dashboardCtrl', [
    'Sponsee',
    'Sponsor',
    'Auth',
    '$fancyModal',
    function(
        Sponsee,
        Sponsor,
        Auth,
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

      vm.sponsees = dashboard.sponsees;

      console.log(vm.sponsees);

    });

    vm.logout = function() {
      console.log("Logging you out fam-o");
      Auth.logout();
    };

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
