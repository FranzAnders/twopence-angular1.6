
'use strict';

/*------------------------------------*\
    Main Controller
\*------------------------------------*/

twopence.controller('mainCtrl', ['$rootScope', '$scope', '$state', '$timeout', '$location', 'Funnel', 'UrlParams',
    function($rootScope, $scope, $state, $timeout, $location, Funnel, UrlParams) {

      var vm = this;
      vm.loadingCompleted = false;
      $scope.$state = $state;
  
      vm.funnelIsHidden = Funnel.getState();
  
      if($location.search()) {
        UrlParams.setParams($location.search())
      }
      $rootScope.$on('$stateChangeSuccess', function() {

        vm.funnelIsHidden = Funnel.getState(); 
  
      }); 
      
      vm.loadingComplete = function () {
        $timeout(function() {
          vm.loadingCompleted = true;
        }, 0)
      }
}]);
