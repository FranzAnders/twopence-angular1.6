

'use strict';

/*------------------------------------*\
    Hand Opening Safe Anim Directive
\*------------------------------------*/


twopence.directive('handOpeningSafeAnimDir', ['$timeout', function($timeout) {

    return {

        scope: {}, 
        link: function(scope, element, attrs) {

          $timeout(function() {

            var easing = 'easeInOutQuad';

            var handOpeningSafeTimeline = anime.timeline({
              loop: true
            }); 

            handOpeningSafeTimeline
            .add({

                targets: '.hand-inner',
                rotate: [{value: 15}, {value: -15}, {value: 0}],
                easing: easing,
                direction: 'forwards',
                duration: 3000

            })
            .add({

                targets: '.safe-key-inner',
                rotate: [{value: 15}, {value: -15}, {value: 0}],
                easing: easing,
                direction: 'forwards',
                duration: 3000,
                offset: 0

            });
          }, 100);


        }

    }

}]);
