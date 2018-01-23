

'use strict'; 

/*------------------------------------*\
    Login/Sign Up Header Directive 
\*------------------------------------*/

twopence.directive('loginHeaderDir', function() {

  return {

    restrict: "E",
    replace: true, 
    scope: {},
    controller: ['$rootScope', '$scope', '$state', '$timeout', function($rootScope, $scope, $state, $timeout) {

        var vm = this; 

        $scope.$state = $state; 

        vm.backState = {
          'name' : 'main.home'
        };


        $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams){

          vm.backState.name = from.name; 

          if(vm.backState.name === 'main.signUp.account') {

            vm.backState.name = 'main.home'

          }

        });

    }],
    controllerAs: 'loginHeader', 
    bindToController: true, 
    templateUrl: 'js/login/loginHeader.html', 
    link: function(link, element, attrs) {


    }

  }

}); 
