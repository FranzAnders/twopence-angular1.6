

'use strict';

/*------------------------------------*\
    Hand Holding Phone Anim Directive
\*------------------------------------*/

twopence.directive('handHoldingPhoneAnimDir', [
    '$timeout', 
    'ScrollMagicGlobal', function($timeout, ScrollMagicGlobal) {

    return {

        scope: {}, 
        link: function(scope, element, attrs) {

          $timeout(function() {

            var easing = 'easeOutQuart';
            var animIsRunning = false; 

            var handHoldPhoneAnimTimeline = anime.timeline({
              direction: 'forwards',
              autoplay: false, 
              begin: function(anim) {

                animIsRunning = true;

              }, 
              complete: function(anim) {

                animIsRunning = false; 

              }

            }); 

            handHoldPhoneAnimTimeline
            .add({

              targets: '.appSplash',
                scale: [0, 1],
                easing: easing,
                duration: 400

            })
            .add({

                targets: '.appIcon',
                scale: [0, 1],
                easing: easing,
                duration: 400

            })
            .add({

                targets: '.appIconDollar',
                translateY: [20, 0],
                easing: easing,
                duration: 400,
                offset: '-=100'
            })


            var triggerAnimation = function(pAnimeAnimation) {
               
                if(animIsRunning) {

                  return false

                } else {  

                  pAnimeAnimation.restart(); 

                }

            };


            //
            // Setup scroll  trigger code 
            //
            var scene = new ScrollMagic.Scene({
                      triggerElement: element[0].querySelector('.trigger-point'),
                      triggerHook: 'onCenter',
                      duration: 260,
                      reverse: false})
                        .on('start', function() {

                          if(!handHoldPhoneAnimTimeline.began) {
                            triggerAnimation(handHoldPhoneAnimTimeline); 

                          }; 

                        })
                        .on('end', function() {

                          if(!handHoldPhoneAnimTimeline.began) {
                            triggerAnimation(handHoldPhoneAnimTimeline); 

                          }

                        })
                        .addTo(ScrollMagicGlobal.globalAnimCtrl);

          }, 200);


        }

    }

}]);
