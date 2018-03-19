
'use strict';



twopence.controller('contributionsCtrl', [
    'Sponsor', 
    'sponsorships',
    'contributions',
    '$timeout', 
      function(Sponsor, sponsorships, contributions, $timeout) {

  var vm = this; 

  vm.contributionsShowing = []; 

  vm.sponsees = []; 

  vm.sponseeFilter = null; 

  vm.inView = 5; 


  vm.$onInit = function() {
    
   mixpanel.track('Viewed Contributions');

   vm.totalContributions = vm.getTotalContributions(sponsorships.data); 

    vm.sponsees =  vm.getSponsees(sponsorships.data); 

    vm.contributionsShowing = contributions.data;
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
