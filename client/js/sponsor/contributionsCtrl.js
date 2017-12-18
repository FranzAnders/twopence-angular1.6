
'use strict';



twopence.controller('contributionsCtrl', [
    'Sponsor', 
    'Sponsorship',
      function(Sponsor, Sponsorship) {

  var vm = this; 

  vm.contributionsShowing = []; 

  vm.sponsees = []; 

  vm.sponseeFilter = null; 

  vm.inView = 3; 

  //
  // Gets all the sponsees a sponsor is currently managing in order to filter 
  // contributions
  //
  Sponsorship.getAll().then(function(sponsees) {

    vm.sponsees  = sponsees.data; 

    vm.totalContributions = vm.getTotalContributions(sponsees.data); 

  }).catch(function(err){

    console.log("ERROR: Sponsorship not coming up."); 

  }); 


  //
  // Gets all contributions a sponsor has made 
  //
  Sponsor.getAllContributions().then(function(contributions) {

    vm.contributionsShowing = contributions.data;

  }); 


  //
  // Shows more contributions of a specified value
  //
  vm.showMore = function(pNumToAdd) {

    vm.inView = vm.inView + pNumToAdd;

  };


  //
  //
  //
  vm.showFilter = function() {

    console.log(vm.sponseeFilter); 

  };



    vm.getTotalContributions = function(sponsorships) {

      var total = 0; 

      for(var i = 0; i <= sponsorships.length; i++) {

        if(sponsorships[i]) {
        
         total = total + parseInt(sponsorships[i].contributions_to_date);

        }

      }

      return total;

    };



}]);
