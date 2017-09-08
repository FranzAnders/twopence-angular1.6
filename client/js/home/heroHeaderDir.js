
'use strict'; 

/*------------------------------------*\
    #Hero Header Directive
\*------------------------------------*/

whiskersSite.directive('heroHeaderDir',  function() {

    return {

        restrict: 'E',
        replace: true, 
        scope: {},
        controller: ['$timeout', function($timeout) {
          

        }],
        controllerAs: 'heroHeader',
        templateUrl: "js/home/heroHeader.html",
        link:function(scope, element){



        }


    }

}); 
