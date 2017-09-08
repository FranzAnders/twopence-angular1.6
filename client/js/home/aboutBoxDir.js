
'use strict'; 

/*------------------------------------*\
    About Box Directive
\*------------------------------------*/

whiskersSite.directive('aboutBoxDir', 
    ['$timeout', 
     function($timeout) {

    return {

        restrict: 'E',
        replace: true, 
        scope: {},
        templateUrl: 'js/home/aboutBox.html',
        link:function(scope, element){

          $timeout(function() {



          }, 200); 

        }

    }

}]);
