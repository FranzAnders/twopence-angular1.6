
'use strict';

/*------------------------------------*\
   Sponsee Creation Controller
\*------------------------------------*/

twopence.controller('sponseeCreationCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    'Sponsor',
    'Sponsee',
    'Sponsorship',
    'User', 
    'checkForMissingPlans', 
    function(
        $rootScope,
        $scope,
        $state,
        $stateParams,
        $timeout,
        Sponsor,
        Sponsee,
        Sponsorship, 
        User,
        checkForMissingPlans) {

      var vm = this;

      vm.unsubmittedForm = true;

      vm.form = {};

      vm.searchData = {};

      vm.sponseeId = null;

      vm.cameFromEmail = $stateParams.cameFromEmail;


      //
      // Checks if the resolve for the sponseeCreation state has any sponsorships
      // with missing plans, if so, we take the user to the 'sponsor.sponseeAdd.inviters' view
      //
      if(checkForMissingPlans) {
        vm.sponsorshipsMissingPlans = checkForMissingPlans.plans;
        $state.go('sponsor.sponseeAdd.inviters');

      } else {
        $state.go('sponsor.sponseeAdd.single');

      }


      //
      // Sets the name, last name, and email to use for the sponsorship that
      // is about to be setup
      //
      vm.searchSponsee = function(pSponseeSearchForm, pGraduateData) {

        vm.unsubmittedForm = false;

        var graduateInfo = {
          "user": pGraduateData
        };

        if(pSponseeSearchForm.$valid) {

          mixpanel.track('Selected Graduate');
          $state.go('sponsor.sponsorshipSetup.options', {identity: graduateInfo.user, email: graduateInfo.user.email});

        } 

      };

}]);
