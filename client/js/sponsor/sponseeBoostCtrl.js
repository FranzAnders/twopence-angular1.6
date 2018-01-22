

'use strict';

/*------------------------------------*\
   Sponsee Jolt Controller
\*------------------------------------*/

twopence.controller('sponseeBoostCtrl', [
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

    vm.sponseeInfo = vm.sponsorshipInfo.sponsee; 

    vm.boostSuccessfull = false; 

    vm.confirmingBoost = false; 

    vm.boostInfo = {
      "user": {
          "id" : vm.sponsorshipInfo.id
      }, 
      "plan": {
        "type": 'fixed',
        "frequency": 'one-time', 
        "amount": null
      }
    };



    //
    // Boosts the sponsee if the form is valid
    //
    vm.boostSponsee = function(pBoostForm) {

      if(pBoostForm.$valid) {
        
        if(vm.confirmingBoost) {
          
          vm.boostInfo.plan.amount  = parseInt(vm.boostInfo.plan.amount);

          Sponsorship.createNewPlan(vm.sponsorshipInfo.id, vm.boostInfo).then(function(success) {
            vm.confirmingBoost = false; 

            vm.boostSuccessfull = true; 

          }).catch(function(err) {

            alert("Repeat payments of the same amount can not be made on the same day. Wait ")

          }); 

        } else {

           vm.confirmingBoost = true; 

        }


      } else {

        alert('An amount must be entered!');

      }

    };



    //
    // Show boost view 
    //
    vm.confirmBoost = function(pBoostForm) {
      if(pBoostForm.$valid) {

        vm.confirmingBoost = true; 

      } else {

        alert('An amount must be entered!');

      }

    };


    //
    // Resets the boost view to normal edit mode 
    //
    vm.resetBoostingView = function() {

        vm.confirmingBoost = false; 

    }; 

    //
    // Closes the sponsee jolt modal
    //
    vm.closeJoltModal = function() {

      $fancyModal.close(); 

    };


    //
    // Increases the Boost amount by 5 
    //
    vm.increaseBoostAmount = function(pIncrease) {
      vm.resetBoostingView()
      vm.boostInfo.plan.amount = vm.boostInfo.plan.amount + pIncrease; 

    };


    //
    // Decreases the Boost amount by a specified amount
    //
    vm.decreaseBoostAmount = function(pDecrease) {
      vm.resetBoostingView()

      if(vm.boostInfo.plan.amount <0 || !vm.boostInfo.plan.amount) {

        return false

      } else {

        vm.boostInfo.plan.amount = vm.boostInfo.plan.amount - pDecrease; 

      }

    };


}]);
