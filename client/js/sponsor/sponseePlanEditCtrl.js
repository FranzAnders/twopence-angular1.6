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

    console.log(planId);

    console.log(vm.sponsee);
    // To Do
    // Send Object To Sponsorship Edit Control via Route
    // Save into Sponsee


    // if (!$stateParams.sponsee) {
    //
    //   $state.go('sponsor.dashboard');
    //
    // }

    //
    // Gets a plan via an id
    //

    Sponsorship.get(planId).then(function(plan) {

        vm.sponseePlan = plan;

        console.log(vm.sponseePlan);
        console.log('Testing plan');
        console.log(vm.sponseePlan.plans["0"].limit);
        console.log(vm.sponseePlan.sponsee.status);
        // To-Do : Detect Active true
        // Knows what to Send out if Active or Not

      })

      .catch(function(err) {

        console.log('no bueno');

      });

    //
    //    checkName Method
    //

    vm.checkName = function(newLimit) {

      console.log("Yo my dog: " + newLimit);

      Sponsorship.get(planId).then(function(plan) {

        vm.newPlan = plan;

        console.log(vm.sponseePlan);

        console.log("Plan ID: " + vm.sponseePlan.id);

        // console.log("User ID: " + vm.sponseePlan.user.id);

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

    vm.pausePlan = function() {

      console.log(vm.sponseePlan);

      console.log("Is this active?: ");

      //
      // To Do: Make For Loop if
      // Plan array contains more than 1 object
      //

      console.log(vm.sponseePlan.plans[0].id)

      var payLoad = {

          "pause": true

      };

      if (vm.sponseePlan.plans[0].active === true) {

        console.log("Should be paused");

        Sponsorship.patch(planId, vm.sponseePlan.plans[0].id, payLoad);

      }

      else {

        console.log("Should be resumed");

        payLoad.pause = false;

        console.log("New Payload");

        console.log(payLoad);

        Sponsorship.patch(planId, vm.sponseePlan.plans[0].id, payLoad);

      }

      console.log(vm.sponseePlan);

      //
      // When it's paused then it knows what to send
      //

      // Sponsorship.get(payLoad.id).then(function(plan) {
      //
      //   console.log(plan);
      //
      // })

    };
  }
]);
