
'use strict'; 

/*------------------------------------*\
    #Customizr Loader Directive
\*------------------------------------*/
  
humanautSite.directive('customizrLoaderDir', [
      '$timeout', 
      '$rootScope',
      'Customizr', 
    function(
        $timeout,
        $rootScope,
        Customizr) {

  return {

    replace: true, 
    templateUrl: 'js/customizr/customizrLoader.html',
    controller: ['Customizr', function(Customizr) {

      var vm = this;

      vm.$onInit = function() {
 
        vm.CustomizrService = Customizr; 

        vm.isLoading = false; 
   
      }

    }],
    controllerAs: 'loadingBarCtrl',
    link: function(scope, element, attrs, loadingBarCtrl) { 

       
      var bar = $('[data-ui-component="loading-bar"]');

      var loadingText = $('[data-ui-component="messages"]');

      var viewMoreBtn = $('[data-ui-component="view-more-btn"]'); 

      var curtainHeight = parseInt( $('[data-ui-component="curtain"]').height() * 2 ); 


      //
      // Code to scroll to the projects section. If the Customizr Curtain
      // is active we scroll past it manually since the Projects section
      // is already pinned to the top when curtainActive: true
      //
      var scrollToSection = function(pSectionId) {

          if(Customizr.curtainActive) {

            $('html, body').stop(true, false).animate({
                scrollTop: curtainHeight,
                easing: 'easeInOutQuint'

            }, 1600 );

          } else {

           $('html, body').stop(true, false).animate({
                scrollTop: $(pSectionId).offset().top,
                easing: 'easeInOutQuint'
            }, 1300);

          }

      }


      //
      // Plays UX and animation when a case study has been customized
      //
      var play = function() {

        loadingText.addClass('is-showing'); 
        
        loadingText.text('Coding custom site...'); 

        loadingBarCtrl.isLoading = true; 

        if(mediaCheck.checkIfSmall()) {

            viewMoreBtn.hide(); 

        } else {

            viewMoreBtn.addClass('is-loading'); 

        }

        //
        // Detects when the animation has finished by listeningto animationEnd event
        //
        bar.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
          function() {

            viewMoreBtn.removeClass('is-loading'); 

            loadingText.text('Enjoy!'); 

            $timeout(function() {

                scrollToSection('#projects'); 

                $timeout(function() {

                  loadingBarCtrl.isLoading = false; 
                  
                  loadingText.removeClass('is-showing'); 

                  viewMoreBtn.show(); 

                }, 400); 

            }, 200); 

          })

      };
      


      //
      // Sets up click listener for viewMoreBtn ui component to scroll to projects section
      //
      viewMoreBtn.on('click', function() {

        scrollToSection('#projects');

      });


      //
      // Watches for user-customizr-site event 
      //
      scope.$on('user-customized-site', function(event, data) {

        if(data.userSearch === true) {

            $timeout(function() {

            play(); 

            loadingBarCtrl.CustomizrService.showingCaseStudies = false; 

            },0); 

        }

      }); 

    }

  }

}]);

