
'use strict';

/*------------------------------------*\
    Sponsee Sponsorship Creation Controller 
\*------------------------------------*/

twopence.controller('sponseeSponsorshipCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    function(
      $scope,
      $state, 
      $stateParams) {

      var vm = this; 

      vm.name = $stateParams.sponseeName; 

      vm.formNotSubmited = true; 


      vm.form = {}; 


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

            $state.go('sponsor.dashboard'); 

          } else {

            alert('Please accept terms of agreement before continuing');

          }

        }

      };

      $scope.$on('$stateChangeSuccess', function() {

          if($state.is('sponsor.sponsorshipSetup.options')){

              vm.form = {}; 
              vm.formNotSubmited = true; 
              console.log('clear form');

          }

      });

    }]);
