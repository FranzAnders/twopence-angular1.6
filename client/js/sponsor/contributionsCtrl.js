
'use struct';



twopence.controller('contributionsCtrl', [
    'Sponsor', 
      function(Sponsor) {

  var vm = this; 

  vm.contributionsShowing = []; 

  vm.filter = null; 

  Sponsor.getAllContributions().then(function(contributions) {

    console.log(contributions); 
    
    vm.contributionsShowing = contributions;

  }); 

}]);
