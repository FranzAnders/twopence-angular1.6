
'use struct';



twopence.controller('contributionsCtrl', [
    'Sponsor', 
      function(Sponsor) {

  var vm = this; 

  vm.contributionsShowing = []; 

  vm.sponsees = []; 

  vm.sponseeFilter = null; 



  //
  // Gets all the sponsees a sponsor is currently managing in order to filter 
  // contributions
  //
  Sponsor.getSponsees().then(function(sponsees) {

    vm.sponsees  = sponsees.data; 

    console.log(vm.sponsees); 

  }); 

  vm.showFilter = function() {

    console.log(vm.sponseeFilter); 

  };


  //
  // Gets all contributions a sponsor has made 
  //
  Sponsor.getAllContributions().then(function(contributions) {

    vm.contributionsShowing = contributions.data;

    console.log(vm.contributionsShowing); 

  }); 

}]);
