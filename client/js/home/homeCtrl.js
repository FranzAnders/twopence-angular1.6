
'use strict';

/*------------------------------------*\
    Home Page Controller
\*------------------------------------*/


twopence.controller('homeCtrl', [
    '$scope', 
    '$state',
    '$document',
    function(
      $scope, 
      $state,
      $document) {

    var vm = this;
    
    $scope.$state = $state; 
    
    // Ensure page blur isn't active when on dedicated ad routes
    // #TheAdamEffect
    if ($scope.$state.is('main.forgraduates') || $scope.$state.is('main.forsponsors')) {
      document.body.classList.remove('is-hidden-by-funnel');
    }
    
    if (mixpanel) {
      mixpanel.track('Viewed Landing Page')       
    } else {
      // mixpanelDir.js is an attr on <body>, which is why we listen there.
      $document[0].body.addEventListener('mixpanel-loaded', function(){
        mixpanel.track('Viewed Landing Page')       
      });       
    }


}]);
