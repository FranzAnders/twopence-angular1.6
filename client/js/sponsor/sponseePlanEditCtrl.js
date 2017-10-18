

'use strict'; 

/*------------------------------------*\
   Sponsee Plan Edit Controller 
\*------------------------------------*/


twopence.controller('sponseePlanEditCtrl', [
    '$stateParams', 
    '$state',   
    '$scope', 
    'Sponsorship', 
   function($stateParams,
            $state,
            $scope, 
            Sponsorship) {

    var vm = this; 

    var planId = $stateParams.plan; 

    vm.sponsee = $stateParams.sponsee; 

    if(!$stateParams.sponsee) {

      $state.go('sponsor.dashboard');

    }

    //
    // Gets a plan via an id 
    //
    Sponsorship.get(planId).then(function(plan) {

      vm.sponseePlan = plan; 

    })
    .catch(function(err) {

      console.log('no bueno'); 

    });

}]);
