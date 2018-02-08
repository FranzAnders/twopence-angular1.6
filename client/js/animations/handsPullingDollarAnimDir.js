
'use strict';

/*------------------------------------*\
    Hands Pulling Dollar Anim Dir
\*------------------------------------*/

twopence.directive('handsPullingDollarAnimDir', ['$timeout', function($timeout) {

    return {

        scope: {}, 
        link: function(scope, element, attrs) {

          $timeout(function() {

            var easing = 'easeInCubic';
            var animIsRunning = false; 

            var handsPullingDollarTimeline = anime.timeline({
              loop: 4, 
              autoplay: false,
              direction: 'alternate',
              begin: function(anim) {

                animIsRunning = true;

              }, 
              complete: function(anim) {

                animIsRunning = false; 

              }
            }); 

            handsPullingDollarTimeline
            .add({
              targets: '.right-hand',
              translateX: [{value: 0}, {value: 5}],
              easing: easing,
              duration: 400,
              offset: 0
            })
            .add({
              targets: '.left-hand',
              translateX: [{value: 0}, {value: -5}],
              easing: easing,
              duration: 400,
              offset: 0
            })
            .add({
              targets: '.dollar',
              scaleX: [{value: 1}, {value: 1.16}],
              easing: easing,
              duration: 400,
              offset: 0

            })
            .add({
              targets: '.dollar-strokes', 
              strokeDashoffset: [{value: [anime.setDashoffset, anime.setDashoffset]}, {value: [anime.setDashoffset, 0]}],
              easing: easing, 
              duration: 400,
              offset: 100
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

                  if(direction === 'down') {
                    
                    handsPullingDollarTimeline.restart(); 

                  }

                }    

              },
              offset: '35%'

            });

          }, 200);


        }

    }

}]);
