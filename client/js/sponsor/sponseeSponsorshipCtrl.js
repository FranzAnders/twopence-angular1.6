'use strict';

/*------------------------------------*\
    Sponsee Sponsorship Creation Controller
\*------------------------------------*/

twopence.controller('sponseeSponsorshipCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  '$timeout',
  'Sponsee',
  'Sponsorship',
  'PlaidAuth',
    function(
    $scope,
    $state,
    $stateParams,
    $timeout,
    Sponsee,
    Sponsorship,
    PlaidAuth) {

    var vm = this;

    vm.formNotSubmited = true;

    vm.formSubmittedSuccesfully = false;

    vm.sponsee = $stateParams.data; 

    vm.email = $stateParams.email; 

    vm.linkedBank = false; 

    var sandboxHandler = Plaid.create({
      apiVersion: 'v2',
      clientName: 'TwoPence',
      env: 'sandbox',
      product: ['auth'],
      key: 'ee1d216ec4313d5efb386b0a97a06d',
      webhook: 'https://api.onepence.co/v1/plaid/webhooks',
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

          alert("Yay! You’ve successfully linked your bank account! We will not disclose your bank account information with any third parties.");

          vm.linkedBank = true; 

        }, 0);

      },
      onExit: function(error, metadata) {
        if (error != null) {
          console.log(error);
        }

        alert("ERROR: Something went wrong please try linked your bank account again.");

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
    // Creates a sponsorship and a plan right after 
    //
    vm.createPlan = function(pSponsorshipDetailsForm) {

      if (pSponsorshipDetailsForm.$valid) {

          var sponsee = {}; 

          sponsee.user = vm.sponsee; 

         Sponsorship.create(sponsee).then(function(res) {

            var sponseeInfo = res; 

            console.log(vm.sponsorshipInfo);

            Sponsorship.createNewPlan(sponseeInfo.id, vm.sponsorshipInfo).then(function(sponsorship) {

              vm.formNotSubmited = false;
              vm.formSubmittedSuccesfully = true;
             
            }).catch(function(err) {


            }); 

          }).catch(function(err) {

            console.log(err); 
            console.log('ERROR: rejected, something went wrong')

          });

      }
    }



    //
    // Sets the sponsorship type
    //
    vm.setType = function(pType) {

      if (pType === 'one-time') {

        vm.sponsorshipInfo.plan.type = 'fixed';
        vm.sponsorshipInfo.plan.frequency = 'one-time';
        vm.sponsorshipInfo.plan.amount = 0;

      }

      if (pType === 'matching') {

        vm.sponsorshipInfo.plan.type = 'match'
        vm.sponsorshipInfo.plan.frequency = 'monthly';
        vm.sponsorshipInfo.plan.limit = 0;
      }

      console.log(vm.sponsorshipInfo);

    };


    //
    // Resets the form if the user goes back to the options state
    // of the sponsorshipSetup UX
    //
    // $scope.$on('$stateChangeSuccess', function() {

    //   if ($state.is('sponsor.sponsorshipSetup.options')) {

    //     vm.sponsorshipInfo = {
    //       "user": {
    //         "id": vm.sponseeId
    //       },
    //       "plan": {
    //         "type": null,
    //         "frequency": null
    //       }
    //     };

    //     vm.formNotSubmited = true;

    //     vm.formSubmittedSuccesfully = false;
    //     console.log('clear form');

    //   }

    // });

    vm.link = function() {
      sandboxHandler.open();
    };

    //
    // Proccesses the sponsorship form, if required fields are filled
    // we take the user to the Terms of Agreement page
    //
    // vm.processForm = function() {

    //   if(vm.form.limit) {

    //     vm.formNotSubmited = false;

    //   } else {

    //     alert('FAILING FORM');

    //   }

    // };


    //
    // Finishes the form if user has agreed to the terms of agreement
    // //
    // vm.finishForm = function() {

    //   console.log('finish form is running');

    //   if(!vm.form.limit) {

    //     return false;

    //   } else {

    //     if(vm.form.limit && vm.form.acceptedTerms) {

    //       vm.submitSponsorshipForm(vm.form, vm.sponseeEmail);

    //     } else {

    //       alert('Please accept terms of agreement before continuing');

    //     }

    //   }

    // };


    // vm.submitSponsorshipForm = function(pForm, pSponseeEmail) {

    //   var plan = {};

    //   plan.limit = pForm.limit;
    //   plan.type = pForm.type;

    //   if(plan.type = 'matching') {

    //     Sponsee.setPlan(plan, pSponseeEmail).then(function(pSponsee) {

    //       console.log(pSponsee);

    //       $timeout(function() {

    //         $state.go('sponsor.sponsee', {sponseeEmail: pSponseeEmail});

    //       }, 1000);

    //     }).catch(function(error){

    //       console.log('this failed');

    //     });

    //     return

    //   }

    //   vm.formSubmittedSuccesfully = true;

    //   $timeout(function() {

    //       $state.go('sponsor.sponsee', {sponseeEmail: pSponseeEmail});

    //   }, 1000);

    // }


  }
]);
