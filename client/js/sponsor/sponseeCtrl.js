
'use strict';

/*------------------------------------*\
   Sponsee Controller
\*------------------------------------*/

twopence.controller('sponseeCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$rootScope',
  'Sponsorship',
  function(
    $scope,
    $stateParams, 
    $state,
    $rootScope, 
    Sponsorship) {

    var vm = this; 

    var sponseeId = $stateParams.sponseeId; 

    $scope.$state = $state; 

    console.log('reload'); 

    Sponsorship.get(sponseeId).then(function(sponsorship) {

      vm.sponseeInfo = sponsorship.sponsee; 

    }).catch(function(error){

      console.log('sponsee not in system');

    });


}]); 
