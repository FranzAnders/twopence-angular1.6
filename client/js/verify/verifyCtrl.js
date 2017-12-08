'user strict';

/*------------------------------------*\
   E-Mail Verification Controller
\*------------------------------------*/

twopence.controller('verifyCtrl', [
  '$stateParams',
  '$state',
  '$scope',
  '$timeout', 
  function($stateParams,
    $state,
    $scope, 
    $timeout) {

    var vm = this;

    $timeout(function() {

     $state.go('main.login', {cameFromEmail: true});

    }, 2000); 

  }

]);
