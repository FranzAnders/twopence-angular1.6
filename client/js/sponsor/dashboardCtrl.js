
'use strict'; 

/*------------------------------------*\
   Sponsor Dashboard Controller
\*------------------------------------*/

twopence.controller('dashboardCtrl',
    function() {

    var vm = this; 

    vm.sponsees = [

      {
        "name" : "Carol Danvers",
        "plan": "N/A"
      }, 
      {
        "name": "Hank Pym",
        "plan": "$100 Matching"
      }

    ];

}); 