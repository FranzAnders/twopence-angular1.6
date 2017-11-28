
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

    vm.sponsorshipId = sponseeId;

    $scope.$state = $state;

    console.log('reload');


    //
    // Gets information for a sponsorship 
    //
    Sponsorship.get(sponseeId).then(function(sponsorship) {

      vm.sponseeInfo = sponsorship.sponsee;

      console.log(vm.sponseeInfo); 
      
    // Gets contributions made for a sponsor's sponsorship 
    //
    Sponsorship.getContributions(sponseeId).then(function(contributions) {

      vm.sponseeInfo.contributions  = contributions.data; 

    }); 


    }).catch(function(error){

      console.log('sponsee not in system');

    });


}]);
