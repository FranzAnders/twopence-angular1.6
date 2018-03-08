
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
    
    if (mixpanel) {
      mixpanel.track('Viewed Landing Page')       
    } else {
      // mixpanelDir.js is an attr on <body>, which is why we listen there.
      $document[0].body.addEventListener('mixpanel-loaded', function(){
        mixpanel.track('Viewed Landing Page')       
      });       
    }


}]);
