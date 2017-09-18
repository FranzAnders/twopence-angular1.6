
'use strict'; 

/*------------------------------------*\
   Sponsor Dashboard Controller
\*------------------------------------*/

twopence.controller('dashboardCtrl', [
    'Sponsee',
    'Sponsor',
    function(
        Sponsee,
        Sponsor) {

    var vm = this; 

    Sponsor.getSponsees().then(function(allSponsees) {

      vm.sponsees = allSponsees

    }); 

    vm.joltSponsee = function(pSponseeEmail) {



    }; 

}]);
