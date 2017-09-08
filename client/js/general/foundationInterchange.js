
'use strict'; 

humanautSite.directive('foundationInterchange', function() {


    return {

        restrict: 'A',
        scope: {},
        controller: function() {

          console.log('hello');

        },
        link: function(scope, element, attrs) {

          console.log(element); 
          $(this).foundation('interchange', 'reflow');

        }

    }


}); 