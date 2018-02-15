
'use strict';

/*------------------------------------*\
    Main Controller
\*------------------------------------*/

twopence.controller('mainCtrl', ['$rootScope', '$scope', '$state', 'Funnel',
    function($rootScope, $scope, $state, Funnel) {

    var vm = this;

    $scope.$state = $state;

    vm.funnelIsHidden = Funnel.getState();

    $rootScope.$on('$stateChangeSuccess', function() {

      vm.funnelIsHidden = Funnel.getState(); 

    }); 

}]);
