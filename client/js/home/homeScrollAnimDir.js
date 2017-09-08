
'use strict'; 

/*------------------------------------*\
    #Home Scroll Animations With Scroll Magic  Dir
\*------------------------------------*/

whiskersSite.directive('scrollHomeAnimDir',  
          ['$rootScope', 
           '$timeout',
      function(
         $rootScope, 
         $timeout) {

    return {

        restrict: 'A',
        scope: {},
        link:function(scope, element){
            console.log('scroll animations can be set up'); 
          
          $timeout(function() {
            
            $.stellar({
             horizontalScrolling: false,
            verticalScrolling: true,
            hideDistantElements: false,
            responsive: true,
            positionProperty: 'transform'
            
            });

          }, 1000); 


      }

    }


}]);
