

'use strict';

/*------------------------------------*\
    Hand Holding Phone Anim Directive
\*------------------------------------*/

twopence.directive('handHoldingPhoneAnimDir', ['$timeout', function($timeout) {

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
                duration: 1300

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

            //
            // Setup scroll  trigger code via waypoints
            //
            var animTriggerPoint = new Waypoint({

              element: element[0], 
              handler: function(direction) {

                if(animIsRunning) {

                  if(direction ==='up') {

                    handHoldPhoneAnimTimeline.seek(0); 

                  }

                } else {
                  
                  if(direction == 'down') {

                    handHoldPhoneAnimTimeline.restart(); 

                  } 

                }

              },
              offset: '35%'

            });

          }, 200);


        }

    }

}]);
