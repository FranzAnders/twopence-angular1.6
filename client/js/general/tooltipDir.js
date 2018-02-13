
'use strict'; 

/*------------------------------------*\
   Tooltip Directive
\*------------------------------------*/

twopence.directive('tooltipDir', ['$rootScope', function($rootScope) {

    return {

        restrict: 'E',
        scope: {}, 
        replace: true, 
        templateUrl: 'js/general/tooltip.html',
        link: function(scope, element, attrs) {

          scope.isActive = false; 

          scope.text = attrs.text; 

          scope.toggle = function() {

            scope.isActive = !scope.isActive; 

          }

        }

    }

}]);