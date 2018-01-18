
'use strict';

/*------------------------------------*\
   Sponsee Plan Edit Controller
\*------------------------------------*/


twopence.controller('sponseePlanEditCtrl', [
  '$stateParams',
  '$state',
  '$timeout',
  '$fancyModal',
  '$rootScope', 
  'moment', 
  'Sponsorship',
  function(
    $stateParams,
    $state,
    $timeout,
    $fancyModal,
    $rootScope, 
    moment,
    Sponsorship) {

    var vm = this;


    console.log(moment().format());
    console.log(moment().day(1));


    //
    // Sets up variables and any values required by controller before operating
    //
    vm.$onInit = function() {

      vm.sponsorshipId = $stateParams.plan;

      vm.sponsee = null;

      vm.customAmount = null

      vm.latestPlan = '';

      vm.getPlan(vm.sponsorshipId);

      vm.planStatus = 'active';


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



    //
    // Cacluating today's date to compare to termination Date in Pause / Unpause
    //
    var getTomorrowsDate = function() {

      var today = new Date();

      var dd = today.getDate() + 1;

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
    vm.getPlan = function(pSponsorshipId) {
      Sponsorship.get(pSponsorshipId).then(function(sponsorship) {

        $timeout(function() {

          vm.sponsee = sponsorship.sponsee; 
          vm.latestPlan = vm.getLatestPlan(sponsorship);
          vm.customAmount = parseInt(vm.latestPlan.limit);
          vm.isActive = vm.checkIfPaused(vm.latestPlan, getTodaysDate()); 

          //
          // Finds out the status of the plan 
          //
          vm.planStatus = Sponsorship.getPlanStatus(vm.latestPlan, sponsorship);
          
          console.log(vm.planStatus); 


        }, 100); 


      })
      .catch(function(err) {
        console.log('ERROR: We were unable to get the current sponsorship information.');

      });

    }



    //
    // Check if plan ends today 
    //
    vm.checkIfPaused = function(pPlan, pTodaysDate) {

        $timeout(function() {

        // var today = pTodaysDate; 

        // vm.isActive = (pPlan.schedules[0].date_termination == today); 

        // return pPlan.schedules[0].date_termination == today; 

        console.log('existing plan is: '); 
        console.log(pPlan); 

        var today = pTodaysDate; 

        return pPlan.schedules[0].date_termination == today; 


        }, 0); 


    };


    //
    // Gets the latest plan for a sponsorship
    //
    vm.getLatestPlan = function(pSponsorship) {
      var plan = null; 
      var plansLength = pSponsorship.plans.length - 1;  

      for(var i = 0; i <= plansLength; i++) {

        if(pSponsorship.plans[i].type == 'Match') {

            return pSponsorship.plans[i]; 

        } 

      }

      return false;
      
    };



    //
    // Pauses the plan 
    //
    vm.pausePlan = function(pPlan, pSponsorshipId, pSponsee) {

      var planId = pPlan.id; 

      var payLoad = {
        "pause": true
      }; 


      //
      // We create an object with the required info to patch the plan for $fancyModal ctrl
      //
      var sponseePlanPatchInfo = {}; 

      sponseePlanPatchInfo.planId  = planId;
      sponseePlanPatchInfo.payLoad = payLoad; 
      sponseePlanPatchInfo.sponsorshipId = pSponsorshipId; 


      if (pPlan.schedules[0].date_termination === getTodaysDate()) {
          
        $fancyModal.open({
          templateUrl: 'js/modals/plan-edit-already-paused.html',
          themeClass: 'fancymodal--primary  fancymodal--small',
          openingClass: 'is-open',
          closingClass: 'is-closed',
          showCloseButton: false

        })

      } else {

        if (pPlan.active === true) {

          $fancyModal.open({
            controller: 'planEditConfirmationCtrl as planEditConfirmation',
            templateUrl: 'js/modals/plan-edit-pausing-confirmation.html',
            themeClass: 'fancymodal--primary  fancymodal--small',
            openingClass: 'is-open',
            closingClass: 'is-closed',
            showCloseButton: false,
            resolve: {

              sponseePlanPatchInfo: function() {

                return sponseePlanPatchInfo

              },
              Sponsorship: function() {

                return Sponsorship

              },
              sponsee: function() {

                return pSponsee

              }

            }

          })



        } else {

          //
          // Sets pause prop to false to resume plan 
          //
          payLoad.pause = false;

          Sponsorship.patch(pSponsorshipId, planId, payLoad).then(function(success) {
            alert("Succes!! Your matching plan will be resumed tomorrow.");
            vm.checkIfPaused(); 

          }).catch(function(error) {

              console.log("ERROR " + error.data.message);

            });

        }

      }

    };


    //
    // Creates a plan, checks if it's paused already first if not, pauses existing one and makes
    // a new one
    //
    vm.createPlan = function(pPlanEditForm, pSponsorshipId, pSponseeInfo, pLatestPlan) {

      if(pPlanEditForm.$valid) {

        //
        // Payload to pause the existing plan 
        //
        var payLoad = {
          "pause": true
        }; 

        //
        // We create an object with the required info to patch the plan 
        //
        var sponseePlanPatchInfo = {}; 

        sponseePlanPatchInfo.planId  = pLatestPlan.id;
        sponseePlanPatchInfo.payLoad = payLoad; 
        sponseePlanPatchInfo.sponsorshipId = pSponsorshipId; 


        //
        // Holds the new plan info with data_effective set to tomorrow
        //
        var newPlanInfo = {
          "plan":{
              "type":"match",
              "frequency":"monthly",
              "limit": vm.customAmount
          },
          "schedule": {
              "date_effective" : getTomorrowsDate()
          }
        }  

        //
        // We check if plan ends today, if so, it's paused or in the process of being paused 
        // so we just make a new one. If not, we pause it and make a new one. 
        //
        if(vm.checkIfPaused(pLatestPlan, getTodaysDate())) {    
          
        console.log(newPlanInfo); 
          console.log('plan is paused or ends today, making a new one'); 

          Sponsorship.createNewPlan(pSponsorshipId, newPlanInfo)
          .then(function(success){
            alert("Your changes have been saved! Just note they will take effect in about 24 hours.");
            vm.getPlan(vm.sponsorshipId);  

          })
          .catch(function(error){
            console.log(error);

            if(error.data.message ===  "User sponsor plan schedule dates cannot overlap.") {
              alert("There is a recently paused plan running with a limit of " + "$" + planInfo.plan.limit + ", please wait 24 for plans to pause.")

            }

          });

        } else {

         Sponsorship.patch(sponseePlanPatchInfo.sponsorshipId, sponseePlanPatchInfo.planId, sponseePlanPatchInfo.payLoad)
          .then(function(success) {

            Sponsorship.createNewPlan(pSponsorshipId, newPlanInfo)
            .then(function(success){
              alert("Your changes have been saved! Just note they will take effect in about 24 hours.");
              vm.getPlan(vm.sponsorshipId);  

            })
            .catch(function(error){
              console.log(error);

              if(error.data.message ===  "User sponsor plan schedule dates cannot overlap.") {
                alert("There is a recently paused plan running with a limit of " + "$" + planInfo.plan.limit + ", please wait 24 for plans to pause.")

              }

            });

          })
          .catch(function(err) {

            console.log(err);
            alert('wrong'); 

          })

        };


      } else {
        
        console.log('ERROR: form is not valid'); 

      }


    }



    //
    // Listeners set up to listen for successes of plan being edited 
    //
    $rootScope.$on('plan-updated', function(event, pChangeData) {

      vm.getPlan(vm.sponsorshipId);

    });

  }
  
]);
