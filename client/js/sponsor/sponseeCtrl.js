
'use strict';

/*------------------------------------*\
   Sponsee Controller
\*------------------------------------*/

twopence.controller('sponseeCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$rootScope',
  'Sponsee',
  function(
    $scope,
    $stateParams, 
    $state,
    $rootScope, 
    Sponsee) {

    var vm = this; 

    var sponseeId = $stateParams.sponseeId; 

    $scope.$state = $state; 

    console.log('reload'); 

    Sponsee.getSponsee(sponseeId).then(function(sponsee) {

      vm.information = sponsee; 

      console.log(vm.information); 

    }).catch(function(error){

      console.log('sponsee not in system');

    });


}]); 
