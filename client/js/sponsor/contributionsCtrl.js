
'use struct';



twopence.controller('contributionsCtrl', [
    'Sponsor', 
      function(Sponsor) {

  var vm = this; 

  vm.contributionsShowing = []; 

  vm.sponsees = []; 

  vm.sponseeFilter = null; 

  Sponsor.getSponsees().then(function(sponsees) {

    vm.sponsees  = sponsees; 

    console.log(vm.sponsees); 

  }); 

  vm.showFilter = function() {

    console.log(vm.sponseeFilter); 

  };


  Sponsor.getAllContributions().then(function(contributions) {

    console.log(contributions); 

    vm.contributionsShowing = contributions;

  }); 

}]);
