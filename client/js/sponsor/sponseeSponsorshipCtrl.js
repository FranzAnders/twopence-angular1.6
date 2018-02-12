'use strict';

/*------------------------------------*\
    Sponsee Sponsorship Creation Controller
\*------------------------------------*/

twopence.controller('sponseeSponsorshipCtrl', [
  '$fancyModal',
  '$scope',
  '$state',
  '$stateParams',
  '$timeout',
  'Sponsee',
  'Sponsorship',
  'PlaidAuth',
  'ENV',
  'userInfo',
    function(
    $fancyModal,
    $scope,
    $state,
    $stateParams,
    $timeout,
    Sponsee,
    Sponsorship,
    PlaidAuth, 
    ENV,
    userInfo) {

    var vm = this;


    //
    // The sponsorship creation form states to show user success screen and check for linked bank account
    //
    vm.formStates = {

      'notSubmitted' : true, 
      'submittedSuccesfully': false,
      'linked_bank': false,
      'linked_bank_already': userInfo.linked_bank 

    }


    if(vm.formStates.linked_bank_already) {

      vm.formStates.linked_bank  = true; 

    }

    //
    // Holds the graduate's information 
    //
    vm.graduateInfo = {

      'identity': $stateParams.identity,
      'email': $stateParams.email
    }



    //
    // Holds the custom limit for a monthly patching plan if active
    //
    vm.customLimit = {
      'active': false,
      'limit': ''

    };


    //
    // Holds the custom amount for a one time boost if active
    //
    vm.customAmount = {
      'active': false,
      'amount': ''

    };



    //
    // Resets the custom/other fields in matching plan and one time forms
    //
    vm.resetCustomFields = function() {

        vm.customLimit.active = false;
        vm.customLimit.limit = '';
        vm.customAmount.active = false;
        vm.customAmount.amount = '';
    }



    //
    // Handles Plaid Sandbox for bank account linking
    //
    var plaidAuth = Plaid.create({
      apiVersion: 'v2',
      clientName: 'TwoPence',
      env: ENV.plaidEnv,
      product: ['auth'],
      key: ENV.plaidPublicKey,
      webhook: ENV.BASE_URL + '/v1/plaid/webhooks',
      selectAccount: true,
      forceIframe: true, // required
      onSuccess: function(public_token, metadata) {

        //
        // send public_token to server to exchange for access_token
        //
        $timeout(function () {
          vm.plaidInfo.bankislinked = true;
          vm.plaidInfo.bankToken = metadata.public_token;
          vm.plaidInfo.public_token = metadata.public_token;
          vm.plaidInfo.institution.name = metadata.institution.name;
          vm.plaidInfo.institution.institution_id = metadata.institution.institution_id;

          vm.plaidInfo.accounts[0].id = metadata.accounts[0].id;
          vm.plaidInfo.accounts[0].name = metadata.accounts[0].name;

          PlaidAuth.login(vm.plaidInfo);

          vm.formStates.linked_bank = true;

          mixpanel.track('Linked Bank Account');

        }, 0);

      },
      onExit: function(error, metadata) {

         $fancyModal.open({
            templateUrl: 'js/modals/bank-link-error.html',
            themeClass: 'fancymodal--primary  fancymodal--small',
            openingClass: 'is-open',
            closingClass: 'is-closed',
            showCloseButton: false

        });

      }

    });



    //
    // Sponsorship info object, holds all the plan information
    // as it is being built
    //
    vm.sponsorshipInfo = {
      "plan": {
        "type": null,
        "frequency": null
      }
    };


    //
    // Plaid info object holds status of Plaid Auth
    //
    vm.plaidInfo = {
      public_token: "",
      institution: {
        "name": "",
        "institution_id": ""
      },
      accounts: [
        {
          "id": "",
          "name": ""
        }
      ],
      bankislinked: false,
      bankToken: ''
    }


    //
    // Clears the custom limit/amount selection or the normal limit/amount
    // selections depending on what is selected
    //
    vm.clearSelection = function(pLimitType, pPlanType) {

      if(typeof(pLimitType) === "boolean")  {

        if(pPlanType === 'matching') {

          vm.sponsorshipInfo.plan.limit = 0;

        }

        if(pPlanType === 'one-time') {

          vm.sponsorshipInfo.plan.amount = 0;

        }


      } else {

        vm.resetCustomFields(); 

      }

    };


    //
    // Creates a sponsorship and a plan right after. If vm.customLimit.active, we apply that as the
    // limit/amount of the sponsorship
    //
    vm.createPlan = function(pSponsorshipDetailsForm, pPlanBeingCreated, pGraduateInfo) {

      // Mixpanel properties.
      var custom = false;
      var type = 'Match';
      var value = pPlanBeingCreated.plan.limit;

      // Plan being created object. 
      var planBeingCreated = pPlanBeingCreated; 

      if(vm.customLimit.active) {
        planBeingCreated.plan.limit = vm.customLimit.limit;
        custom = true;
        value = vm.customLimit.limit;
      }

      if(vm.customAmount.active) {
        planBeingCreated.plan.amount = vm.customAmount.amount;
        custom = true;
        value = vm.customAmount.amount;
      }

      if(planBeingCreated.plan.type === 'Fixed') {
        type = 'Fixed';
        value = planBeingCreated.plan.amount;
      }

      if(pSponsorshipDetailsForm.$valid) {

         var userPayLoad = {};

         userPayLoad.user = pGraduateInfo.identity;

         Sponsorship.create(userPayLoad).then(function(res) {

          var sponsorship = res;

          Sponsorship.createNewPlan(sponsorship.id, planBeingCreated).then(function(sponsorship) {

            vm.formStates.notSubmitted = false;
            vm.formStates.submittedSuccesfully = true;

            mixpanel.track('Completed Sponsorship Setup', {
              'Type': type,
              'Value': value,
              'Is Custom': custom
            });

          }).catch(function(err) {

           if(err.data.message === "User already has match plan active between those dates.") {
               
               $fancyModal.open({
                  templateUrl: 'js/modals/matching-plan-already-exists-error.html',
                  themeClass: 'fancymodal--primary  fancymodal--small',
                  openingClass: 'is-open',
                  closingClass: 'is-closed',
                  showCloseButton: false

              });

             } else {

               $fancyModal.open({
                  templateUrl: 'js/modals/sponsorship-creation-error.html',
                  themeClass: 'fancymodal--primary  fancymodal--small',
                  openingClass: 'is-open',
                  closingClass: 'is-closed',
                  showCloseButton: false

              });

            }

          });

        }).catch(function(err) {

          $fancyModal.open({
              templateUrl: 'js/modals/sponsorship-creation-error.html',
              themeClass: 'fancymodal--primary  fancymodal--small',
              openingClass: 'is-open',
              closingClass: 'is-closed',
              showCloseButton: false

           }); 

        });

      }

    }



    //
    // Sets the sponsorship type
    //
    vm.setType = function(pType) {

      // Mixpanel property.
      var type = "Match";

      if (pType === 'one-time') {

        vm.sponsorshipInfo.plan.type = 'fixed';
        vm.sponsorshipInfo.plan.frequency = 'one-time';
        vm.sponsorshipInfo.plan.amount = 0;
        type = "Fixed";

      }

      if (pType === 'matching') {

        vm.sponsorshipInfo.plan.type = 'match';
        vm.sponsorshipInfo.plan.frequency = 'monthly';
        vm.sponsorshipInfo.plan.limit = 0;
      }

      mixpanel.track('Selected Plan', {'Plan Type': type});

    };


    //
    // Opens the Plaid Auth UX 
    //
    vm.linkBank = function() {
      plaidAuth.open();
    };


    //
    // Resets the form if the user goes back to the options state
    // of the sponsorshipSetup UX
    //
    $scope.$on('$stateChangeSuccess', function() {

      if ($state.is('sponsor.sponsorshipSetup.options')) {

        vm.sponsorshipInfo = {
          "user": {
            "id": vm.graduateId
          },
          "plan": {
            "type": null,
            "frequency": null
          }
        };

        vm.formStates.notSubmitted = true;
        vm.formStates.submittedSuccesfully = false;
        vm.resetCustomFields(); 

      }


      //
      // If there's no Graduate identity defined, we take the user back to the sponsee add view 
      //
      if(!vm.graduateInfo.identity) {

        //$state.go('sponsor.sponseeAdd')

      }

    });


  }

]);
