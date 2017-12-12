

'use strict'

/*------------------------------------*\
   App Navigation Directive
\*------------------------------------*/

twopence.directive('appHeaderDir', function() {

  return {

    restrict: "E", 
    scope: {}, 
    replace: true, 
    controller: ['$scope', '$state', function($scope, $state) {

        var vm = this; 

        vm.secondaryMenuActive = false; 

        vm.isActive = function(pState) {

          console.log(pState); 
          
          return $state.is(pState); 

        }; 


        //
        // Displays the secondary menu that is of canvas 
        //
        vm.toggleSecondaryMenu  = function() {

        vm.secondaryMenuActive = !vm.secondaryMenuActive; 

        console.log(vm.secondaryMenuActive); 

          if(vm.secondaryMenuActive) {

            $scope.$emit('app-nav-is-open');

          } else {
            $scope.$emit('app-nav-is-closed');

          }

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

