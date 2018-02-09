

'use strict';

/*------------------------------------*\
    #Directive that watchs a value to make element focused 
\*------------------------------------*/

twopence.directive('focusMe', ['$timeout', 'EfficientWatch', function($timeout, EfficientWatch) {

  return {

    controller: function() { }, 
    bindToController: { trigger: "@focusMe" },
    link: function(scope, element, attrs, ctrl) {

      EfficientWatch.watch('trigger', ctrl, function(newValue){

        if(newValue === 'true') { 

          $timeout(function() {

            element[0].focus(); 

          });

        } 

      }); 

    }

  }

}]); 