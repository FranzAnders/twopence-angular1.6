

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


            var handsFistBumping = anime.timeline({
              loop: true,
              direction: 'alternate'
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
 

          }, 200);


        }

    }

}]);
