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

      vm.isActive = false; 

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

      today = yyyy + '-' + mm + '-' + dd;

      return today; 

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
    // Gets a sponsorship's information and then gets the latest plan and sponsee data  
    // also sets the customAmount in the matching limit field
    //
    var getPlan = function(pSponsorshipId) {
      Sponsorship.get(pSponsorshipId).then(function(sponsorship) {
        vm.sponsee = sponsorship.sponsee; 
        vm.latestPlan = vm.getLatestPlan(sponsorship);
        vm.customAmount = parseInt(vm.latestPlan.limit);

        //
        // We check if plan ends today, if so, it's a paused plan
        //
        vm.checkIfPaused(vm.latestPlan, getTodaysDate()); 

      })
      .catch(function(err) {
        console.log('ERROR: We were unable to get the current sponsorship information.');

      });

    }



    //
    // Check if plan ends today 
    //
    vm.checkIfPaused = function(pPlan, pTodaysDate) {

        console.log(pPlan.schedules[0].date_termination); 
        console.log(pTodaysDate); 

        var today = pTodaysDate; 

        vm.isActive = !(pPlan.schedules[0].date_termination == today); 

    }


    //
    //
    //
    // vm.checkName = function(newLimit) {

    //   console.log("Yo my dog: " + newLimit);

    //   Sponsorship.get(vm.sponsorshipId).then(function(plan) {

    //     vm.newPlan = plan;

    //     console.log(vm.sponseePlan);

    //     console.log("Plan ID: " + vm.sponseePlan.id);

    //     // console.log("User ID: " + vm.sponseePlan.user.id);

    //     console.log(vm.sponseePlan.plan);

    //     console.log(vm.sponseePlan.plan.limit);
    //     // need userID + newAmount in Data PayLoad

    //     vm.sponseePlan.plan.limit = newLimit

    //     console.log("new limit: " + vm.sponseePlan.plan.limit);

    //     var limitLoad = {

    //       "user": {

    //         "id": vm.newPlan.user.id

    //       },

    //       "plan": {

    //         "type": "match",

    //         "frequency": "monthly",

    //         "limit": newLimit,

    //         "amount": null

    //       }

    //     };

    //     console.log("Payload");

    //     console.log(limitLoad);

    //     Sponsorship.create(limitLoad);

    //   });

    //   console.log("You prob created something. Hopefully in User# : " + vm.planId);

    // };



    //
    // Gets the latest plan for a sponsorship
    //
    vm.getLatestPlan = function(pSponsorship) {
      var plan = null; 
      var plansLength = pSponsorship.plans.length - 1;  

      for(var i = plansLength; i >= 0; i--) {

        if(pSponsorship.plans[i].type == 'Match') {

            console.log(pSponsorship.plans[i]);
            return pSponsorship.plans[i]; 

        } 

      }

      return false; 
      
    }; 



    //
    // Pauses the plan 
    //
    vm.pausePlan = function(pPlan, pSponsorshipId) {

      var planId = pPlan.id; 

      var payLoad = {
        "pause": true
      }; 

      if (pPlan.schedules[0].date_termination === getTodaysDate()) {
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
            vm.checkIfPaused(pPlan, getTodaysDate()); 

          }).catch(
            function(error) {
              console.log(error); 
              vm.errorMsg = error.data.message;
              $fancyModal.open({
                template: '<div>This matching plan is already paused, please wait 24 hrs for changes to take effect.</div>',
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
            vm.checkIfPaused(); 

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
          alert("Your changes have been saved! Just note they will take effect in about 24 hours.");
          getPlan(vm.sponsorshipId); 

        })
        .catch(function(error){
          console.log(error);

          if(error.data.message ===  "User sponsor plan schedule dates cannot overlap.") {
            alert("There is a recently paused plan running with a limit of " + "$" + planInfo.plan.limit + ", please wait 24 for plans to pause.")

          }

        }

      )


      } else {


          console.log('ERROR: form is not valid'); 

      }


    }

  }
]);
