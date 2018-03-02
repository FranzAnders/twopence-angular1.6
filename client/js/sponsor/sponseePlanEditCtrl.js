
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
  '$filter',
  'moment',
  'Sponsorship',
  function(
    $stateParams,
    $state,
    $timeout,
    $fancyModal,
    $rootScope,
    $filter,
    moment,
    Sponsorship) {

    var vm = this;



    //
    // Sets up variables and any values required by controller before operating
    //
    vm.$onInit = function() {

      vm.sponsorshipId = $stateParams.plan;
      vm.sponseeInfo = null;
      vm.customAmount = null
      vm.latestPlan = '';
      vm.getPlan(vm.sponsorshipId); 
      vm.planStatus = null;

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
    // Returns todays date in converted format "yyyy-MM-dd"
    //
    var getTodaysDate = function() {

      var dateISO = moment().format();
      var convertedDate = $filter('date')(dateISO, 'yyyy-MM-dd');
      var today = convertedDate;

      return today

    };



    //
    // Returns tomorrows date in converted format "yyyy-MM-dd"
    //
    var getTomorrowsDate = function() {

      var dateISO = moment().add(1, 'days').format();
      var convertedDate = $filter('date')(dateISO, 'yyyy-MM-dd');
      var tomorrow = convertedDate;

      return tomorrow

    };



    //
    // Gets a sponsorship's information and then gets the latest plan and sponsee data
    // also sets the customAmount in the matching limit field. It also gets the current
    // plan status using the Sponsorship service
    //
    vm.getPlan = function(pSponsorshipId) {
      Sponsorship.get(pSponsorshipId).then(function(sponsorship) {

        $timeout(function() {

          vm.sponseeInfo = sponsorship;
          vm.latestPlan = vm.getLatestPlan(sponsorship);
          vm.customAmount = parseInt(vm.latestPlan.limit);

          //
          // Finds out the status of the plan
          //
          vm.planStatus = Sponsorship.getPlanStatus(vm.latestPlan, sponsorship);


        }, 0);

      })
      .catch(function(err) {
        console.log('ERROR: We were unable to get the current sponsorship information.');

      });

    }



    //
    // Check if plan ends today by checking if it ends today
    //
    vm.checkIfPaused = function(pPlan, pSponseeInfo) {

      var planStatus = Sponsorship.getPlanStatus(pPlan, pSponseeInfo);

      if(planStatus === 'paused') {
        return true;

      } else {
        return false
      }

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
            themeClass: 'fancymodal--primary  fancymodal--confirmation  fancymodal--small',
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
              sponsorshipInfo: function() {

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

            $fancyModal.open({
              templateUrl: 'js/modals/plan-edit-success.html',
              themeClass: 'fancymodal--primary  fancymodal--small',
              openingClass: 'is-open',
              closingClass: 'is-closed',
              showCloseButton: false

            });

            mixpanel.track('Resumed Plan', {'Graduate': 'User:' + pSponsee.sponsee.id})
            $rootScope.$emit('plan-updated');


          }).catch(function(error) {

            $fancyModal.open({
              templateUrl: 'js/modals/plan-edit-error.html',
              themeClass: 'fancymodal--primary  fancymodal--small',
              openingClass: 'is-open',
              closingClass: 'is-closed',
              showCloseButton: false

            });

          });

        }

      }

    };


    //
    // Creates a plan, checks if it's paused already first if not,
    // pauses existing one and makes
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

        // Mixpanel event properties.
        var oldLimit = pLatestPlan.limit;
        var newLimit = vm.customAmount;
        var diff = newLimit - oldLimit;
        var change = 'Default';
        if (diff > 0) {
          change = 'Increase'
        };
        if (diff < 0) {
          change = 'Decrease'
        };
        var properties = {
          'Graduate' : 'User:' + pSponseeInfo.sponsee.id,
          'New Limit': newLimit,
          'Change': change,
          'Change Amount': diff
        };

        //
        // We check if plan ends today, if so, it's paused or in the process of being paused
        // so we just make a new one. If not, we pause it and make a new one.
        //
        if(vm.checkIfPaused(pLatestPlan, pSponseeInfo)) {

          Sponsorship.createNewPlan(pSponsorshipId, newPlanInfo)
          .then(function(success){

          mixpanel.track('Changed Plan Limit', properties);

           $fancyModal.open({
              templateUrl: 'js/modals/plan-edit-success.html',
              themeClass: 'fancymodal--primary  fancymodal--small',
              openingClass: 'is-open',
              closingClass: 'is-closed',
              showCloseButton: false

            });

            $rootScope.$emit('plan-updated');

          })
          .catch(function(err){

            $fancyModal.open({
              templateUrl: 'js/modals/plan-edit-error.html',
              themeClass: 'fancymodal--primary  fancymodal--small',
              openingClass: 'is-open',
              closingClass: 'is-closed',
              showCloseButton: false

            });

          });

        } else {

         Sponsorship.patch(sponseePlanPatchInfo.sponsorshipId, sponseePlanPatchInfo.planId, sponseePlanPatchInfo.payLoad)
          .then(function(success) {

            Sponsorship.createNewPlan(pSponsorshipId, newPlanInfo)
            .then(function(success){

            mixpanel.track('Changed Plan Limit', properties);

             $fancyModal.open({
                templateUrl: 'js/modals/plan-edit-success.html',
                themeClass: 'fancymodal--primary  fancymodal--small',
                openingClass: 'is-open',
                closingClass: 'is-closed',
                showCloseButton: false

              });

              $rootScope.$emit('plan-updated');

            })
            .catch(function(err){

              console.log(err);

              $fancyModal.open({
                templateUrl: 'js/modals/plan-edit-error.html',
                themeClass: 'fancymodal--primary  fancymodal--small',
                openingClass: 'is-open',
                closingClass: 'is-closed',
                showCloseButton: false

              });

            });

          })
          .catch(function(err) {

            console.log(err)
           $fancyModal.open({
              templateUrl: 'js/modals/plan-edit-error.html',
              themeClass: 'fancymodal--primary  fancymodal--small',
              openingClass: 'is-open',
              closingClass: 'is-closed',
              showCloseButton: false

            });

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
