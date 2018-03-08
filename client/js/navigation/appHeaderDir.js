

'use strict'

/*------------------------------------*\
   App Navigation Directive
\*------------------------------------*/

twopence.directive('appHeaderDir', function() {

  return {

    restrict: "E", 
    scope: {}, 
    replace: true, 
    controller: ['$fancyModal', '$scope', '$state', function($fancyModal, $scope, $state) {

        var vm = this; 

        vm.secondaryMenuActive = false; 

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



        vm.$onInit =  function() {
          vm.sponsorName = vm.sponsor.first_name + " " + vm.sponsor.last_name;
          vm.sponsorInitials = vm.sponsor.first_name.charAt(0) + vm.sponsor.last_name.charAt(0); 
        }

    }], 
    controllerAs: 'nav', 
    bindToController: {

        sponsor: "="
    }, 
    templateUrl: "js/navigation/appHeader.html",
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

