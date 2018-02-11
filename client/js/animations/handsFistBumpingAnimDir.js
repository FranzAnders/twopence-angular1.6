

'use strict';

/*------------------------------------*\
    Hands Fist Bumping Directive
\*------------------------------------*/

twopence.directive('handsFistBumpingAnimDir', 
    ['$timeout',
      'ScrollMagicGlobal', function($timeout, ScrollMagicGlobal) {

    return {

        scope: {}, 
        link: function(scope, element, attrs) {

          $timeout(function() {

            var easing = 'easeOutQuart';
            var fistsEasing = 'easeInBack';
            var animIsRunning = false; 

            var handsFistBumping = anime.timeline({
              loop: 1,
              autoplay: false, 
              direction: 'alternate',
              begin: function(anim) {

                animIsRunning = true;

              }, 
              complete: function(anim) {

                animIsRunning = false; 

              }

            }); 

            handsFistBumping
            .add({

                targets: '.left-fist',
                translateX: [{value: 0}, {value: -5}, {value: 12}],
                easing: fistsEasing,
                duration: 800,
                offset: 0

            })
            .add({

                targets: '.right-fist',
                translateX: [{value: 0}, {value: 5}, {value: -12}],
                easing: fistsEasing,
                duration: 800,
                offset: 0


            })
            .add({

              targets: '.strokes', 
              strokeDashoffset: [{value: [anime.setDashoffset, anime.setDashoffset]}, {value: [anime.setDashoffset, 60]}],
              easing: easing, 
              duration: 500,
              offset: '-=200'

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
                          triggerAnimation(handsFistBumping); 

                        })
                        .on('end', function() {
                          triggerAnimation(handsFistBumping); 

                        })
                        .addTo(ScrollMagicGlobal.globalAnimCtrl);

          }, 200);


        }

    }

}]);
