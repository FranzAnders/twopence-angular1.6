

'use strict';

/*------------------------------------*\
    Hand Holding Cash Anim Directive
\*------------------------------------*/

twopence.directive('handHoldingCashAnimDir', [
    '$timeout',
    'ScrollMagicGlobal', function($timeout, ScrollMagicGlobal) {

    return {

        scope: {}, 
        link: function(scope, element, attrs) {

          $timeout(function() {

            var easing = 'easeInOutCubic';
            var animIsRunning = false; 

            var handHoldingCashTimeline = anime.timeline({
              direction: 'forwards',
              autoplay: false,
              begin: function(anim) {

                animIsRunning = true;

              }, 
              complete: function(anim) {

                animIsRunning = false; 

              }
            }); 

            handHoldingCashTimeline
             .add({

                targets: '.dollarbills .dollarbill:nth-of-type(3)',
                rotate: [{value: -26}, {value: 0}],
                easing: easing,
                duration: 1200

            })
             .add({

                targets: '.dollarbills .dollarbill:nth-of-type(2)',
                rotate: [{value: -64}, {value: 0}],
                easing: easing,
                duration: 1200,
                offset: 100

            })
            .add({

                targets: '.dollarbills .dollarbill:nth-of-type(1)',
                rotate: [{value: -82}, {value: 0}],
                easing: easing,
                duration: 1200,
                offset: 200


            });


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
                      reverse: true})
                        .on('start', function() {
                          triggerAnimation(handHoldingCashTimeline); 

                        })
                        .on('end', function() {
                          triggerAnimation(handHoldingCashTimeline); 

                        })
                        .addTo(ScrollMagicGlobal.globalAnimCtrl);


          }, 200);


        }

    }

}]);
