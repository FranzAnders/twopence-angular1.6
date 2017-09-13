
'use strict'; 

/*------------------------------------*\
   Sponsor Dashboard Controller
\*------------------------------------*/

twopence.controller('dashboardCtrl', [
    'Sponsee',
    function(Sponsee) {

    var vm = this; 

    Sponsee.getAllSponsees().then(function(allSponsees) {

      vm.sponsees = allSponsees

    }); 


}]);
