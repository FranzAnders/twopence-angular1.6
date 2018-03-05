
'use strict';

/*------------------------------------*\
    Main Controller
\*------------------------------------*/

twopence.controller('mainCtrl', ['$rootScope', '$scope', '$state', '$location', 'Funnel', 'UrlParams',
    function($rootScope, $scope, $state, $location, Funnel, UrlParams) {

    var vm = this;

    $scope.$state = $state;

    vm.funnelIsHidden = Funnel.getState();

    if($location.search()) {
      UrlParams.setParams($location.search())
    }

    $rootScope.$on('$stateChangeSuccess', function() {

      vm.funnelIsHidden = Funnel.getState(); 

    }); 

}]);
