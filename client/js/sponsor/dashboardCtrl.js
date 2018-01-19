
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

      vm.sponsorInfo.name = vm.sponsorInfo.first_name + " " + vm.sponsorInfo.last_name;

    }).catch(function(err){

      console.log(err); 

      // $state.go('main.signUp.identity');

    });


    //
    // Gets a sponsors' sponsorships and total contributions made 
    //
    Sponsorship.getAll().then(function(sponsorships) {
      vm.sponsorships = sponsorships.data;

      vm.totalContributions = vm.getTotalContributions(sponsorships.data); 

    }).catch(function(err){

      console.log(err); 

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
