
'use strict';

/*------------------------------------*\
   Sign Up Controller
\*------------------------------------*/

twopence.controller('signUpCtrl', [
    '$scope',
    '$state',
    '$timeout',
    'User',
    function(
      $scope,
      $state,
      $timeout, 
      User) {

      var vm = this;

      vm.formUnsubmitted = true;

      $scope.$state = $state;

      vm.userCreationForm = {}; 


      vm.userInfo = {
        'phone': ''
      }; 


      //
      // Creates the user from the information provided 
      //
      vm.createUser = function(form) {

        if(form.$valid) {

          delete vm.userInfo.confirmPassword; 
          
          User.create(vm.userInfo).then(function() {

            console.log('yep, it passes ');

          }); 

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
