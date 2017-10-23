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

    console.log(vm.sponsee);

    if (!$stateParams.sponsee) {

      $state.go('sponsor.dashboard');

    }

    //
    // Gets a plan via an id
    //
    Sponsorship.get(planId).then(function(plan) {

        vm.sponseePlan = plan;
        console.log(vm.sponseePlan);

      })
      .catch(function(err) {
        console.log('no bueno');
      });

    //
    //    checkName Method
    //

    $scope.checkName = function(newLimit) {
      console.log("Yo my dog: " + newLimit);
      Sponsorship.get(planId).then(function(plan) {
        vm.newPlan = plan;
        console.log(vm.sponseePlan);

        console.log("Plan ID: " + vm.sponseePlan.id);
        console.log("User ID: " + vm.sponseePlan.user.id);
        console.log(vm.sponseePlan.plan);
        console.log(vm.sponseePlan.plan.limit);
        // need userID + newAmount in Data PayLoad

        vm.sponseePlan.plan.limit = newLimit
        console.log("new limit: " + vm.sponseePlan.plan.limit);


        var limitLoad = {
          "user": {
            "id": vm.newPlan.user.id
          },
          "plan": {
            "type": "match",
            "frequency": "monthly",
            "limit": newLimit,
            "amount": null
          }
        };
        console.log("Payload");
        console.log(limitLoad);
        Sponsorship.create(limitLoad);

      });
      console.log("You prob created something. Hopefully in User# : " + planId);
    };

    $scope.pausePlan = function() {
      console.log("Activate pausePlan. This ID is: " + vm.sponseePlan.id);
      console.log(vm.sponseePlan);
      console.log("Is this active?: " + vm.sponseePlan.plan.active);
      var payLoad = {
        "id": vm.sponseePlan.id,
        "plan": {
          "type":"match",
          "pause": true
        }
      };
      // if (vm.sponseePlan.plan.active === true) {
      //   console.log("Patching the truf");
      //
      // } else {
      //   console.log("Patching lies");
      // }
      if (vm.sponseePlan.plan.active === true) {
        console.log("Should be paused");
        Sponsorship.patch(payLoad);
      }
      else {
        console.log("Should be resumed");
        payLoad.plan.pause = false;
        console.log("New Payload");
        console.log(payLoad);
        Sponsorship.patch(payLoad);
      }

      console.log(vm.sponseePlan);
      Sponsorship.get(payLoad.id).then(function(plan) {
        console.log(plan);
      })
    };
  }
]);
