
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
    '$state',
    function(
        Sponsee,
        Sponsor,
        User,
        Auth,
        $fancyModal,
        $state) {

    var vm = this;

    vm.sponsorInfo = {};


    //
    // Gets the sponsor's dashboard data : KILL THIS
    //
    //
    // Sponsor.getDashboard().then(function(dashboard) {
    //
    //   console.log(dashboard);
    //
    //   vm.sponsees = dashboard.sponsees;
    //
    //   console.log(vm.sponsees);
    //
    // }).catch(function(){
    //
    //
    //
    //   $state.go('main.signUp.identity');
    //
    // });
    //
    // vm.logout = function() {
    //   console.log("Logging you out fam-o");
    //   Auth.logout();
    // };

    //
    // New User's dashboard data
    //

    User.getUserInfo().then(function(dashboard) {

      console.log(dashboard);

      vm.sponsees = dashboard.sponsorships;

      console.log(vm.sponsees);

      Sponsor.getAllContributions().then(function(contriubutions) {

        console.log("Testing the contributions")

        console.log(contriubutions);

      });

    }).catch(function(){

      // $state.go('main.signUp.identity');

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
