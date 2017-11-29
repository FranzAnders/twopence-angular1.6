
'use strict';

/*------------------------------------*\
   Sponsor Dashboard Controller
\*------------------------------------*/

twopence.controller('dashboardCtrl', [
    'Sponsee',
    'Sponsor',
    'Sponsorship',
    'User',
    'Auth',
    '$fancyModal',
    '$state',
    function(
        Sponsee,
        Sponsor,
        Sponsorship,
        User,
        Auth,
        $fancyModal,
        $state) {

    var vm = this;

    vm.sponsorInfo = {};



    //
    // Gets user's info
    //
    User.getUserInfo().then(function(dashboard) {

      vm.sponsorInfo = dashboard;
      console.log(dashboard);

      vm.sponsorInfo.name = vm.sponsorInfo.first_name + " " + vm.sponsorInfo.last_name;

    }).catch(function(){

      // $state.go('main.signUp.identity');

    });



    //
    // Gets a sponsors contributions
    //
    Sponsor.getAllContributions().then(function(contributions) {

      console.log(contributions);

    });


    //
    // Gets a sponsors' sponsorships
    //
    Sponsorship.getAll().then(function(sponsorships) {

      console.log(sponsorships)
      
      vm.sponsees = sponsorships.data;

      console.log(vm.sponsees);

    });


    //
    // Logs a user out
    //
    vm.logout = function() {

      console.log("Logging you out fam-o");

      Auth.logout();

    };

    vm.sendReminder = function(sponseeId) {

      console.log("Remind me to do something");

      var remindLoad = {
        "user": {
          "id": sponseeId
        }
      };

      Sponsee.remind(remindLoad);

    }


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
