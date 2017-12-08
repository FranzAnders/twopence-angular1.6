

'use strict';

/*------------------------------------*\
   Sponsee Jolt Controller
\*------------------------------------*/

twopence.controller('sponseeJoltCtrl', [
    'Sponsee',
    'Sponsor',
    'SponseeInformation',
    'Sponsorship',
    '$fancyModal',
    '$scope',
    function(
        Sponsee,
        Sponsor,
        SponseeInformation,
        Sponsorship,
        $fancyModal,
        $scope) {

    var vm = this; 


    vm.sponsorshipInfo = SponseeInformation;

    console.log(vm.sponsorshipInfo); 

    vm.joltSuccessfull = false; 


    vm.joltInfo = {
      "user": {
          "id" : vm.sponsorshipInfo.id
      }, 
      "plan": {
        "type": 'fixed',
        "frequency": 'one-time', 
        "amount": 0
      }
    };



    //
    // Boosts the sponsee if the form is valid
    //
    vm.boostSponsee = function(pJoltForm) {

      if(pJoltForm.$valid) {

        vm.joltInfo.plan.amount  = parseInt(vm.joltInfo.plan.amount);

        Sponsorship.createNewPlan(vm.sponsorshipInfo.id, vm.joltInfo).then(function(success) {

        alert('Success boosting!');
          

        }).catch(function(err) {

          alert("Repeat payments of the same amount can not be made on the same day. Wait ")

        }); 

      } else {

        alert('An amount must be entered!');

      }

    };


    //
    // Closes the sponsee jolt modal
    //
    vm.closeJoltModal = function() {

      $fancyModal.close(); 

    };

}]);
