

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

            var handHoldPhoneAnimTimeline = anime.timeline({
              loop: true,
              direction: 'forwards'
            }); 

            handHoldPhoneAnimTimeline
            .add({

                targets: '.appSplash',
                scaleY: [{value: 0},{value: .6, duration: 50}, {value: 1}],
                scaleX: [{value: 0},{value: .2, duration: 50}, {value: 1}],
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

          }, 100);


        }

    }

}]);
