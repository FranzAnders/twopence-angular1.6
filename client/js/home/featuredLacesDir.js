
'use strict'; 

/*------------------------------------*\
    Featured Laces Directive
\*------------------------------------*/

whiskersSite.directive('featuredLacesDir', 
    ['$timeout', 
     function($timeout) {

    return {

        restrict: 'E',
        replace: true, 
        scope: {},
        templateUrl: 'js/home/featuredLaces.html',
        link:function(scope, element){

          $timeout(function() {



          }, 200); 

        }

    }

}]);
