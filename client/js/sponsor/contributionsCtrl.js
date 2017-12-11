
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

    console.log("SUCCESS: SPONSEES")
    console.log(vm.sponsees); 

  }).catch(function(err){

    console.log("ERROR: Sponsees not coming up."); 

  }); 


  //
  // Gets all contributions a sponsor has made 
  //
  Sponsor.getAllContributions().then(function(contributions) {

    vm.contributionsShowing = contributions.data;

    console.log("SUCCESS: CONTRIBUTIONS")
    console.log(vm.contributionsShowing)

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


}]);
