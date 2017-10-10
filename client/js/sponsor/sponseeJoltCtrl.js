

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

    console.log(SponseeInformation); 

    vm.SponseeInformation = SponseeInformation;

    vm.joltSuccessfull = false; 


    vm.joltInfo = {
      "user": {
          "id" : vm.SponseeInformation.id
      }, 
      "plan": {
        "type": 'fixed',
        "frequency": 'one-time', 
        "amount": 0
      }
    };



    //
    // Jolts the sponsee if the form is valid
    //
    vm.joltSponsee = function(pJoltForm) {

      if(pJoltForm.$valid) {

        vm.joltInfo.plan.amount  = parseInt(vm.joltInfo.plan.amount);

          console.log(vm.joltInfo); 

        Sponsorship.create(vm.joltInfo).then(function(jolt) {

          console.log(jolt)

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
