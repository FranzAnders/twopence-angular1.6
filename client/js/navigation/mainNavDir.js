
'use strict';

whiskersSite.directive('mainNavDir', 
      
        function() {

  return {

    replace: true, 
    scope: {}, 
    controller: 
      ['$rootScope', 
       '$scope',
        function(
          $rootScope,
          $scope) {

      var vm = this; 

      vm.mainNavIsOpen = false;

      vm.activeDropDown = false;  
      
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


      vm.openDrawer = function(pDropDownId) {

        if(pDropDownId === vm.activeDropDown) {

          vm.activeDropDown = false; 

        } else {

        vm.activeDropDown = pDropDownId; 
          
        }


      }; 

    }],
    controllerAs: 'mainNav',
    templateUrl: 'js/navigation/mainNav.html',
    link: function(scope, element) {

        scope.$on('nav-is-open', function(event, data) {

          $('body').addClass('nav-is-open');
          
        });

        scope.$on('nav-is-closed', function(event, data) {

          $('body').removeClass('nav-is-open');

        });

        // /*------------------------------------*\
        //     #Sticky Main Nav Styles Toggle
        // \*------------------------------------*/

        // // Variable to detect if user is smooth scrolling to a section
        // var smoothScrolling = false; 


        // //
        // // Function checks to see if the user is scrolling, 
        // // if they are, 

        // (function($){

        //     var prevScroll = 0;
        //     var currentScroll; 
        //     var stickyNavContainer = $('[sticky-nav]');
        //     var navBar = $('[data-ui-component="main-navigation"]');
        //     var cart = $('[data-ui-component="cart-icon"]'); 
        //     var navBarHeight = navBar.height(); 
        //     var didScroll = false; 
        //     var theWindow = $(window);


        //     $(window).scroll(function() {
        //         didScroll = true;
        //     });
             
        //     setInterval(function() {

        //       if ( didScroll) {

        //           didScroll = false;

        //           currentScroll = theWindow.scrollTop();

        //         if(currentScroll < navBarHeight) {

        //               navBar.removeClass('is-fixed-and-hidden');
        //               navBar.removeClass('is-fixed');
        //               navBar.addClass('mainNav--alt');

        //         }

        //         if(currentScroll > navBarHeight && currentScroll > prevScroll) {
                      
        //           if(!mediaCheck.checkIfSmall()) {

        //             navBar.addClass('is-fixed-and-hidden');
       

        //           }

        //             navBar.removeClass('is-fixed');
        //             navBar.removeClass('mainNav--alt');
        //             //navBar.addClass('mainNav--alt');
                      
        //         }

        //         if(currentScroll < prevScroll && currentScroll > navBarHeight ) {
                    
        //             if(!mediaCheck.checkIfSmall()) {

        //               navBar.addClass('is-fixed');
        //               navBar.removeClass('mainNav--alt');
                      
        //             }

        //         }

        //         prevScroll = currentScroll;

        //       }

        //     }, 300);  

        // })(jQuery);

      }
  }

}); 
