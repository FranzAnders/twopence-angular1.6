
'use strict';

/*------------------------------------*\
   Sign Up Controller
\*------------------------------------*/

twopence.controller('signUpCtrl', [
    '$scope',
    '$state',
    '$timeout',
    function(
      $scope,
      $state,
      $timeout) {

      var vm = this;

      vm.formUnsubmitted = true;

      $scope.$state = $state;

      vm.userCreationForm = {}; 

      vm.userInfo = {}; 



      //
      // Creates the user from the information provided 
      //
      vm.createUser = function(isValid) {

        console.log(isValid); 
        
        if(isValid) {

          console.log('yep, it passes ');
        } else {

          console.log('not yet boy'); 

        }

      }; 


      // vm.processForm = function() {

      //   console.log("processing form...");

      //   console.log($scope.user);

      //   vm.formUnsubmitted = false;

      //   $timeout(function() {

      //     $state.go('main.signUp.confirmation');

      //   }, 1400);


      // };


    }]);
