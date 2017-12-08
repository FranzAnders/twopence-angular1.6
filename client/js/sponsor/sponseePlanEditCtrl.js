'use strict';

/*------------------------------------*\
   Sponsee Plan Edit Controller
\*------------------------------------*/


twopence.controller('sponseePlanEditCtrl', [
  '$stateParams',
  '$state',
  '$timeout',
  '$fancyModal',
  'Sponsorship',
  function(
    $stateParams,
    $state,
    $timeout,
    $fancyModal,
    Sponsorship) {

    var vm = this;


    //
    // Sets up variables and any values required by controller before operating
    //
    vm.$onInit = function() {

      vm.sponsorshipId = $stateParams.plan;

      vm.sponsee = null;

      vm.customAmount = null

      vm.latestPlan = '';

      getPlan(vm.sponsorshipId);

    }



    //
    // Rounds numbers to prevent decimals and keep numbers whole 
    //
    var numRound = function(number, precision) {

      var factor = Math.pow(10, precision);

      var tempNumber = number * factor;

      var roundedTempNumber = Math.round(tempNumber);

      return roundedTempNumber / factor;

    }



    //
    // Cacluating today's date to compare to termination Date in Pause / Unpause
    //
    var getTodaysDate = function() {

      var today = new Date();

      var dd = today.getDate();

      var mm = today.getMonth() + 1; 

      var yyyy = today.getFullYear();

      if (dd < 10) {

        dd = '0' + dd

      }

      if (mm < 10) {

        mm = '0' + mm

      }

      return today = yyyy + '-' + mm + '-' + dd;

    };



    // To Do
    // Send Object To Sponsorship Edit Control via Route
    // Save into Sponsee


    // if (!$stateParams.sponsee) {
    //
    //   $state.go('sponsor.dashboard');
    //
    // }

    //
    // Gets a sponsorship's plans and then gets the latest one 
    //
    var getPlan = function(pSponsorshipId) {

      Sponsorship.get(pSponsorshipId).then(function(sponsorship) {
        console.log(sponsorship); 
        vm.sponsee = sponsorship.sponsee; 
        vm.latestPlan = vm.getLatestPlan(sponsorship);
        console.log(vm.latestPlan); 
        vm.customAmount = parseInt(vm.latestPlan.limit);

      })
      .catch(function(err) {
        console.log('ERROR: We were unable to get the current sponsorship information.');

      });

    }


    //
    //
    //
    vm.checkName = function(newLimit) {

      console.log("Yo my dog: " + newLimit);

      Sponsorship.get(vm.sponsorshipId).then(function(plan) {

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

      console.log("You prob created something. Hopefully in User# : " + vm.planId);

    };



    //
    // Gets the latest plan for a sponsorship
    //
    vm.getLatestPlan = function(pSponsorship) {
      var plan = null; 
      var plansLength = pSponsorship.plans.length; 
      plan = pSponsorship.plans[plansLength - 1];
      return plan; 

    }; 



    //
    // Pauses the plan 
    //
    vm.pausePlan = function(pPlan, pSponsorshipId) {

      console.log(pPlan);

      var planId = pPlan.id; 

      var payLoad = {
        "pause": true
      }; 

      if (pPlan.schedules[0].date_termination === getTodaysDate()) {
        console.log('already paused'); 
        console.log($fancyModal)

        $fancyModal.open({
          template: '<div>This plan is already in the process of being paused, please wait 24 hours for changes to take effect.</div>',
          themeClass: 'fancymodal--secondary',
          openingClass: 'is-open',
          closingClass: 'is-closed'

        })

      } else {

        if (pPlan.active === true) {

          Sponsorship.patch(pSponsorshipId, planId, payLoad)
          .then(function() {
            alert('You’ve successfully paused your plan. Your changes will take 24 hours to go into effect.');

          }).catch(
            function(error) {
              console.log(error.data.message);
              vm.errorMsg = error.data.message;
              $fancyModal.open({
                template: '<div>This plan is already in the process of being paused, please wait 24 hours for changes to take effect.</div>',
                themeClass: 'fancymodal--secondary',
                openingClass: 'is-open',
                closingClass: 'is-closed'

              })

            }

          );

        } else {

          //
          // Sets pause prop to false to resume plan 
          //
          payLoad.pause = false;

          Sponsorship.patch(pSponsorshipId, planId, payLoad).then(function(success) {
            alert("Plan is now being resumed.");

          }).catch(function(error) {

              console.log("ERROR " + error.data.message);

            });

        }

      }

    };


    //
    // Create plan
    //
    vm.createPlan = function(pPlanEditForm, pSponsorshipId, pSponseeInfo) {

      if(pPlanEditForm.$valid) {

        var planInfo = {
          "plan":{
              "type":"match",
              "frequency":"monthly",
              "limit": vm.customAmount
          }
        }

      var sponseeId = pSponseeInfo.id; 

      Sponsorship.createNewPlan(pSponsorshipId, planInfo)
        .then(function(success){
          alert("Your changes have been saved! Just note they will take effect within 24 hours.");
          getPlan(vm.sponsorshipId); 
          console.log(vm.latestPlan); 

        })
        .catch(function(error){
          console.log(error);
          console.log("ERROR: New Plan could not be made.");

        }

      )


      } else {


          console.log('ERROR: form is not valid'); 

      }


    }

  }
]);
