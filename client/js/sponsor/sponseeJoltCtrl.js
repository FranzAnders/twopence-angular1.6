
'use strict';

/*------------------------------------*\
   Sponsee Jolt Controller
\*------------------------------------*/

twopence.controller('sponseeJoltCtrl', [
    'Sponsee',
    'Sponsor',
    'SponseeInformation',
    '$fancyModal',
    function(
        Sponsee,
        Sponsor,
        SponseeInformation,
        $fancyModal) {

    var vm = this; 

    vm.SponseeInformation = SponseeInformation;

    vm.joltSuccessfull = false; 


    //
    // Jolts the sponsee if the form is valid
    //
    vm.joltSponsee = function() {

      if(vm.joltForm.$valid) {

        Sponsee.getSponsee(vm.SponseeInformation.email).then(function(sponsee) {
          
          var contribution = {}; 

          contribution.date = '01/03/17';
          contribution.amount = parseInt(vm.joltAmount);

          contribution.sponsee = {}; 

          contribution.sponsee.email = vm.SponseeInformation.email;
          contribution.sponsee.name = vm.SponseeInformation.name; 

          Sponsor.addContribution(contribution).then(function(contribution) {

              vm.joltSuccessfull = true; 

              console.log(vm.joltSuccessfull); 

          }); 

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
