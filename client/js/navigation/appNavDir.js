

'use strict'

/*------------------------------------*\
   App Navigation Directive
\*------------------------------------*/

twopence.directive('appNavDir', function() {

  return {

    restrict: "E", 
    scope: {}, 
    replace: true, 
    controller: ['$fancyModal', '$scope', '$state', function($fancyModal, $scope, $state) {

        var vm = this; 

        vm.secondaryMenuActive = false; 

        $scope.$state = $state; 

        vm.isActive = function(pState) {
          return $state.is(pState); 
        }; 


        //
        // Displays the secondary menu that is of canvas 
        //
        vm.toggleSecondaryMenu  = function() {

        vm.secondaryMenuActive = !vm.secondaryMenuActive; 

          if(vm.secondaryMenuActive) {

            $scope.$emit('app-nav-is-open');

          } else {
            $scope.$emit('app-nav-is-closed');

          }

        }; 


        //
        // Logs out a user after confirming
        //
        vm.logoutUser = function() { 

          vm.toggleSecondaryMenu(); 

          $fancyModal.open({
            controller: 'logOutConfirmationCtrl as logOutConfirmation',
            templateUrl: 'js/modals/log-out-confirmation.html',
            themeClass: 'fancymodal--primary  fancymodal--confirmation  fancymodal--small',
            openingClass: 'is-open',
            closingClass: 'is-closed',
            showCloseButton: false

          })

        }; 


    }], 
    controllerAs: 'nav', 
    bindToController: true, 
    templateUrl: "js/navigation/appNav.html",
    link: function(scope, attrs, element) {

      // scope.$on('app-nav-is-open', function(event, data) {

      //   $('.app-nav-wrapper').addClass('app-nav-is-open');
        
      // });

      // scope.$on('app-nav-is-closed', function(event, data) {

      //   $('.app-nav-wrapper').removeClass('app-nav-is-open');

      // });


    }

  }

}); 

