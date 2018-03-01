
'use strict';

/*------------------------------------*\
   Main Navigation Directive
\*------------------------------------*/

twopence.directive('mainNavDir', ['$timeout',
      
        function($timeout) {

  return {

    replace: true, 
    scope: {}, 
    controller: 
      ['$rootScope', 
       '$scope',
       '$state',
        function(
          $rootScope,
          $scope,
          $state) {

      var vm = this; 

      vm.mainNavIsOpen = false;

      vm.activeDropDown = false;  

      $scope.$state = $state; 
      
      $rootScope.$on('$stateChangeSuccess', function() {
        
        vm.mainNavIsOpen = false; 
        
        $scope.$emit('nav-is-closed');

      }); 

      vm.toggleMainNav = function() {

        vm.mainNavIsOpen = !vm.mainNavIsOpen; 

        if(vm.mainNavIsOpen) {

          $scope.$emit('nav-is-open');

        } else {
          $scope.$emit('nav-is-closed');

        }

      }

      vm.checkIfActive = function(pDropDownId) {

        return pDropDownId === vm.activeDropDown; 

      };

    }],
    controllerAs: 'nav',
    templateUrl: 'js/navigation/mainNav.html',
    link: function(scope, element) {


        //
        // When DOM Is loaded we remove the preload class that prevents animations from showing after 3 seconds
        //
        $timeout(function(){

          document.body.classList.remove('preload');

        }, 1500);


        scope.$on('nav-is-open', function(event, data) {

          $('body').addClass('nav-is-open');
          
        });

        scope.$on('nav-is-closed', function(event, data) {

          $('body').removeClass('nav-is-open');

        });

      }
  }

}]); 
