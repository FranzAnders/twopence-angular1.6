
'use strict';

/*------------------------------------*\
    Main Controller
\*------------------------------------*/

twopence.controller('mainCtrl', ['$rootScope', '$scope', '$state', '$location', 'Funnel', 'Referrals',
    function($rootScope, $scope, $state, $location, Funnel, Referrals) {

    var vm = this;

    $scope.$state = $state;

    vm.funnelIsHidden = Funnel.getState();

    if($location.search().referredby) {
      Referrals.setReferral($location.search().referredby)
    }

    $rootScope.$on('$stateChangeSuccess', function() {

      vm.funnelIsHidden = Funnel.getState(); 

    }); 

}]);
