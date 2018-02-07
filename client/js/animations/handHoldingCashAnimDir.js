

'use strict';

/*------------------------------------*\
    Hand Holding Cash Anim Directive
\*------------------------------------*/

twopence.directive('handHoldingCashAnimDir', ['$timeout', function($timeout) {

    return {

        scope: {}, 
        link: function(scope, element, attrs) {

          $timeout(function() {

            var easing = 'easeInOutCubic';

            var handHoldingCashTimeline = anime.timeline({
              loop: true,
              direction: 'alternate'
            }); 

            handHoldingCashTimeline
             .add({

                targets: '.dollarbills .dollarbill:nth-of-type(3)',
                rotate: [{value: -26}, {value: 0}],
                easing: easing,
                duration: 1600

            })
             .add({

                targets: '.dollarbills .dollarbill:nth-of-type(2)',
                rotate: [{value: -64}, {value: 0}],
                easing: easing,
                duration: 1600,
                offset: 100

            })
            .add({

                targets: '.dollarbills .dollarbill:nth-of-type(1)',
                rotate: [{value: -82}, {value: 0}],
                easing: easing,
                duration: 1600,
                offset: 200


            });

          }, 200);


        }

    }

}]);


// @include keyframes(fan-dollar-3) {

//   0% {
//     @include transform(rotate(-86deg));

//   }

//   100% {
//     @include transform(rotate(0));

//   }
// }

// @include keyframes(fan-dollar-4) {

//   0% {
//     @include transform(rotate(-64deg));

//   }

//   100% {
//     @include transform(rotate(0));

//   }
// }


// @include keyframes(fan-dollar-5) {

//   0% {
//     @include transform(rotate(-26deg));

//   }

//   100% {
//     @include transform(rotate(0));

//   }
// }