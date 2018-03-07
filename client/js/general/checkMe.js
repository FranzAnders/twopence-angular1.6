

'use strict';

/*------------------------------------*\
    #Directive that watches a value to make a checkbox checked
\*------------------------------------*/

twopence.directive('checkMe', ['$timeout', 'EfficientWatch', function($timeout, EfficientWatch) {

  return {

    controller: function() { }, 
    bindToController: { trigger: "@checkMe" },
    link: function(scope, element, attrs, ctrl) {

      EfficientWatch.watch('trigger', ctrl, function(newValue){
        if(newValue) { 
          $timeout(function() {
            element[0].checked = true;  
          });
        } 
      }); 
    }
  }
}]); 
