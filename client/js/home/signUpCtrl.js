
'use strict';

/*------------------------------------*\
    Home Page Controller
\*------------------------------------*/

twopence.controller('signUpCtrl', [
    '$state', 
    function($state) {

      var vm = this; 


      vm.processForm = function() {

        console.log("processing form...");

        $state.go('main.signUp.confirmation');

      }


      vm.createAccount = function() {



      }

    }]);
