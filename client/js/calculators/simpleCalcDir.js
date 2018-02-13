
'use strict'; 

/*------------------------------------*\
    Simple Calculator Directive
\*------------------------------------*/

twopence.directive('simpleCalcDir', function() {

  return {

    scope: {}, 
    restrict: "E", 
    controller: function() {

      var vm  = this; 

    }, 
    bindToController: 'calculator',
    templateUrl: 'js/calculators/simpleCalc.html', 
    link: function() {


    }

  }

}); 