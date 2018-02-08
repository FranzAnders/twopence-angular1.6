

'use strict';

/*------------------------------------*\
    Hands Fist Bumping Directive
\*------------------------------------*/

twopence.directive('handsFistBumpingAnimDir', ['$timeout', function($timeout) {

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
              strokeDashoffset: [{value: [anime.setDashoffset, anime.setDashoffset]}, {value: [anime.setDashoffset, 50]}],
              easing: easing, 
              duration: 500,
              offset: '-=200'

            });
 
            //
            // Setup scroll  trigger code via waypoints
            //
            var animTriggerPoint = new Waypoint({

              element: element[0], 
              handler: function(direction) {

                if(animIsRunning) {

                  return false

                } else {
                  
                  if(direction == 'down') {

                  handsFistBumping.restart(); 

                  }

                }

              },
              offset: '35%'

            });


          }, 200);


        }

    }

}]);
