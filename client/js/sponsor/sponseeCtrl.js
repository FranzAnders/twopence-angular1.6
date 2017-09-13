
'use strict';

/*------------------------------------*\
   Sponsee Controller
\*------------------------------------*/

twopence.controller('sponseeCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  'Sponsee',
  function(
    $scope,
    $stateParams, 
    $state,
    Sponsee) {

    var vm = this; 

    var sponseeEmail = $stateParams.sponseeEmail; 

    $scope.$state = $state; 

    console.log('reload'); 

    Sponsee.getSponsee(sponseeEmail).then(function(sponsee) {

      vm.information = sponsee; 

      console.log(vm.information); 

    }).catch(function(error){

      console.log('sponsee not in system');

    });

}]); 
