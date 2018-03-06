
'use strict';

/*------------------------------------*\
   Sponsor Dashboard Controller
\*------------------------------------*/

twopence.controller('dashboardCtrl', [
    'Sponsee',
    'Sponsor',
    'User',
    'Auth',
    '$fancyModal',
    '$rootScope',
    '$state',
    '$timeout',
    'sponsorships',
    function(
        Sponsee,
        Sponsor,
        User,
        Auth,
        $fancyModal,
        $rootScope,
        $state,
        $timeout,
        sponsorships) {

    var vm = this;

    vm.sponsorInfo = {};

    vm.$onInit = function() {
      vm.sponsorships = sponsorships.data;
      vm.totalContributions = vm.getTotalContributions(sponsorships.data);
    };


    //  
    // Gets user's info and name vm.sponsorInfo, vm.sponsorInfo.name
    //
    vm.getUserInfo = function() {

      User.getUserInfo().then(function(dashboard) {
        $timeout(function() {
          vm.sponsorInfo = dashboard;
          console.log(vm.sponsorInfo); 
        },100);
      }).catch(function(err){
        console.log(err);
      });

    }


    //
    // Gets total Contributions and returns the total given
    //
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



    //
    // Opens the jolt modal using the $fancyModal service
    //
    vm.openBoostModal = function(sponsee) {

      mixpanel.track('Launched Boost', {'Origin': 'Home Screen', 'Graduate': 'User:' + sponsee.sponsee.id})

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


    //
    // Listens for a boost being made event to update the total given
    //
    $rootScope.$on('sponsor-boosted-sponsee', function() {
      vm.getUserInfo(); 
    }); 


    vm.getUserInfo(); 

}]);
