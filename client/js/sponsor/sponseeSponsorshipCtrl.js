
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
    function(
      $scope,
      $state, 
      $stateParams,
      $timeout,
      Sponsee) {

      var vm = this; 

      vm.formNotSubmited = true; 

      vm.formSubmittedSuccesfully = false; 

      vm.form = {}; 

      vm.sponseeEmail = $stateParams.sponseeEmail;


      //
      // Gets the sponsee being managed via email
      //
      Sponsee.getSponsee(vm.sponseeEmail).then(function(sponsee) {

        vm.name = sponsee.name;

      }).catch(function(error) {

        console.log('error'); 

      }); 



      //
      // Sets the sponsorship type 
      //
      vm.setType = function(pType) {

        vm.form.type = pType; 

      };


      //
      // Proccesses the sponsorship form, if required fields are filled
      // we take the user to the Terms of Agreement page  
      //
      vm.processForm = function() {

        if(vm.form.limit) {

          vm.formNotSubmited = false; 

        } else {

          alert('FAILING FORM');

        }

      };


      //
      // Finishes the form if user has agreed to the terms of agreement 
      // 
      vm.finishForm = function() {

        console.log('finish form is running');

        if(!vm.form.limit) {

          return false; 

        } else {

          if(vm.form.limit && vm.form.acceptedTerms) {

            vm.submitSponsorshipForm(vm.form, vm.sponseeEmail); 

          } else {

            alert('Please accept terms of agreement before continuing');

          }

        }

      };


      vm.submitSponsorshipForm = function(pForm, pSponseeEmail) {

        var plan = {}; 

        plan.limit = pForm.limit; 
        plan.type = pForm.type; 

        if(plan.type = 'matching') {

          Sponsee.setPlan(plan, pSponseeEmail).then(function(pSponsee) {

            console.log(pSponsee); 

            $timeout(function() {

              $state.go('sponsor.sponsee', {sponseeEmail: pSponseeEmail}); 

            }, 1000); 

          }).catch(function(error){
              
            console.log('this failed');


          });

          return

        } 

        vm.formSubmittedSuccesfully = true; 

        $timeout(function() {

            $state.go('sponsor.sponsee', {sponseeEmail: pSponseeEmail}); 

        }, 1000); 

      }

      //
      // Resets the form if the user goes back to the options state
      // of the sponsorshipSetup UX
      //
      $scope.$on('$stateChangeSuccess', function() {

          if($state.is('sponsor.sponsorshipSetup.options')){

              vm.form = {}; 
              vm.formNotSubmited = true; 
              vm.formSubmittedSuccesfully = false; 
              console.log('clear form');

          }

      });

    }]);
