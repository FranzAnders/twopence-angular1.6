
'use strict'; 

/*------------------------------------*\
    #Loading Bar Public Methods 
\*------------------------------------*/

var loadingBar = (function() {
 
    var bar = $('[data-ui-component="loading-bar"]');

    var loadingText = $('[data-ui-component="messages"]');

    var viewMoreBtn = $('[data-ui-component="view-more-btn"]'); 

    //
    //Code to scroll to a specific section
    //

    var scrollToSection = function(pSectionId) {

        if(mediaCheck.checkIfSmall() || mediaCheck.checkIfMedium()) {

           $('body').stop(true, false).animate({
                scrollTop: $(pSectionId).offset().top,
                easing: 'easeInOutQuint'
            }, 1300);

        } else {

          $('html, body').stop(true, false).animate({
              scrollTop: 1500,
                easing: 'easeInOutQuint'

          }, 1600 );

        }

    }


    var play = function() {

      console.log('playing'); 
      
      loadingText.addClass('is-showing'); 
      
      loadingText.text('Coding custom site...'); 

      bar.addClass('is-loading'); 


      if(mediaCheck.checkIfSmall()) {

          viewMoreBtn.hide(); 

      } else {

          viewMoreBtn.addClass('is-loading'); 

      }

      bar.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function() {

          viewMoreBtn.removeClass('is-loading'); 

          loadingText.text('Enjoy!'); 

          setTimeout(function() {

              scrollToSection('#projects'); 

              setTimeout(function() {

                bar.removeClass('is-loading'); 
                
                loadingText.removeClass('is-showing'); 

                viewMoreBtn.show(); 

              }, 400); 

          }, 200); 

        })

    };


    var loadingBar = {

      play: play,
      scrollToSection: scrollToSection

    } 

    return loadingBar

})();
