
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
    // Gets a sponsors' sponsorships and total contributions made 
    //
    Sponsorship.getAll().then(function(sponsorships) {

      vm.sponsorships = sponsorships.data;

      vm.totalContributions = vm.getTotalContributions(sponsorships.data); 

    });



    vm.getTotalContributions = function(sponsorships) {

      var total = 0; 

      for(var i = 0; i <= sponsorships.length; i++) {

        if(sponsorships[i]) {
        
         total = total + parseInt(sponsorships[i].contributions_to_date);

        }

      }

      return total;

    };

    //
    // Logs a user out
    //
    vm.logout = function() {

      console.log("Logging you out fam-o");

      Auth.logout();

    };

    vm.sendReminder = function(sponseeId) {

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
    vm.openBoostModal = function(sponsee) {

      $fancyModal.open({
        templateUrl: 'js/sponsor/sponsee-jolt-modal.html',
        controller: 'sponseeJoltCtrl as sponseeJolt',
        themeClass: 'fancymodal--primary fancymodal--small',
        openingClass: 'is-open',
        closingClass: 'is-closed',
        resolve: {

            SponseeInformation: function() {

              return sponsee;

            }

        }

      });

    };

}]);
