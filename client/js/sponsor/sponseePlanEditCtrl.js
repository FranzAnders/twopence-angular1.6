'use strict';

/*------------------------------------*\
   Sponsee Plan Edit Controller
\*------------------------------------*/


twopence.controller('sponseePlanEditCtrl', [
  '$stateParams',
  '$state',
  '$scope',
  '$fancyModal',
  'Sponsorship',
  function($stateParams,
    $state,
    $scope,
    $fancyModal,
    Sponsorship) {

    var vm = this;

    var planId = $stateParams.plan;

    vm.sponsee = $stateParams.sponsee;

    vm.customAmount = ''

    console.log(planId);

    console.log(vm.sponsee);


    // Cacluating today's date to compare to Termination Date in Pause / Unpause

    var today = new Date();

    var dd = today.getDate();

    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();

    if (dd < 10) {

      dd = '0' + dd

    }

    if (mm < 10) {

      mm = '0' + mm

    }

    today = yyyy + '-' + mm + '-' + dd;

    console.log("Today be: " + today);


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

      console.log(vm.sponseePlan.plans[0].schedules[0].date_effective);

      if (vm.sponseePlan.plans[0].schedules[0].date_termination === today) {

        console.log($fancyModal)

        $fancyModal.open({

          template: '<div>Sponsorship is already paused. Please wait till tomorrow to see your paused plan.</div>',

          themeClass: 'fancymodal--secondary',

          openingClass: 'is-open',

          closingClass: 'is-closed'

        })

      } else {

        if (vm.sponseePlan.plans[0].active === true) {

          console.log("Should be paused");

          Sponsorship.patch(planId, vm.sponseePlan.plans[0].id, payLoad).catch(

            function(error) {

              console.log("You got caught son")

              console.log(error.data.message);

              vm.errorMsg = error.data.message;

              $fancyModal.open({

                template: '<div>This plan cannot be paused.</div>',

                themeClass: 'fancymodal--secondary',

                openingClass: 'is-open',

                closingClass: 'is-closed'

              })



            }

          );

        } else {

          console.log("Should be resumed");

          payLoad.pause = false;

          console.log("New Payload");

          console.log(payLoad);

          Sponsorship.patch(planId, vm.sponseePlan.plans[0].id, payLoad).catch(

            function(error) {

              console.log("Son. You was caught.");

              console.log(error.data.message);


              $fancyModal.open({

                template: '<div>This plan cannot be unpaused.</div>',

                themeClass: 'fancymodal--secondary',

                openingClass: 'is-open',

                closingClass: 'is-closed'

              })


            }

          );

        }

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

      // Create plan

      vm.createPlan = function() {

        console.log(vm.customAmount);

        console.log("Yo");

        var sponseeInfo = {
          "plan":{
              "type":"match",
              "frequency":"monthly",
              "limit": vm.customAmount
          }
        }

        console.log(sponseeInfo);

        // We should grab the sponseeID and pass it to the call

        var sponseeId = vm.sponseePlan.sponsee.ids

        Sponsorship.newPlan(planId, sponseeInfo)

          .then(function(success){

            console.log("Congrats on creating the plan");

            console.log(success);

          })

          .catch(

          function(error){

            console.log("Something bad happened");

            console.log(error.statusText);

          }

        )

      }

  }
]);
