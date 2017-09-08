
'use strict'; 

/*------------------------------------*\
   Marquee Directive 
\*------------------------------------*/


whiskersSite.directive('marqueeDir', ['$timeout', function($timeout) {

    return {

      restrict: 'E',
      replace: true, 
      scope: {}, 
      templateUrl: 'js/home/marquee.html', 
      link: function(scope, element, attrs) {

        function marquee(pContainer, pElement) {

          var width = pElement.width(); 
          var startPos = pContainer.width(); 
          var endPos = -width; 

          var speed = 50000; 

          //
          // Increase or decrease number for speed
          //
          var time = (parseInt(pElement.position().left, 10) - endPos)
                 * (speed / (startPos - endPos)); 

          //
          // Scrolls the element by making it go from startPos to endPos
          //
          function scroll() {

            if(pElement.position().left <= -width) {

              pElement.css('left', startPos);

              scroll(); 

            } else {

              pElement.animate({
                'left': -width

              }, time, 'linear', function() {

                scroll(); 

              });

            }

          }


          //
          // Sets the elment's width and start position 
          //
          pElement.css({

            'width' : width, 
            'left': startPos

          });

          scroll(pContainer, pElement); 

        }

        $timeout(function() {

          // console.log($(element[0]));
          // console.log($(element[0]).find('[data-ui-component="marquee-lines"]'));

          marquee($(element[0]), $(element[0]).find('[data-ui-component="marquee-lines"]'));

        }, 200); 

      }

    }

}]);


  // var matrix = pElement.css('transform');

  //           var values = matrix.match(/-?[\d\.]+/g);

