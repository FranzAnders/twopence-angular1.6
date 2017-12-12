
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
    '$state',
    function(
        Sponsee,
        Sponsor,
        Sponsorship,
        User,
        Auth,
        $fancyModal,
        $state) {

    var vm = this;

    vm.info = false;

    //
    // Gets user's info
    //
    User.getUserInfo().then(function(dashboard) {

      vm.info = dashboard;

    }).catch(function(){

      console.log("ERROR: Unable to get sponsor information"); 

    });

  }]);
