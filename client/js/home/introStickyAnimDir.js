
'use strict'; 

/*------------------------------------*\
    Home Page Intro Sticky Animation
\*------------------------------------*/

whiskersSite.directive('introStickyAnimDir', 
    ['$timeout', 
     function($timeout) {

    return {

        restrict: 'A',
        scope: {},
        link:function(scope, element){

          $timeout(function() {

            if(mediaCheck.checkIfMedium() || mediaCheck.checkIfLarge()) {
              
              var scrollAnimIntroCtrl = new ScrollMagic.Controller(); 

              var scrollAnimScene = new ScrollMagic.Scene(
                        {triggerElement: "[data-ui-component='sticky-trigger-1']", 
                         triggerHook: 'onLeave',
                         duration: '70%'})
                        .setPin("[data-ui-component='pin-section']")
                        .addTo(scrollAnimIntroCtrl);


              // var noticeTween = TweenMax.fromTo("[data-ui-component='notice-banner']",
              //                 1, {y: '-50%'}, {y:'100%'});

              // var noticeUsBanner = new ScrollMagic.Scene ({
              //   triggerElement: "[data-ui-component='notice-banner']",
              //   triggerHook: 'onEnter',
              //   duration: '100%'


              // })
              // .setTween(noticeTween)
              // .addTo(scrollAnimIntroCtrl); 


            }

          }, 200);

        }

    }

}]);
