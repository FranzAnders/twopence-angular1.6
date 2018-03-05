
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
          console.log(vm.sponseeInfo);
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
    // Pauses the plan by sending a pause payload set to true 
    //
    vm.pausePlan = function(pSponsorship, pSponsee) {

      //
      // The current plan being worked with, we check it later for its status
      //
      var latestPlan = pSponsorship.plans[0];
      var sponsorshipId = pSponsorship.id; 
      var planId = latestPlan.id;

      var payLoad = {
        "pause": true
      };

      //
      // We patch the active plan and make a new one to take its' place 
      //
      Sponsorship.patch(sponsorshipId, planId, payLoad)
      .then(function(success) {
        $rootScope.$emit('plan-updated');
      })
      .catch(function(err) {
        $fancyModal.open({
          templateUrl: 'js/modals/plan-edit-error.html',
          themeClass: 'fancymodal--primary  fancymodal--small',
          openingClass: 'is-open',
          closingClass: 'is-closed',
          showCloseButton: false
        });
      });
    };



    //
    // Resumes a plan by sending a pause pauload set to false
    //
    vm.resumePlan = function(pSponsorship, pSponsee) {

      //
      // The current plan being worked with, we check it later for its status
      //
      var latestPlan = pSponsorship.plans[0];
      var sponsorshipId = pSponsorship.id; 

        
      //
      // Payload to pause the existing plan
      //
      var payLoad = {
        "pause": false
      };


      //
      // We patch the active plan and make a new one to take its' place 
      //
      Sponsorship.patch(sponsorshipId, latestPlan.id, payLoad)
      .then(function(success) {
        $rootScope.$emit('plan-updated');
      })
      .catch(function(err) {
        $fancyModal.open({
          templateUrl: 'js/modals/plan-edit-error.html',
          themeClass: 'fancymodal--primary  fancymodal--small',
          openingClass: 'is-open',
          closingClass: 'is-closed',
          showCloseButton: false
        });
      });

    };


    vm.cancelActivation = function(pSponsorship, pSponsee) {

      //
      // The current plan being worked with, we check it later for its status
      //
      var latestPlan = pSponsorship.plans[0];
      var sponsorshipId = pSponsorship.id; 

        
      //
      // Payload to pause the existing plan
      //
      var payLoad = {
        "cancel": true
      };


      //
      // We patch the active plan and make a new one to take its' place 
      //
      Sponsorship.patch(sponsorshipId, latestPlan.id, payLoad)
      .then(function(success) {
        $rootScope.$emit('plan-updated');
      })
      .catch(function(err) {
        $fancyModal.open({
          templateUrl: 'js/modals/plan-edit-error.html',
          themeClass: 'fancymodal--primary  fancymodal--small',
          openingClass: 'is-open',
          closingClass: 'is-closed',
          showCloseButton: false
        });
      });

    }

    //
    // Change's the plan's limit 
    //
    vm.changePlanLimit = function(pPlanEditForm, pSponsorship, pNewLimit) {

        //
        // The current plan being worked with, we check it later for its status
        //
        var latestPlan = pSponsorship.plans[0];
        var sponsorshipId = pSponsorship.id; 


        //
        // Mixpanel event properties.
        //
        var oldLimit = latestPlan.limit;
        var newLimit = pNewLimit;
        var diff = newLimit - oldLimit;
        var change = 'Default';
        if (diff > 0) {
          change = 'Increase'
        };
        if (diff < 0) {
          change = 'Decrease'
        };
        var properties = {
          'Graduate' : 'User:' + pSponsorship.sponsee.id,
          'New Limit': newLimit,
          'Change': change,
          'Change Amount': diff
        };


      if(pPlanEditForm.$valid) {

        if(latestPlan.status === 'deactivating' || latestPlan.status === 'inactive') {
          //
          // Holds the new plan info with data_effective set to tomorrow
          //
          var newPlanInfo = {
            "plan":{
                "type":"match",
                "frequency":"monthly",
                "limit": pNewLimit
            },
            "schedule": {}
          }

          if(latestPlan.status === 'deactivating') {
            newPlanInfo.schedule.date_effective = getTomorrowsDate(); 
          } else {
            newPlanInfo.schedule.date_effective = getTodaysDate(); 
          }
          vm.createNewPlan(sponsorshipId, newPlanInfo, properties);

        }

        if(latestPlan.status === 'active') {

          //
          // Holds the new plan info with data_effective set to tomorrow
          //
          var newPlanInfo = {
            "plan":{
                "type":"match",
                "frequency":"monthly",
                "limit": pNewLimit
            },
            "schedule" : {
              'date_effective' : getTomorrowsDate() 
            }
          }

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
          sponseePlanPatchInfo.planId  = latestPlan.id;
          sponseePlanPatchInfo.payLoad = payLoad;
          sponseePlanPatchInfo.sponsorshipId = sponsorshipId;


          //
          // We patch the active plan and make a new one to take its' place 
          //
          Sponsorship.patch(sponseePlanPatchInfo.sponsorshipId, sponseePlanPatchInfo.planId, sponseePlanPatchInfo.payLoad)
          .then(function(success) {
            vm.createNewPlan(sponsorshipId, newPlanInfo, properties); 
          })
          .catch(function(err) {
            $fancyModal.open({
              templateUrl: 'js/modals/plan-edit-error.html',
              themeClass: 'fancymodal--primary  fancymodal--small',
              openingClass: 'is-open',
              closingClass: 'is-closed',
              showCloseButton: false
            });

          });

        }

        if(latestPlan.status === 'activating') {

          //
          // Holds the new plan info with data_effective set to tomorrow
          //
          var newPlanInfo = {
            "plan":{
                "type":"match",
                "frequency":"monthly",
                "limit": pNewLimit
            },
            "schedule" : {
              'date_effective' : getTomorrowsDate() 
            }
          }


          //
          // Payload to pause the existing plan
          //
          var payLoad = {
            "cancel": true
          };

          //
          // We create an object with the required info to patch the plan
          //
          var sponseePlanPatchInfo = {};
          sponseePlanPatchInfo.planId  = latestPlan.id;
          sponseePlanPatchInfo.payLoad = payLoad;
          sponseePlanPatchInfo.sponsorshipId = sponsorshipId;


          //
          // We patch the active plan and make a new one to take its' place 
          //
          Sponsorship.patch(sponseePlanPatchInfo.sponsorshipId, sponseePlanPatchInfo.planId, sponseePlanPatchInfo.payLoad)
          .then(function(success) {
            vm.createNewPlan(sponsorshipId, newPlanInfo, properties); 
          })
          .catch(function(err) {
            $fancyModal.open({
              templateUrl: 'js/modals/plan-edit-error.html',
              themeClass: 'fancymodal--primary  fancymodal--small',
              openingClass: 'is-open',
              closingClass: 'is-closed',
              showCloseButton: false
            });

          });

        }

      } else {
        alert('not valid');
      }

    }



    vm.createNewPlan = function(pSponsorshipId, pNewPlanInfo, pMixPanelProp) {

      Sponsorship.createNewPlan(pSponsorshipId, pNewPlanInfo)
        .then(function(success){

        mixpanel.track('Changed Plan Limit', pMixPanelProp);

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

    }


    //
    // Listeners set up to listen for successes of plan being edited
    //
    $rootScope.$on('plan-updated', function(event, pChangeData) {

      vm.getPlan(vm.sponsorshipId);

    });

  }

]);
