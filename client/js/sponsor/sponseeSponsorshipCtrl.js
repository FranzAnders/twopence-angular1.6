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
    function(
    $scope,
    $state,
    $stateParams,
    $timeout,
    Sponsee,
    Sponsorship) {

    var vm = this;

    vm.formNotSubmited = true;

    vm.formSubmittedSuccesfully = false;

    vm.sponseeId = $stateParams.sponseeId;

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
        // send public_token to server to exchange for access_token
        console.log(public_token, metadata);
        console.log("This is when you would want to post to /plaid/token")
      },
      onExit: function(error, metadata) {
        if (error != null) {
          // Plaid API error
          console.log(error);
        }
        console.log(metadata);
      }
    });

    //
    // Sponsorship info object, holds all the plan information
    // as it is being built
    //
    vm.sponsorshipInfo = {
      "user": {
        "id": vm.sponseeId
      },
      "plan": {
        "type": null,
        "frequency": null
      }
    };



    //
    // Creates a sponsorship, if succesfull, shows success screen and
    // takes user to the sponsee's page
    //
    vm.createSponsorship = function(pSponsorshipDetailsForm) {

      var sponseeId = vm.sponseeId;

      if (pSponsorshipDetailsForm.$valid) {

        Sponsorship.create(vm.sponsorshipInfo).then(function(sponsorship) {

          console.log(sponsorship)

          vm.formNotSubmited = false;
          vm.formSubmittedSuccesfully = true;

          $timeout(function() {

            $state.go('sponsor.sponsee', {
              sponseeId: sponseeId
            });

          }, 1000);

        });

        console.log('valid');


      } else {

        console.log('not valid')


      }

    };




    //
    // Gets the sponsee being managed via email
    //
    // Sponsee.getSponsee(vm.sponseeEmail).then(function(sponsee) {

    //   vm.name = sponsee.name;

    // }).catch(function(error) {

    //   console.log('error');

    // });



    //
    // Sets the sponsorship type
    //
    vm.setType = function(pType) {

      if (pType === 'one-time') {

        vm.sponsorshipInfo.plan.type = 'one-time';
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
    $scope.$on('$stateChangeSuccess', function() {

      if ($state.is('sponsor.sponsorshipSetup.options')) {

        vm.sponsorshipInfo = {
          "user": {
            "id": vm.sponseeId
          },
          "plan": {
            "type": null,
            "frequency": null
          }
        };

        vm.formNotSubmited = true;

        vm.formSubmittedSuccesfully = false;
        console.log('clear form');

      }

    });

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
