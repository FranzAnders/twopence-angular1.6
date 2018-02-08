

'use strict';

/*------------------------------------*\
    Hand Opening Safe Anim Directive
\*------------------------------------*/


twopence.directive('handOpeningSafeAnimDir', 
    ['$timeout', 
     'ScrollMagicGlobal',
      function($timeout,
               ScrollMagicGlobal) {

    return {

        scope: {}, 
        link: function(scope, element, attrs) {

          $timeout(function() {

            var easing = 'easeInOutQuad';
            var coinEasing = 'easeInOutSine';
            var duration = 2000; 
            var animIsRunning = false; 


            var handOpeningSafeTimeline = anime.timeline({
              autoplay: false,
              loop: 1,
              begin: function(anim) {

                animIsRunning = true;

              }, 
              complete: function(anim) {

                animIsRunning = false; 

              }
            }); 

            handOpeningSafeTimeline
            .add({

                targets: '.hand-inner',
                rotate: [{value: 14}, {value: -6}, {value: 0}],
                easing: easing,
                direction: 'forwards',
                duration: duration

            })
            .add({

                targets: '.safe-key-inner',
                rotate: [{value: 14}, {value: -6}, {value: 0}],
                easing: easing,
                direction: 'forwards',
                duration: duration,
                offset: 0

            })
            .add({

                targets: '.coin-left-top',
                translateY: [{value: 0}, {value: -8, duration: 200}, {value: 0}, {value: -8, duration: 200}, {value: 0}],
                easing: coinEasing,
                duration: duration,
                offset: -300

            })
         
            .add({

                targets: '.coin-right-top',
                translateY: [{value: 0},  {value: 0, duration: 100}, {value: -19}, {value: -20 , duration: 200}, {value: -24}, {value: 0}, {value: -14}, {value: 0}],
                easing: coinEasing,
                duration: duration,
                offset: -300

            })
            .add({

                targets: '.coin-right-bottom',
                translateY: [{value: 0},  {value: -2, duration: 100},{value: -14}, {value: -20, duration: 100},  {value: 0}, {value: 0}, {value: -6}, {value: 0}],
                easing: coinEasing,
                duration: duration,
                offset: -300

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
                          triggerAnimation(handOpeningSafeTimeline); 

                        })
                        .on('end', function() {
                          triggerAnimation(handOpeningSafeTimeline); 

                        })
                        .addTo(ScrollMagicGlobal.globalAnimCtrl);

          }, 200);


        }

    }

}]);
