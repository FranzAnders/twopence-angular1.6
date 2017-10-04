
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

      $scope.user = {};

      vm.processForm = function() {

        console.log("processing form...");

        console.log($scope.user);

        vm.formUnsubmitted = false;

        $timeout(function() {

          $state.go('main.signUp.confirmation');

        }, 1400);


      };


    }]);
