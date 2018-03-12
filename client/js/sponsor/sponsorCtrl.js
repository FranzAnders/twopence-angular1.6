
'use strict';

/*------------------------------------*\
   Sponsor Controller
\*------------------------------------*/

twopence.controller('sponsorCtrl', [
    'Sponsee',
    'Sponsor',
    'Sponsorship',
    'User',
    'Auth',
    '$fancyModal',
    '$rootScope',
    '$scope',
    '$state',
    function(
        Sponsee,
        Sponsor,
        Sponsorship,
        User,
        Auth,
        $fancyModal,
        $rootScope, 
        $scope, 
        $state) {

    var vm = this;

    vm.info = false;
    vm.stateIsChanging = false; 


    $scope.$state = $state; 

    //
    // Gets user's info
    //
    User.getUserInfo().then(function(dashboard) {

      vm.info = dashboard;

    }).catch(function(){

      console.log("ERROR: Unable to get sponsor information"); 

    });


    $rootScope.$on('$stateChangeStart', function() {
        vm.stateIsChanging = true; 
    }); 

    $rootScope.$on('$stateChangeSuccess', function() {
        vm.stateIsChanging = false; 
    }); 

  }]);
