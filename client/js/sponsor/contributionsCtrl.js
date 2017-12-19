
'use strict';



twopence.controller('contributionsCtrl', [
    'Sponsor', 
    'Sponsorship',
    '$timeout', 
      function(Sponsor, Sponsorship, $timeout) {

  var vm = this; 

  vm.contributionsShowing = []; 

  vm.sponsees = []; 

  vm.sponseeFilter = null; 

  vm.inView = 5; 


  vm.$onInit = function() {

    //
    // Gets all the sponsorships a sponsor is currently managing
    //
    Sponsorship.getAll().then(function(sponsees) {

      vm.totalContributions = vm.getTotalContributions(sponsees.data); 

      vm.sponsees =  vm.getSponsees(sponsees.data); 

    }).catch(function(err){
      console.log("ERROR: Sponsorships not coming up."); 

    }); 


    //
    // Gets all contributions a sponsor has made 
    //
    Sponsor.getAllContributions().then(function(contributions) {

      vm.contributionsShowing = contributions.data;

    }).catch(function(err) {
      console.log("ERROR: Contributions not coming up."); 

    })

  }



  //
  // Shows more contributions of a specified value
  //
  vm.showMore = function(pNumToAdd) {

    vm.inView = vm.inView + pNumToAdd;

  };



  //
  // Gets sponsees to use in filter  
  //
  vm.getSponsees = function(pSponsorships) {

    var sponsees = []; 

    for(var i = 0; i <= pSponsorships.length - 1; i++) {

      sponsees.push(pSponsorships[i].sponsee);

    }

    return sponsees; 


  };



  //
  // Gets all contributions given to sponsorships and adds them 
  //
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
